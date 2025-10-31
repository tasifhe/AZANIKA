'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface ParallaxProps {
  children: React.ReactNode;
  offset?: number;
  className?: string;
}

export const Parallax: React.FC<ParallaxProps> = ({
  children,
  offset = 50,
  className = '',
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, offset]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
};

interface ScrollFadeProps {
  children: React.ReactNode;
  className?: string;
}

export const ScrollFade: React.FC<ScrollFadeProps> = ({
  children,
  className = '',
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <motion.div ref={ref} style={{ opacity }} className={className}>
      {children}
    </motion.div>
  );
};

interface ScrollScaleProps {
  children: React.ReactNode;
  className?: string;
}

export const ScrollScale: React.FC<ScrollScaleProps> = ({
  children,
  className = '',
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 30 });

  return (
    <motion.div ref={ref} style={{ scale: smoothScale }} className={className}>
      {children}
    </motion.div>
  );
};

interface StickyScrollProps {
  children: React.ReactNode;
  className?: string;
}

export const StickyScroll: React.FC<StickyScrollProps> = ({
  children,
  className = '',
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={ref} className={`relative ${className}`}>
      {children}
    </div>
  );
};

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  width?: 'fit' | 'full';
}

export const RevealOnScroll: React.FC<RevealOnScrollProps> = ({
  children,
  className = '',
  width = 'fit',
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.7"],
  });

  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${width === 'full' ? 'w-full' : 'w-fit'} ${className}`}>
      <motion.div
        style={{ scaleX }}
        className="absolute inset-0 bg-gradient-to-r from-blush-400 to-blush-600 origin-left z-10"
      />
      <div className="relative z-0">{children}</div>
    </div>
  );
};
