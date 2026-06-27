// src/components/FormPalpite.jsx
import { useState } from 'react';
import { addPalpite, getScoreCount } from '../lib/firestore';
import { useCountdown } from '../hooks/useCountdown';
import ModalPagamento from './ModalPagamento';

export default function FormPalpite() {
  const { isExpired } = useCountdown();
  const [nome, setNome]           = useState('');
  const [golsBrasil, setGolsBrasil] = useState('');
  const [golsJapao, setGolsJapao]   = useState('');
  const [loading, setLoading]       = useState(false);
  const [erro, setErro]             = useState('');
  const [palpiteSalvo, setPalpiteSalvo] = useState(null); // para abrir modal

  async function handleSubmit(e) {
    e.preventDefault();
    setErro('');

    if (!nome.trim()) return setErro('Por favor, informe seu nome.');
    if (golsBrasil === '' || golsJapao === '') return setErro('Informe o placar completo.');
    if (Number(golsBrasil) < 0 || Number(golsJapao) < 0) return setErro('Gols não podem ser negativos.');
    if (Number(golsBrasil) > 20 || Number(golsJapao) > 20) return setErro('Placar fora do intervalo permitido.');

    setLoading(true);

    // Verifica contagem antes de enviar (feedback rápido)
    const count = await getScoreCount(golsBrasil, golsJapao);
    if (count >= 2) {
      setErro(`O placar ${golsBrasil}x${golsJapao} já foi escolhido por 2 pessoas. Escolha outro placar!`);
      setLoading(false);
      return;
    }

    const result = await addPalpite(nome, golsBrasil, golsJapao);
    setLoading(false);

    if (result.success) {
      setPalpiteSalvo({ nome, golsBrasil, golsJapao });
      setNome('');
      setGolsBrasil('');
      setGolsJapao('');
    } else if (result.reason === 'limite') {
      setErro(`O placar ${golsBrasil}x${golsJapao} acabou de ser preenchido por outra pessoa. Escolha outro placar!`);
    } else {
      setErro('Erro ao salvar palpite. Tente novamente.');
    }
  }

  if (isExpired) {
    return (
      <section className="bg-white rounded-2xl shadow-md p-6 border-2 border-red-200">
        <div className="text-center py-4">
          <p className="text-4xl mb-2">🔒</p>
          <h2 className="text-xl font-bold text-red-600">Palpites Encerrados</h2>
          <p className="text-gray-500 text-sm mt-1">O prazo para palpites encerrou. Boa sorte a todos!</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="bg-white rounded-2xl shadow-md p-6 border-2 border-verde-100">
        <div className="flex items-center gap-2 mb-5">
          <span className="text-2xl">✏️</span>
          <h2 className="text-xl font-bold text-azul-600 font-body">Meu Palpite</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nome */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Nome Completo
            </label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex: João da Silva"
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:border-verde-600 transition-colors text-base"
              maxLength={60}
            />
          </div>

          {/* Placar */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Seu Palpite de Placar
            </label>
            <div className="flex items-center gap-3">
              {/* Brasil */}
              <div className="flex-1 flex flex-col items-center">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl">🇧🇷</span>
                  <span className="font-bold text-verde-700 text-sm">Brasil</span>
                </div>
                <input
                  type="number"
                  value={golsBrasil}
                  onChange={(e) => setGolsBrasil(e.target.value)}
                  min="0"
                  max="20"
                  placeholder="0"
                  className="w-full border-2 border-gray-200 rounded-xl px-3 py-3 text-center text-2xl font-bold text-azul-600 focus:outline-none focus:border-verde-600 transition-colors"
                />
              </div>

              {/* X */}
              <div className="text-2xl font-display text-gray-400 pt-6">✕</div>

              {/* Japão */}
              <div className="flex-1 flex flex-col items-center">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl">🇯🇵</span>
                  <span className="font-bold text-red-600 text-sm">Japão</span>
                </div>
                <input
                  type="number"
                  value={golsJapao}
                  onChange={(e) => setGolsJapao(e.target.value)}
                  min="0"
                  max="20"
                  placeholder="0"
                  className="w-full border-2 border-gray-200 rounded-xl px-3 py-3 text-center text-2xl font-bold text-azul-600 focus:outline-none focus:border-verde-600 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Erro */}
          {erro && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex items-start gap-2">
              <span className="text-red-500 text-lg leading-none mt-0.5">⚠️</span>
              <p className="text-red-700 text-sm">{erro}</p>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-verde-600 hover:bg-verde-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl text-lg transition-colors shadow-md active:scale-95"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin">⚽</span> Enviando...
              </span>
            ) : (
              '✅ Confirmar Palpite'
            )}
          </button>

          <p className="text-center text-xs text-gray-400">
            Após confirmar, você receberá as instruções de pagamento via PIX.
          </p>
        </form>
      </section>

      {/* Modal de pagamento */}
      {palpiteSalvo && (
        <ModalPagamento
          palpite={palpiteSalvo}
          onClose={() => setPalpiteSalvo(null)}
        />
      )}
    </>
  );
}
