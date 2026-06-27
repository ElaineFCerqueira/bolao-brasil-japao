// src/components/AdminPanel.jsx
import { useState, useEffect } from 'react';
import { subscribePalpites, updateStatus } from '../lib/firestore';

const ADMIN_PASSWORD = 'ro2617'; // ⚠️ Troque para uma senha de sua escolha

export default function AdminPanel() {
  const [logado, setLogado]     = useState(false);
  const [senha, setSenha]       = useState('');
  const [erroSenha, setErroSenha] = useState('');
  const [palpites, setPalpites] = useState([]);
  const [updating, setUpdating] = useState(null);
  const [showPanel, setShowPanel] = useState(false);

  useEffect(() => {
    if (!logado) return;
    const unsub = subscribePalpites(setPalpites);
    return () => unsub();
  }, [logado]);

  function handleLogin(e) {
    e.preventDefault();
    if (senha === ADMIN_PASSWORD) {
      setLogado(true);
      setErroSenha('');
    } else {
      setErroSenha('Senha incorreta.');
    }
  }

  async function toggleStatus(palpite) {
    const novo = palpite.status === 'confirmado' ? 'aguardando' : 'confirmado';
    setUpdating(palpite.id);
    await updateStatus(palpite.id, novo);
    setUpdating(null);
  }

  const totalConfirmados = palpites.filter((p) => p.status === 'confirmado').length;

  if (!showPanel) {
    return (
      <div className="text-center py-2">
        <button
          onClick={() => setShowPanel(true)}
          className="text-xs text-gray-400 hover:text-gray-600 underline underline-offset-2 transition-colors"
        >
          Área Admin
        </button>
      </div>
    );
  }

  if (!logado) {
    return (
      <section className="bg-white rounded-2xl shadow-md p-6 border border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl">🔐</span>
          <h2 className="font-bold text-gray-700 text-lg">Área do Administrador</h2>
        </div>

        <form onSubmit={handleLogin} className="space-y-3">
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Senha de administrador"
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-azul-600 transition-colors"
          />
          {erroSenha && (
            <p className="text-red-500 text-sm">{erroSenha}</p>
          )}
          <button
            type="submit"
            className="w-full bg-azul-600 text-white font-bold py-3 rounded-xl hover:bg-azul-700 transition-colors"
          >
            Entrar
          </button>
          <button
            type="button"
            onClick={() => setShowPanel(false)}
            className="w-full text-gray-400 text-sm hover:text-gray-600 transition-colors py-1"
          >
            Cancelar
          </button>
        </form>
      </section>
    );
  }

  return (
    <section className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200">
      {/* Header admin */}
      <div className="bg-azul-600 px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">🛠️</span>
          <h2 className="text-white font-bold text-lg">Painel Admin</h2>
        </div>
        <button
          onClick={() => { setLogado(false); setShowPanel(false); }}
          className="text-verde-100 hover:text-white text-sm transition-colors"
        >
          Sair
        </button>
      </div>

      {/* Resumo rápido */}
      <div className="bg-verde-50 border-b border-verde-100 px-5 py-3 flex gap-4 text-sm">
        <span className="text-verde-700 font-semibold">
          🟢 {totalConfirmados} confirmados = R$ {(totalConfirmados * 10).toFixed(2).replace('.', ',')}
        </span>
        <span className="text-yellow-600">
          🟡 {palpites.length - totalConfirmados} pendentes
        </span>
      </div>

      {/* Lista editável */}
      {palpites.length === 0 ? (
        <div className="py-8 text-center text-gray-400 text-sm">Nenhum palpite ainda.</div>
      ) : (
        <ul className="divide-y divide-gray-50">
          {palpites.map((p) => (
            <li key={p.id} className="px-5 py-3 flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-800 text-sm truncate">{p.nome}</p>
                <p className="text-xs text-gray-500">
                  🇧🇷 {p.golsBrasil} × {p.golsJapao} 🇯🇵
                </p>
              </div>

              <button
                onClick={() => toggleStatus(p)}
                disabled={updating === p.id}
                className={`
                  shrink-0 px-3 py-1.5 rounded-full text-xs font-bold border transition-all
                  ${p.status === 'confirmado'
                    ? 'bg-green-100 text-green-700 border-green-300 hover:bg-green-200'
                    : 'bg-yellow-100 text-yellow-700 border-yellow-300 hover:bg-yellow-200'
                  }
                  disabled:opacity-50 disabled:cursor-not-allowed
                `}
              >
                {updating === p.id ? '...' : p.status === 'confirmado' ? '🟢 Confirmado' : '🟡 Aguardando'}
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
