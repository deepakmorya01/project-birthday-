export type AudioTrackId =
  | 'background'
  | 'transition'
  | 'gift-open'
  | 'magic-chime'
  | 'butterflies'
  | 'celebration';

export type AudioTrackKind = 'music' | 'sfx';

export interface AudioTrackDefinition {
  id: AudioTrackId;
  kind: AudioTrackKind;
  src: string;
  volume: number;
  loop: boolean;
  fadeInMs?: number;
  fadeOutMs?: number;
}

export type AudioRegistry = Record<AudioTrackId, AudioTrackDefinition>;
