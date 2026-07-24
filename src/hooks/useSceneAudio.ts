import { useEffect, useRef } from 'react';
import type { SceneId } from '../types';

export function useSceneAudio(_current: SceneId): void {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  useEffect(() => {
    return () => { if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; } };
  }, []);
}
