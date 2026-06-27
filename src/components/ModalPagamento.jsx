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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header com botão X visível */}
        <div className="bg-verde-600 px-4 py-3 flex items-center justify-between">
          <div>
            <p className="text-white font-display text-2xl tracking-wide leading-none">🎉 PALPITE SALVO!</p>
            <p className="text-verde-100 text-xs mt-0.5">Falta só o pagamento para confirmar</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white font-bold text-lg transition-colors shrink-0 ml-2"
          >
            ✕
          </button>
        </div>

        {/* Resumo compacto */}
        <div className="bg-verde-50 border-b border-verde-100 px-4 py-3 flex items-center justify-between">
          <p className="font-bold text-azul-600 text-sm truncate">{nome}</p>
          <div className="flex items-center gap-2 shrink-0 ml-2">
            <span className="text-lg">🇧🇷</span>
            <span className="font-display text-2xl text-azul-600">{golsBrasil}</span>
            <span className="text-gray-400 text-sm">×</span>
            <span className="font-display text-2xl text-azul-600">{golsJapao}</span>
            <span className="text-lg">🇯🇵</span>
          </div>
        </div>

        {/* Instruções PIX compactas */}
        <div className="px-4 py-4 space-y-3">
          <p className="text-gray-700 text-sm font-semibold text-center">
            Para validar seu palpite, faça o PIX:
          </p>

          <div className="bg-amarelo-50 border-2 border-amarelo-400 rounded-xl p-3 text-center">
            <p className="text-xs text-gray-500 uppercase tracking-widest">Valor</p>
            <p className="text-2xl font-bold text-verde-700">R$ 10,00</p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 space-y-1.5 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Chave PIX:</span>
              <span className="font-mono font-bold text-azul-600">71 992790879</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Destinatária:</span>
              <span className="font-bold text-gray-800">Elaine Cerqueira</span>
            </div>
          </div>

          <button
            onClick={copyPix}
            className="w-full border-2 border-verde-600 text-verde-700 font-bold py-2.5 rounded-xl hover:bg-verde-50 transition-colors text-sm"
          >
            📋 Copiar Chave PIX
          </button>

          <p className="text-blue-600 text-xs text-center bg-blue-50 rounded-xl py-2 px-3">
            📲 Envie o comprovante para Elaine confirmar sua participação.
          </p>

          <button
            onClick={onClose}
            className="w-full bg-azul-600 hover:bg-azul-700 text-white font-bold py-3 rounded-xl transition-colors text-sm"
          >
            Entendido, vou pagar! ✅
          </button>
        </div>
      </div>
    </div>
  );
}
