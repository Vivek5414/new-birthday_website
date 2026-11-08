import './IntroArtwork.css';

type IntroArtworkProps = {
  partyName: string;
};

function IntroArtwork({ partyName }: IntroArtworkProps) {
  return (
    <div className="intro-art-wrap reveal-on-scroll">
      <div className="intro-image-frame">
        <img
          src={`${import.meta.env.BASE_URL}images/safari-birthday.png`}
          alt={`${partyName}’s jungle birthday with a lion, elephant, zebra, giraffe, monkey and parrot`}
          loading="lazy"
        />
      </div>
      <span className="art-sticker">OH, WHAT<br />A DAY! <b>✳</b></span>
    </div>
  );
}

export default IntroArtwork;