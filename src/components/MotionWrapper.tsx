"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface MotionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function MotionFadeUp({ children, className, delay = 0 }: MotionProps) {
  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function MotionStagger({ children, className }: Omit<MotionProps, "delay">) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function MotionStaggerItem({ children, className }: Omit<MotionProps, "delay">) {
  return (
    <motion.div
      variants={{
        hidden: { y: 30, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface MotionSlideInProps extends MotionProps {
  direction?: "left" | "right";
}

export function MotionSlideIn({ children, className, delay = 0, direction = "left" }: MotionSlideInProps) {
  return (
    <motion.div
      initial={{ x: direction === "left" ? -60 : 60, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
