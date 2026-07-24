import type { AudioTrackId, AudioTrackDefinition } from '../types';
import { audioManifest } from '../config/audio';

type TrackState = 'idle' | 'loading' | 'playing' | 'paused' | 'fading-out';

interface InternalTrack {
  audio: HTMLAudioElement;
  def: AudioTrackDefinition;
  state: TrackState;
}

const rampTo = (audio: HTMLAudioElement, target: number, durationMs: number) =>
  new Promise<void>((resolve) => {
    const start = audio.volume;
    const delta = target - start;
    if (Math.abs(delta) < 0.001 || durationMs <= 0) {
      audio.volume = target;
      resolve();
      return;
    }
    const steps = Math.max(1, Math.floor(durationMs / 16));
    let i = 0;
    const tick = () => {
      i += 1;
      audio.volume = Math.max(0, Math.min(1, start + delta * (i / steps)));
      if (i < steps) requestAnimationFrame(tick);
      else resolve();
    };
    requestAnimationFrame(tick);
  });

class AudioManager {
  private tracks = new Map<AudioTrackId, InternalTrack>();
  private muted = false;

  private ensure(id: AudioTrackId): InternalTrack | undefined {
    const existing = this.tracks.get(id);
    if (existing) return existing;
    const def = audioManifest[id];
    if (!def) return undefined;
    const audio = new Audio(def.src);
    audio.loop = def.loop;
    audio.volume = this.muted ? 0 : def.volume;
    audio.preload = 'auto';
    const track: InternalTrack = { audio, def, state: 'idle' };
    this.tracks.set(id, track);
    return track;
  }

  async play(id: AudioTrackId): Promise<void> {
    const track = this.ensure(id);
    if (!track) return;
    track.state = 'loading';
    try {
      if (track.def.fadeInMs && !this.muted) {
        track.audio.volume = 0;
        await track.audio.play();
        await rampTo(track.audio, track.def.volume, track.def.fadeInMs);
      } else {
        await track.audio.play();
      }
      track.state = 'playing';
    } catch {
      track.state = 'idle';
    }
  }

  async stop(id: AudioTrackId): Promise<void> {
    const track = this.tracks.get(id);
    if (!track) return;
    if (track.def.fadeOutMs) {
      track.state = 'fading-out';
      await rampTo(track.audio, 0, track.def.fadeOutMs);
    }
    track.audio.pause();
    track.audio.currentTime = 0;
    track.audio.volume = this.muted ? 0 : track.def.volume;
    track.state = 'idle';
  }

  pause(id: AudioTrackId): void {
    const track = this.tracks.get(id);
    if (!track || track.state !== 'playing') return;
    track.audio.pause();
    track.state = 'paused';
  }

  resume(id: AudioTrackId): void {
    const track = this.tracks.get(id);
    if (!track || track.state !== 'paused') return;
    void track.audio.play();
    track.state = 'playing';
  }

  async playSfx(id: AudioTrackId, duckMs = 400): Promise<void> {
    const bg = this.tracks.get('background');
    const ducked = bg && bg.state === 'playing';
    if (ducked) await rampTo(bg!.audio, bg!.def.volume * 0.3, duckMs);
    await this.play(id);
    const track = this.tracks.get(id);
    if (track) {
      track.audio.addEventListener('ended', () => {
        if (ducked) void rampTo(bg!.audio, bg!.def.volume, duckMs);
      }, { once: true });
    }
  }

  setMuted(muted: boolean): void {
    this.muted = muted;
    for (const track of this.tracks.values()) track.audio.muted = muted;
  }

  isMuted(): boolean { return this.muted; }

  dispose(): void {
    for (const track of this.tracks.values()) {
      track.audio.pause();
      track.audio.src = '';
    }
    this.tracks.clear();
  }
}

export const audioManager = new AudioManager();
