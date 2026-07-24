import { motion } from 'framer-motion';
import type { SceneComponentProps } from '../../types/scene';

const EASE = [0.16, 1, 0.3, 1] as const;

export function CelebrationScene(_: SceneComponentProps) {
  return (
    <motion.div
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: EASE }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-void-950 via-void-900 to-void-950" />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 40%, rgba(233,177,58,0.12), transparent 60%)',
        }}
      />
      <div className="relative z-10 text-center">
        <motion.h1
          className="font-display text-4xl sm:text-5xl text-gradient-gold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.3 }}
          style={{ color: '#e9b13a' }}
        >
          Happy Birthday, Kumkum
        </motion.h1>
        <motion.p
          className="mt-4 font-display text-lg italic"
          style={{ color: '#c4c4cc' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          The celebration begins...
        </motion.p>
      </div>
    </motion.div>
  );
}
