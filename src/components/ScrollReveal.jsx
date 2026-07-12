"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const ScrollReveal = ({ children, delay = 0, direction = "up" }) => {
  const [skip, setSkip] = useState(false);

  useEffect(() => {
    if (window.__skipAnimations) {
      setSkip(true);
    }
  }, []);

  if (skip) {
    return <div className="w-full h-full text-inherit">{children}</div>;
  }

  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: directions[direction].y,
        x: directions[direction].x,
        scale: 0.98,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
      }}
      viewport={{
        once: true,
        margin: "-50px",
      }}
      transition={{
        type: "spring",
        stiffness: 60,
        damping: 15,
        delay: delay,
      }}
    >
      {children}
    </motion.div>
  );
};
