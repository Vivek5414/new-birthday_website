import { useState } from 'react';
import './Navigation.css';

const links = [
  ['The story', '#intro'],
  ['Safari', '#adventure'],
  ['The party', '#party'],
  ['The details', '#countdown'],
  ['RSVP', '#rsvp'],
];

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <a className="brand" href="#home" aria-label="Little Wild One, home" onClick={() => setMenuOpen(false)}>
        <span className="brand-mark" aria-hidden="true">✦</span>
        <span>little <b>wild</b> one</span>
      </a>
      <button
        className="menu-toggle"
        type="button"
        aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span />
        <span />
      </button>
      <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
        {links.map(([label, href]) => (
          <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
        ))}
        <a className="nav-cta" href="#rsvp" onClick={() => setMenuOpen(false)}>Count me in <span aria-hidden="true">↗</span></a>
      </nav>
    </header>
  );
}
