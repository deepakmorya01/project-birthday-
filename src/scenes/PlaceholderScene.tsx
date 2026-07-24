import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { SceneComponentProps } from '../types';
import { useSceneManagerContext } from '../hooks';
import { GoldButton } from '../components';

const EASE = [0.16, 1, 0.3, 1] as const;

export function PlaceholderScene({ sceneId = '', isActive }: SceneComponentProps) {
  const manager = useSceneManagerContext();

  return (
    <div
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-6"
      style={{
        paddingTop: 'max(4rem, env(safe-area-inset-top))',
        paddingBottom: 'max(5rem, env(safe-area-inset-bottom))',
      }}
    >
      <motion.div
        className="relative z-10 flex flex-col items-center gap-8 text-center"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: isActive ? 1 : 0, scale: 1 }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        <p className="font-body text-xs tracking-[0.3em] text-gold-300/60 uppercase">
          Coming Soon
        </p>
        <h2 className="font-display text-display-md text-gradient-gold capitalize">
          {sceneId.replace(/-/g, ' ')}
        </h2>
        <p className="font-body text-sm text-void-300 max-w-xs">
          This scene is part of the journey and will be revealed soon.
        </p>
        {manager?.canGoNext && (
          <GoldButton variant="outline" onClick={() => manager.next()} className="mt-4">
            Continue
            <ArrowRight size={18} />
          </GoldButton>
        )}
      </motion.div>
    </div>
  );
}
