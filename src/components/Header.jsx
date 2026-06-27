// src/components/Header.jsx
import { useCountdown } from '../hooks/useCountdown';

export default function Header() {
  const { timeLeft, isExpired } = useCountdown();

  return (
    <header className="bg-verde-600 text-white shadow-lg">
      {/* Banner principal */}
      <div className="bg-azul-600 py-4 px-4 text-center">
        <p className="text-amarelo-400 text-xs font-semibold uppercase tracking-widest mb-1">
          Copa do Mundo 2026
        </p>
        <h1 className="font-display text-5xl sm:text-6xl tracking-wider leading-none">
          🇧🇷 BRASIL <span className="text-amarelo-400">×</span> JAPÃO 🇯🇵
        </h1>
        <p className="text-verde-100 text-sm mt-2 font-body">
          29 de junho de 2026 · 14h00 (Horário de Brasília)
        </p>
      </div>

      {/* Contador regressivo */}
      <div className="bg-verde-600 py-4 px-4">
        {isExpired ? (
          <div className="text-center">
            <p className="text-amarelo-400 font-display text-3xl tracking-wider">
              🔒 PALPITES ENCERRADOS
            </p>
            <p className="text-verde-100 text-sm mt-1">O jogo já começou!</p>
          </div>
        ) : (
          <div>
            <p className="text-center text-verde-100 text-xs uppercase tracking-widest mb-3 font-semibold">
              Palpites encerram em
            </p>
            <div className="flex justify-center gap-3">
              {[
                { label: 'Dias',    value: timeLeft.days },
                { label: 'Horas',   value: timeLeft.hours },
                { label: 'Min',     value: timeLeft.minutes },
                { label: 'Seg',     value: timeLeft.seconds },
              ].map(({ label, value }) => (
                <div key={label} className="flex flex-col items-center">
                  <div className="bg-azul-600 rounded-lg w-14 h-14 flex items-center justify-center shadow-inner">
                    <span className="font-display text-3xl text-amarelo-400 leading-none">
                      {String(value).padStart(2, '0')}
                    </span>
                  </div>
                  <span className="text-verde-100 text-xs mt-1 uppercase tracking-wide">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Valor */}
      <div className="bg-amarelo-500 py-2 px-4 text-center">
        <p className="text-azul-600 font-bold text-sm tracking-wide">
          💰 Participação: <span className="text-lg">R$ 10,00</span> por palpite
        </p>
      </div>
    </header>
  );
}
