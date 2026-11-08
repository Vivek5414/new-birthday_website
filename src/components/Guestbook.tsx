import { useState, type FormEvent } from 'react';
import { demoWishes, type DemoWish } from '../data/demoWishes';
import './Guestbook.css';

export default function Guestbook() {
  const [wishes, setWishes] = useState<DemoWish[]>(demoWishes);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function submitWish(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanName = name.trim();
    const cleanMessage = message.trim();
    if (!cleanName || !cleanMessage) return;
    setWishes((current) => [{ name: cleanName, message: cleanMessage }, ...current]);
    setName('');
    setMessage('');
    setSubmitted(true);
  }

  return (
    <div className="guestbook-layout">
      <form className="wish-form" onSubmit={submitWish}>
        <p className="eyebrow">Leave a little love</p>
        <label htmlFor="wish-name">Your name</label>
        <input id="wish-name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Explorer name" maxLength={60} required />
        <label htmlFor="wish-message">Your birthday wish</label>
        <textarea id="wish-message" value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Send a little birthday magic…" rows={4} maxLength={240} required />
        <button className="button button-green" type="submit">Pin your wish <span aria-hidden="true">↗</span></button>
        <p className="form-note" aria-live="polite">{submitted ? 'Your wish is pinned for this visit — it has not been saved to a server.' : 'Just for this visit. Online wish storage can be connected later.'}</p>
      </form>
      <div className="wish-wall" aria-live="polite">
        <div className="wish-wall-heading"><span>✦</span> The wish tree <span>✦</span></div>
        {wishes.length === 0 && <p className="wish-empty">No birthday notes yet. Be the first to leave one!</p>}
        {wishes.map((wish, index) => (
          <article className={`wish-note wish-note-${index % 3}`} key={`${wish.name}-${wish.message}-${index}`}>
            <span className="wish-spark" aria-hidden="true">{index % 3 === 1 ? '❧' : index % 3 === 2 ? '✦' : '✳'}</span>
            <p>“{wish.message}”</p>
            <strong>— {wish.name}</strong>
          </article>
        ))}
      </div>
    </div>
  );
}
