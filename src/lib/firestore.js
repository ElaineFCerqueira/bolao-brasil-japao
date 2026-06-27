import { initializeApp } from 'firebase/app';
import {
  getFirestore,
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

const firebaseConfig = {
  apiKey: "AIzaSyCP0SERdeuTpc08GBP0MuujFkgQqGG36ts",
  authDomain: "bolao-brasil-japao.firebaseapp.com",
  projectId: "bolao-brasil-japao",
  storageBucket: "bolao-brasil-japao.firebasestorage.app",
  messagingSenderId: "649514126116",
  appId: "1:649514126116:web:b7eee7e701f585646e01b1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const PALPITES_COL = 'palpites';
const SCORES_COL = 'scores_count';
const MAX_SAME_SCORE = 2;

const scoreKey = (b, j) => `${b}-${j}`;

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

      if (scoreDoc.exists()) {
        transaction.update(scoreRef, { count: count + 1 });
      } else {
        transaction.set(scoreRef, { count: 1 });
      }

      const newPalpiteRef = doc(palpitesRef);
      transaction.set(newPalpiteRef, {
        nome: nome.trim(),
        golsBrasil: Number(golsBrasil),
        golsJapao: Number(golsJapao),
        status: 'aguardando',
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

export function subscribePalpites(callback) {
  const q = query(collection(db, PALPITES_COL), orderBy('criadoEm', 'asc'));
  return onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
    callback(data);
  });
}

export async function updateStatus(palpiteId, novoStatus) {
  const ref = doc(db, PALPITES_COL, palpiteId);
  await updateDoc(ref, { status: novoStatus });
}

export async function getScoreCount(golsBrasil, golsJapao) {
  const key = scoreKey(golsBrasil, golsJapao);
  const ref = doc(db, SCORES_COL, key);
  const snap = await getDoc(ref);

  export async function deletePalpite(palpiteId, golsBrasil, golsJapao) {
  const key = `${golsBrasil}-${golsJapao}`;
  const scoreRef = doc(db, SCORES_COL, key);
  const palpiteRef = doc(db, PALPITES_COL, palpiteId);

  try {
    await runTransaction(db, async (transaction) => {
      const scoreDoc = await transaction.get(scoreRef);
      if (scoreDoc.exists() && scoreDoc.data().count > 0) {
        transaction.update(scoreRef, { count: scoreDoc.data().count - 1 });
      }
      transaction.delete(palpiteRef);
    });
    return { success: true };
  } catch (err) {
    console.error('Erro ao deletar:', err);
    return { success: false };
  }
}
  return snap.exists() ? snap.data().count : 0;
}
