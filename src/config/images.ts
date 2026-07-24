import type { GalleryImage, MemoryImage, ImageAsset, ImageId } from '../types';

const teaserCaptions = [
  'A whisper of what is to come...',
  'Every great story begins with a moment.',
  'Some surprises are worth waiting for.',
  'The best is yet to arrive...',
  'One more reason to smile...',
];

export function getTeaserImages(): GalleryImage[] {
  return teaserCaptions.map((caption, i) => ({
    id: `teaser-${i + 1}`,
    src: `/images/teaser/teaser-${i + 1}.jpg`,
    alt: `Teaser ${i + 1}`,
    caption,
  }));
}

const memoryCaptions = [
  'A beautiful beginning.',
  'A smile I\'ll never forget.',
  'Every moment mattered.',
  'Little memories, endless happiness.',
  'You made life brighter.',
  'The laughter still echoes.',
  'So many unforgettable moments.',
  'Closer than yesterday.',
  'Almost there...',
  'The best surprise is waiting.',
];

export function getMemoryImages(): MemoryImage[] {
  return memoryCaptions.map((caption, i) => ({
    id: `memory-${i + 1}`,
    src: `/images/memory/memory-${i + 1}.jpg`,
    alt: `Memory ${i + 1}`,
    caption,
  }));
}

export const imageManifest: Record<ImageId, ImageAsset> = {
  ...Object.fromEntries(getTeaserImages().map((img) => [img.id, { id: img.id, src: img.src, alt: img.alt }])),
  ...Object.fromEntries(getMemoryImages().map((img) => [img.id, { id: img.id, src: img.src, alt: img.alt }])),
};
