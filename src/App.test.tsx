import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('birthday website rendering', () => {
  const markup = renderToStaticMarkup(createElement(App));

  it('keeps the existing page sections and birthday content', () => {
    for (const section of ['intro', 'adventure', 'party', 'dance', 'countdown', 'wishes', 'rsvp']) {
      expect(markup).toContain(`id="${section}"`);
    }
    expect(markup).toContain('A wild feast');
    expect(markup).toContain('Postcards from the');
  });

  it('uses the original jungle artwork for the safari animal portraits', () => {
    expect(markup).toContain('images/jungle-hero.png');
    expect((markup.match(/class="animal-card /g) ?? [])).toHaveLength(5);
    for (const position of ['20% 75%', '90% 50%', '45% 20%', '50% 90%', '100% 2%']) {
      expect(markup).toContain(`background-position:${position}`);
    }
  });

  it('keeps all five gallery photos as original photographic assets', () => {
    const photos = markup.match(/images\/postcard\/birthday-photo-\d\.jpg/g) ?? [];
    expect(photos).toHaveLength(5);
  });
});
