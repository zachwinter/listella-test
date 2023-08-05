import { forwardRef } from 'react';
import { HTMLMotionProps, motion } from 'framer-motion';
import { useGlobalValue } from '@/store';
import { useRouter } from 'next/router';

type PageTransitionProps = HTMLMotionProps<'div'>;
type PageTransitionRef = React.ForwardedRef<HTMLDivElement>;

const FADE = {
  initial: {
    opacity: 0,
    transform: 'translateY(0px) scale(.9)',
  },

  animate: {
    opacity: 1,
    transform: 'translateY(0px) scale(1)',
  },

  exit: {
    opacity: 0,
    transform: 'translateY(0px) scale(.9)',
  },
};

const TRANSITIONS = {
  FADE
};

export type RouteTransition = 'FADE'

const View = (
  { children, className = '', ...rest }: PageTransitionProps,
  ref: PageTransitionRef
) => {
  const router = useRouter()
  const transition = useGlobalValue('viewport.transition') as RouteTransition;
  const duration = .35;
  const ease = [0.14, 0.93, 0.58, 0.99];

  return (
    <motion.main
      ref={ref}
      className={`${router.asPath.split('/')[1] || 'home'} ${className || ''}`}
      initial={TRANSITIONS[transition].initial}
      animate={TRANSITIONS[transition].animate}
      exit={TRANSITIONS[transition].exit}
      transition={{ duration, ease }}
      {...rest}
    >
      {children}
    </motion.main>
  );
};

export default forwardRef(View);
