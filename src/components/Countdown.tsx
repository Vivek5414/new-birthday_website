import { useEffect, useState } from 'react';
import './Countdown.css';

type CountdownValues = { days: number; hours: number; minutes: number; seconds: number };

function getTimeLeft(date: string): CountdownValues | null {
  const target = new Date(date).getTime();
  if (!Number.isFinite(target)) return null;
  const remaining = target - Date.now();
  if (remaining <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(remaining / 86_400_000),
    hours: Math.floor((remaining / 3_600_000) % 24),
    minutes: Math.floor((remaining / 60_000) % 60),
    seconds: Math.floor((remaining / 1_000) % 60),
  };
}

export default function Countdown({ eventDate }: { eventDate: string }) {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(eventDate));

  useEffect(() => {
    setTimeLeft(getTimeLeft(eventDate));
    if (!eventDate || !Number.isFinite(new Date(eventDate).getTime())) return;
    const timer = window.setInterval(() => setTimeLeft(getTimeLeft(eventDate)), 1_000);
    return () => window.clearInterval(timer);
  }, [eventDate]);

  return (
    <div className="countdown-panel" aria-live="polite">
      {!eventDate ? (
        <p className="countdown-pending"><span aria-hidden="true">✦</span> The adventure date is coming soon!</p>
      ) : timeLeft && timeLeft.days + timeLeft.hours + timeLeft.minutes + timeLeft.seconds === 0 ? (
        <p className="countdown-pending"><span aria-hidden="true">🎉</span> The jungle is celebrating today!</p>
      ) : timeLeft ? (
        <div className="countdown-grid">
          {([
            ['days', timeLeft.days],
            ['hours', timeLeft.hours],
            ['minutes', timeLeft.minutes],
            ['seconds', timeLeft.seconds],
          ] as const).map(([label, value]) => (
            <div className="countdown-unit" key={label}>
              <span className="countdown-number">{String(value).padStart(2, '0')}</span>
              <span className="countdown-label">{label}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="countdown-pending">The adventure date will be announced soon.</p>
      )}
    </div>
  );
}
