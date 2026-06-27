// src/lib/firestore.js
import {
  collection,
  addDoc,
  onSnapshot,
  doc,
  updateDoc,
  runTransaction,
  query,
  orderBy,
  serverTimestamp,
  getDoc,
} from 'firebase/firestore';
import { db } from './firebase';

const PALPITES_COL = 'palpites';
const SCORES_COL = 'scores_count';
const MAX_SAME_SCORE = 2;

// Chave para contagem de palpites iguais: "brasilGols-japaoGols"
const scoreKey = (b, j) => `${b}-${j}`;

/**
 * Tenta adicionar um palpite com transação atômica.
 * Retorna { success: true } ou { success: false, reason: string }
 */
export async function addPalpite(nome, golsBrasil, golsJapao) {
  const key = scoreKey(golsBrasil, golsJapao);
  const scoreRef = doc(db, SCORES_COL, key);
  const palpitesRef = collection(db, PALPITES_COL);

  try {
    const result = await runTransaction(db, async (transaction) => {
      const scoreDoc = await transaction.get(scoreRef);
      const count = scoreDoc.exists() ? scoreDoc.data().count : 0;

      if (count >= MAX_SAME_SCORE) {
        return { success: false, reason: 'limite' };
      }

      // Atualiza ou cria contador do placar
      if (scoreDoc.exists()) {
        transaction.update(scoreRef, { count: count + 1 });
      } else {
        transaction.set(scoreRef, { count: 1 });
      }

      // Adiciona o palpite
      const newPalpiteRef = doc(palpitesRef);
      transaction.set(newPalpiteRef, {
        nome: nome.trim(),
        golsBrasil: Number(golsBrasil),
        golsJapao: Number(golsJapao),
        status: 'aguardando', // 'aguardando' | 'confirmado'
        criadoEm: serverTimestamp(),
      });

      return { success: true };
    });

    return result;
  } catch (err) {
    console.error('Erro na transação:', err);
    return { success: false, reason: 'erro' };
  }
}

/**
 * Listener em tempo real para todos os palpites
 */
export function subscribePalpites(callback) {
  const q = query(collection(db, PALPITES_COL), orderBy('criadoEm', 'asc'));
  return onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
    callback(data);
  });
}

/**
 * Atualiza status do palpite (admin)
 */
export async function updateStatus(palpiteId, novoStatus) {
  const ref = doc(db, PALPITES_COL, palpiteId);
  await updateDoc(ref, { status: novoStatus });
}

/**
 * Busca a contagem de um placar específico
 */
export async function getScoreCount(golsBrasil, golsJapao) {
  const key = scoreKey(golsBrasil, golsJapao);
  const ref = doc(db, SCORES_COL, key);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data().count : 0;
}
