import type { AudioRegistry } from '../types';

export const audioManifest: AudioRegistry = {
  background: {
    id: 'background', kind: 'music', src: '/audio/background.mp3',
    volume: 0.4, loop: true, fadeInMs: 1500, fadeOutMs: 2000,
  },
  transition: {
    id: 'transition', kind: 'sfx', src: '/audio/transition.mp3',
    volume: 0.6, loop: false,
  },
  'gift-open': {
    id: 'gift-open', kind: 'sfx', src: '/audio/gift_open.mp3',
    volume: 0.7, loop: false,
  },
  'magic-chime': {
    id: 'magic-chime', kind: 'sfx', src: '/audio/magic_chime.mp3',
    volume: 0.6, loop: false,
  },
  butterflies: {
    id: 'butterflies', kind: 'sfx', src: '/audio/butterflies.mp3',
    volume: 0.5, loop: false,
  },
  celebration: {
    id: 'celebration', kind: 'sfx', src: '/audio/celebration.mp3',
    volume: 0.8, loop: false,
  },
};
