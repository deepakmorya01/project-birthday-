import { useEffect, useState } from 'react';

export function useAudioConsent(): boolean {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    if (consented) return;
    const handler = () => setConsented(true);
    const events: (keyof WindowEventMap)[] = ['click', 'keydown', 'touchstart'];
    events.forEach((e) => window.addEventListener(e, handler, { once: true }));
    return () => events.forEach((e) => window.removeEventListener(e, handler));
  }, [consented]);

  return consented;
}
