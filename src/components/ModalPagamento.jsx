// src/components/ModalPagamento.jsx
export default function ModalPagamento({ palpite, onClose }) {
  const { nome, golsBrasil, golsJapao } = palpite;

  async function copyPix() {
    try {
      await navigator.clipboard.writeText('71992790879');
      alert('Chave PIX copiada!');
    } catch {
      // fallback silencioso
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-in">

        {/* Header verde */}
        <div className="bg-verde-600 px-6 py-5 text-center">
          <p className="text-5xl mb-2">🎉</p>
          <h2 className="text-white font-display text-3xl tracking-wide">PALPITE SALVO!</h2>
          <p className="text-verde-100 text-sm mt-1">Falta só o pagamento para confirmar</p>
        </div>

        {/* Resumo do palpite */}
        <div className="bg-verde-50 border-b border-verde-100 px-6 py-4 text-center">
          <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Seu palpite</p>
          <p className="font-bold text-azul-600 text-lg">{nome}</p>
          <div className="flex items-center justify-center gap-3 mt-2">
            <span className="text-2xl">🇧🇷</span>
            <span className="font-display text-4xl text-azul-600">{golsBrasil}</span>
            <span className="text-gray-400 font-display text-2xl">×</span>
            <span className="font-display text-4xl text-azul-600">{golsJapao}</span>
            <span className="text-2xl">🇯🇵</span>
          </div>
        </div>

        {/* Instruções de pagamento */}
        <div className="px-6 py-5 space-y-4">
          <p className="text-gray-700 text-sm font-semibold text-center">
            Para validar seu palpite, faça o PIX:
          </p>

          {/* PIX card */}
          <div className="bg-amarelo-50 border-2 border-amarelo-400 rounded-xl p-4 text-center">
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Valor</p>
            <p className="text-3xl font-bold text-verde-700">R$ 10,00</p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">Chave PIX:</span>
              <span className="font-mono font-bold text-azul-600">71 992790879</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">Destinatária:</span>
              <span className="font-bold text-gray-800">Elaine Cerqueira</span>
            </div>
          </div>

          <button
            onClick={copyPix}
            className="w-full border-2 border-verde-600 text-verde-700 font-bold py-3 rounded-xl hover:bg-verde-50 transition-colors text-sm"
          >
            📋 Copiar Chave PIX
          </button>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
            <p className="text-blue-700 text-xs text-center">
              📲 Após o pagamento, <strong>envie o comprovante</strong> para Elaine confirmar sua participação.
            </p>
          </div>
        </div>

        {/* Fechar */}
        <div className="px-6 pb-6">
          <button
            onClick={onClose}
            className="w-full bg-azul-600 hover:bg-azul-700 text-white font-bold py-3 rounded-xl transition-colors"
          >
            Entendido, vou pagar! ✅
          </button>
        </div>
      </div>
    </div>
  );
}
