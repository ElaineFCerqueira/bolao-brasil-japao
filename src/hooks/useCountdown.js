// src/hooks/useCountdown.js
import { useState, useEffect } from 'react';

const MATCH_DATE = new Date('2026-06-29T14:00:00-03:00'); // Horário de Brasília

export function useCountdown() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());
  const [isExpired, setIsExpired] = useState(Date.now() >= MATCH_DATE.getTime());

  function getTimeLeft() {
    const diff = MATCH_DATE.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const tl = getTimeLeft();
      setTimeLeft(tl);
      if (Date.now() >= MATCH_DATE.getTime()) {
        setIsExpired(true);
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return { timeLeft, isExpired };
}
