// src/components/Dashboard.jsx
import { useState, useEffect } from 'react';
import { subscribePalpites } from '../lib/firestore';

export default function Dashboard() {
  const [palpites, setPalpites] = useState([]);

  useEffect(() => {
    const unsub = subscribePalpites(setPalpites);
    return () => unsub();
  }, []);

  const totalConfirmados = palpites.filter((p) => p.status === 'confirmado').length;
  const totalArrecadado  = totalConfirmados * 10;

  const statusInfo = {
    confirmado: { icon: '🟢', label: 'Confirmado',    bg: 'bg-green-50',  text: 'text-green-700', border: 'border-green-200' },
    aguardando:  { icon: '🟡', label: 'Aguardando PIX', bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200' },
  };

  return (
    <section className="space-y-4">
      {/* Card total */}
      <div className="bg-azul-600 rounded-2xl shadow-md p-5 text-white">
        <p className="text-verde-100 text-xs uppercase tracking-widest mb-1">Total Arrecadado (Confirmados)</p>
        <p className="font-display text-5xl text-amarelo-400 leading-none">
          R$ {totalArrecadado.toFixed(2).replace('.', ',')}
        </p>
        <div className="flex gap-4 mt-3 text-sm">
          <span className="text-verde-100">
            🟢 {totalConfirmados} confirmado{totalConfirmados !== 1 ? 's' : ''}
          </span>
          <span className="text-verde-100">
            🟡 {palpites.length - totalConfirmados} aguardando
          </span>
        </div>
      </div>

      {/* Lista de palpites */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
          <span className="text-xl">📋</span>
          <h2 className="font-bold text-azul-600 text-lg font-body">
            Palpites ({palpites.length})
          </h2>
        </div>

        {palpites.length === 0 ? (
          <div className="py-10 text-center">
            <p className="text-4xl mb-2">⚽</p>
            <p className="text-gray-400 text-sm">Nenhum palpite ainda. Seja o primeiro!</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-50">
            {palpites.map((p, i) => {
              const st = statusInfo[p.status] || statusInfo.aguardando;
              return (
                <li key={p.id} className="px-5 py-3 flex items-center gap-3">
                  <span className="text-gray-300 text-xs font-mono w-5 text-right shrink-0">
                    {i + 1}
                  </span>

                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-800 text-sm truncate">{p.nome}</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      🇧🇷 <span className="font-bold text-azul-600">{p.golsBrasil}</span>
                      {' × '}
                      <span className="font-bold text-azul-600">{p.golsJapao}</span> 🇯🇵
                    </p>
                  </div>

                  <span className={`shrink-0 text-xs px-2 py-1 rounded-full border font-medium ${st.bg} ${st.text} ${st.border}`}>
                    {st.icon} {st.label}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
