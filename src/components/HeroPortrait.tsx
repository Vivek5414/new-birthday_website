import './HeroPortrait.css';

export default function HeroPortrait() {
  return (
    <div className="hero-portrait" role="img" aria-label="The birthday boy">
      <svg className="hero-portrait__sprig hero-portrait__sprig-left" viewBox="0 0 70 100" aria-hidden="true">
        <path className="hero-portrait__stem" d="M56 92C47 66 36 39 15 10" />
        <path className="hero-portrait__leaf" d="M28 34C8 36 3 26 6 13c14 0 24 6 22 21Z" />
        <path className="hero-portrait__leaf" d="M39 56c-19-2-26-12-22-25 15 3 24 12 22 25Z" />
        <path className="hero-portrait__leaf" d="M48 75c-18 1-27-7-25-20 15 0 24 7 25 20Z" />
      </svg>
      <div className="hero-portrait__frame">
        <img
          className="hero-portrait__image"
          src={`${import.meta.env.BASE_URL}images/birthday-boy.jpg`}
          alt=""
        />
      </div>
      <svg className="hero-portrait__sprig hero-portrait__sprig-right" viewBox="0 0 70 100" aria-hidden="true">
        <path className="hero-portrait__stem" d="M14 92C23 66 34 39 55 10" />
        <path className="hero-portrait__leaf" d="M42 34c20 2 25-8 22-21-14 0-24 6-22 21Z" />
        <path className="hero-portrait__leaf" d="M31 56c19-2 26-12 22-25-15 3-24 12-22 25Z" />
        <path className="hero-portrait__leaf" d="M22 75c18 1 27-7 25-20-15 0-24 7-25 20Z" />
      </svg>
    </div>
  );
}
