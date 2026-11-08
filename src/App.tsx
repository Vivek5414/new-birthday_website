import { useEffect, useState, type FormEvent } from 'react';
import Countdown from './components/Countdown';
import Gallery from './components/Gallery';
import Guestbook from './components/Guestbook';
import HeroPortrait from './components/HeroPortrait';
import IntroArtwork from './components/IntroArtwork';
import Navigation from './components/Navigation';
import { getPartyDateLabel, getPartyDay, party } from './data/party';
import './styles/app.css';

const imageUrl = (file: string) => `${import.meta.env.BASE_URL}images/${file}`;

const animals = [
  { name: 'Leo the Lion', kind: 'The birthday cheer captain', color: 'lion', position: '20% 75%' },
  { name: 'Ellie the Elephant', kind: 'Keeper of the best hugs', color: 'elephant', position: '90% 50%' },
  { name: 'Gigi the Giraffe', kind: 'Tallest lookout on the trail', color: 'giraffe', position: '45% 20%' },
  { name: 'Ziggy the Zebra', kind: 'Official explorer of snack spots', color: 'zebra', position: '50% 90%' },
  { name: 'Milo the Monkey', kind: 'Chief treehouse giggler', color: 'monkey', position: '100% 2%' },
];
const jungleArt = `url("${imageUrl('jungle-hero.png')}")`;

function App() {
  const [musicOn, setMusicOn] = useState(false);
  const [rsvpSent, setRsvpSent] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [guests, setGuests] = useState('1');
  const [attendance, setAttendance] = useState('yes');
  const inviteText = encodeURIComponent(party.whatsappMessage);
  const partyDay = getPartyDay(party.eventDate);
  const partyDateLabel = getPartyDateLabel(party.eventDate);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(party.mapsQuery)}`;

  useEffect(() => {
    if (!musicOn) return;
    const audio = new AudioContext();
    const notes = [392, 440, 523.25, 440, 349.23, 392, 440, 523.25];
    let noteIndex = 0;
    const playNote = () => {
      const oscillator = audio.createOscillator();
      const volume = audio.createGain();
      oscillator.type = 'sine';
      oscillator.frequency.value = notes[noteIndex % notes.length];
      volume.gain.setValueAtTime(0.0001, audio.currentTime);
      volume.gain.exponentialRampToValueAtTime(0.045, audio.currentTime + 0.03);
      volume.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + 0.28);
      oscillator.connect(volume);
      volume.connect(audio.destination);
      oscillator.start();
      oscillator.stop(audio.currentTime + 0.3);
      noteIndex += 1;
    };
    playNote();
    const rhythm = window.setInterval(playNote, 360);
    return () => {
      window.clearInterval(rhythm);
      void audio.close();
    };
  }, [musicOn]);

  useEffect(() => {
    const elements = [...document.querySelectorAll<HTMLElement>('.reveal-on-scroll')];
    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -36px 0px' });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  function submitRsvp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!guestName.trim()) return;
    setRsvpSent(true);
  }

  return (
    <>
      <Navigation />
      <main>
        <section className="hero" id="home" aria-labelledby="hero-title">
          <img className="hero-art" src={imageUrl('jungle-hero.png')} alt="" width="1672" height="941" loading="eager" />
          <div className="hero-shade" />
          <HeroPortrait />
          <div className="hero-content">
            <p className="hero-kicker"><span /> YOU’RE INVITED TO A LITTLE WILD ADVENTURE</p>
            <h1 id="hero-title">Welcome to the <em>wildest</em> birthday adventure!</h1>
            <p className="hero-subtitle">A little explorer is turning another year wilder!</p>
            <div className="hero-actions">
              <a className="button button-sun" href="#adventure">Explore the jungle <span aria-hidden="true">↓</span></a>
              <a className="button button-glass" href="#rsvp">Join the celebration <span aria-hidden="true">↗</span></a>
            </div>
            <div className="hero-footnote"><span>✦</span> LITTLE WILD ONE · SAFARI EDITION</div>
          </div>
          <div className="hero-sticker" aria-label="Adventure awaits">ADVENTURE<br /><b>AWAITS!</b><span>✳</span></div>
          <div className="hero-balloon balloon-one" aria-hidden="true">●</div>
          <div className="hero-balloon balloon-two" aria-hidden="true">●</div>
          <span className="hero-butterfly butterfly-one" aria-hidden="true">🦋</span>
          <span className="hero-butterfly butterfly-two" aria-hidden="true">🦋</span>
          <span className="hero-leaf leaf-one" aria-hidden="true">🍃</span>
          <span className="hero-leaf leaf-two" aria-hidden="true">🍃</span>
          <a className="scroll-cue" href="#intro"><span className="scroll-line" /> SCROLL TO EXPLORE</a>
        </section>

        <section className="countdown-section section-pad" id="countdown">
          <div className="countdown-deco countdown-deco-left" aria-hidden="true">✿</div>
          <div className="countdown-content reveal-on-scroll">
            <p className="eyebrow">Mark your explorer map</p>
            <h2>Counting down to <em>{party.name}’s big day!</em></h2>
            <p className="countdown-intro">{partyDay}, {partyDateLabel} · {party.celebrationTime}</p>
            <Countdown eventDate={party.eventDate} />
            <p className="date-note">We can’t wait to celebrate with you at {party.venue}.</p>
          </div>
          <div className="countdown-deco countdown-deco-right" aria-hidden="true">✦</div>
        </section>

        <section className="intro-section section-wrap" id="intro">
          <IntroArtwork partyName={party.name} />
          <div className="intro-copy reveal-on-scroll">
            <p className="eyebrow">A note from the jungle</p>
            <h2>Our little explorer’s <em>special day</em></h2>
            <p className="body-copy">The leaves are rustling, the animals are gathering, and there’s a very special reason to celebrate. Come share a day of big smiles, little adventures, and memories made in the wild.</p>
            <div className="wood-sign" aria-label={`Invitation for ${party.name}`}>
              <span className="sign-pin" />
              <span className="sign-label">OUR GUEST OF HONOUR</span>
              <strong>{party.name}</strong>
              <span className="sign-age">{party.age ? `IS TURNING ${party.age}!` : 'IS TURNING ANOTHER YEAR WILDER!'}</span>
              <span className="sign-leaf" aria-hidden="true">❧</span>
            </div>
            <a className="text-link" href="#countdown">Adventure details <span aria-hidden="true">↗</span></a>
          </div>
        </section>

        <section className="adventure-section section-pad" id="adventure">
          <div className="section-heading centered">
            <p className="eyebrow">Meet your safari crew</p>
            <h2>Friends of the <em>forest</em></h2>
            <p>Our favorite jungle pals are ready to celebrate. Who will you spot first?</p>
          </div>
          <div className="animal-grid">
            {animals.map((animal, index) => (
              <article className={`animal-card animal-${animal.color} reveal-on-scroll`} key={animal.name} style={{ transitionDelay: `${index * 65}ms` }}>
                <span className="animal-number">0{index + 1}</span>
                <div className={`animal-art animal-art-${animal.color}`} aria-hidden="true" style={{ backgroundImage: jungleArt, backgroundPosition: animal.position }} />
                <h3>{animal.name}</h3>
                <p>{animal.kind}</p>
                <span className="animal-card-spark" aria-hidden="true">✳</span>
              </article>
            ))}
          </div>
          <div className="adventure-note"><span>✳</span> Good explorers always travel with snacks.</div>
        </section>

        <section className="party-section" id="party">
          <img className="party-art" src={imageUrl('safari-party.png')} alt="Jungle animals celebrating together beneath party bunting" width="1672" height="941" loading="lazy" />
          <div className="party-overlay" />
          <div className="party-toran" aria-hidden="true"><span>✦</span> ❧ ❧ ❧ <span>✦</span></div>
          <div className="party-marigolds" aria-hidden="true">✿　✿　✿</div>
          <span className="party-spark party-spark-a" aria-hidden="true">✦</span>
          <span className="party-spark party-spark-b" aria-hidden="true">✳</span>
          <div className="party-copy reveal-on-scroll">
            <p className="party-greeting">With the blessings of God and love of our family</p>
            <p className="eyebrow">A traditional jungle celebration</p>
            <h2>Join Us for <em>{party.name}’s First Birthday!</em></h2>
            <p>Our little explorer is turning ONE! Come celebrate this special milestone with us.</p>
            <div className="party-nameplate"><span>✦</span><strong>{party.name}</strong><small>IS TURNING ONE</small><span>✦</span></div>
            <div className="party-details">
              <div><span className="detail-icon">✿</span><span><b>{partyDay}, {partyDateLabel}</b><small>{party.celebrationTime}</small></span></div>
              <div><span className="detail-icon">⌖</span><span><b>{party.venue}</b><small>{party.address}</small></span></div>
            </div>
            <div className="party-actions">
              <a className="button button-sun" href={mapsUrl} target="_blank" rel="noreferrer">Get directions <span aria-hidden="true">↗</span></a>
              <a className="button button-glass" href={`https://wa.me/?text=${inviteText}`} target="_blank" rel="noreferrer">RSVP on WhatsApp <span aria-hidden="true">↗</span></a>
            </div>
          </div>
        </section>

        <section className="dinner-section section-wrap">
          <div className="dinner-copy reveal-on-scroll">
            <p className="eyebrow">Follow the delicious smells</p>
            <h2>A wild feast <em>awaits!</em></h2>
            <p className="body-copy">After all that exploring, even the bravest adventurers need a little refuel. Join us around the table for good food, sweet treats, and seconds if you’re feeling wild.</p>
            <div className="dinner-meta">
              <span><i aria-hidden="true">◷</i><b>{party.dinnerTime}</b></span>
              <span><i aria-hidden="true">⌖</i><b>{party.venue}</b></span>
            </div>
            <div className="food-chips"><span>🍉 Fruit</span><span>🧁 Sweet treats</span><span>🍽️ Feast</span></div>
          </div>
          <div className="dinner-art-wrap reveal-on-scroll">
            <img src={imageUrl('dinner-party.png')} alt="A cozy birthday dinner table filled with jungle-inspired treats" width="1677" height="938" loading="lazy" />
            <span className="dinner-stamp">SIT, SIP<br />& SNACK <b>♥</b></span>
          </div>
        </section>

        <section className={`dance-section ${musicOn ? 'music-playing' : ''}`} id="dance">
          <img src={imageUrl('dance-party.png')} alt="Zebra and tiger dancing under colorful jungle disco lights" width="1677" height="938" loading="lazy" />
          <div className="dance-shade" />
          <span className="music-note music-note-a" aria-hidden="true">♪</span>
          <span className="music-note music-note-b" aria-hidden="true">♫</span>
          <div className="dance-content">
            <p className="eyebrow">Shake your tail feathers</p>
            <h2>Dance like nobody’s <em>watching!</em></h2>
            <p>When the sun goes down, the jungle turns up. Bring your best moves — silly ones absolutely encouraged.</p>
            <button className="music-button" type="button" onClick={() => setMusicOn((playing) => !playing)} aria-pressed={musicOn}>
              <span className="music-button-icon" aria-hidden="true">{musicOn ? 'Ⅱ' : '▶'}</span>
              {musicOn ? 'Pause the jungle beat' : 'Play a little jungle beat'}
            </button>
            <span className="music-caption">{musicOn ? 'A tiny tune is playing on your device' : 'Sound starts only when you press play'}</span>
          </div>
        </section>

        <section className="gallery-section section-pad">
          <div className="section-heading reveal-on-scroll">
            <p className="eyebrow">Little snapshots of magic</p>
            <h2>Postcards from the <em>wild</em></h2>
            <p>Tap a picture to take a closer peek at our safari daydream.</p>
          </div>
          <Gallery />
        </section>

        <section className="wishes-section section-pad" id="wishes">
          <div className="section-heading centered reveal-on-scroll">
            <p className="eyebrow">A little note goes a long way</p>
            <h2>Send a birthday <em>wish</em></h2>
            <p>Add your happy thought to the wish tree for our little explorer.</p>
          </div>
          <Guestbook />
        </section>

        <section className="rsvp-section section-pad" id="rsvp">
          <img className="rsvp-art" src={imageUrl('safari-adventure.png')} alt="" width="1672" height="941" loading="lazy" />
          <div className="rsvp-panel reveal-on-scroll">
            <p className="eyebrow">Pack your sense of adventure</p>
            <h2>Join our jungle <em>adventure!</em></h2>
            <p>Let us know if you can make it. We can’t wait to celebrate with you!</p>
            <form className="rsvp-form" onSubmit={submitRsvp}>
              <label htmlFor="rsvp-name">Explorer name</label>
              <input id="rsvp-name" name="name" autoComplete="name" placeholder="Your name" maxLength={80} value={guestName} onChange={(event) => { setGuestName(event.target.value); setRsvpSent(false); }} required />
              <label htmlFor="guest-count">Little (and big) explorers</label>
              <select id="guest-count" name="guests" value={guests} onChange={(event) => { setGuests(event.target.value); setRsvpSent(false); }}>
                {[1, 2, 3, 4, 5, 6].map((number) => <option value={number} key={number}>{number} {number === 1 ? 'guest' : 'guests'}</option>)}
              </select>
              <label htmlFor="attendance">Can you make it?</label>
              <select id="attendance" name="attendance" value={attendance} onChange={(event) => { setAttendance(event.target.value); setRsvpSent(false); }}>
                <option value="yes">Yes — we’re ready for a wild time!</option>
                <option value="no">Sorry — we can’t make it.</option>
              </select>
              <button className="button button-green" type="submit">Send my RSVP <span aria-hidden="true">↗</span></button>
              <p className="rsvp-status" aria-live="polite">{rsvpSent ? `${attendance === 'yes' ? 'Wonderful' : 'Thanks for letting us know'}, ${guestName.trim()}! Your RSVP is ready on this page, but hasn’t been sent or saved. Please let the host know directly.` : 'This RSVP is a preview only — it won’t be sent or stored yet.'}</p>
            </form>
            {rsvpSent && <div className="rsvp-confetti" aria-hidden="true">{Array.from({ length: 14 }, (_, index) => <span key={index} />)}</div>}
            <a className="whatsapp-link" href={`https://wa.me/?text=${inviteText}`} target="_blank" rel="noreferrer">Share the invite on WhatsApp <span aria-hidden="true">↗</span></a>
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <div className="footer-animals" aria-hidden="true">
          {animals.map((animal, index) => (
            <span
              className={`footer-animal animal-art-${animal.color}`}
              key={animal.name}
              style={{ backgroundImage: jungleArt, backgroundPosition: animal.position, animationDelay: `${index * -0.2}s` }}
            />
          ))}
        </div>
        <a className="footer-brand" href="#home">little <b>wild</b> one <span>✦</span></a>
        <p>May your days be merry and your adventures wild.</p>
        <span className="footer-rule" />
        <div className="footer-bottom">
          <small>© {new Date().getFullYear()} Little Wild One. Made with love & a little jungle magic.</small>
          <a href="#home">Back to the treetops ↑</a>
        </div>
      </footer>
    </>
  );
}

export default App;
