"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

// Path SVG berbentuk daun (sederhana)
const LEAF_PATH = "M24,2c0,0-12,0-18,6c-6,6-4,14-4,14s8-2,14-8C22,8,24,2,24,2z";

type LeafConfig = {
  id: number;
  x: string;
  y: string;
  scale: number;
  rotate: number;
  opacity: number;
  duration: number;
  delay: number;
};

const LEAVES: LeafConfig[] = [
  { id: 1, x: "10%", y: "15%", scale: 1.5, rotate: 15, opacity: 0.15, duration: 8, delay: 0 },
  { id: 2, x: "85%", y: "20%", scale: 2, rotate: -25, opacity: 0.1, duration: 10, delay: 1 },
  { id: 3, x: "5%", y: "70%", scale: 1.2, rotate: 45, opacity: 0.12, duration: 7, delay: 2 },
  { id: 4, x: "80%", y: "75%", scale: 2.5, rotate: -15, opacity: 0.08, duration: 12, delay: 0.5 },
  { id: 5, x: "50%", y: "50%", scale: 3, rotate: 60, opacity: 0.05, duration: 15, delay: 3 },
  { id: 6, x: "30%", y: "85%", scale: 1.8, rotate: -40, opacity: 0.1, duration: 9, delay: 1.5 },
];

export default function AnimatedLeavesBackground() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-50">
      {LEAVES.map((leaf) => (
        <motion.div
          key={leaf.id}
          className="absolute text-[#5f3d24]"
          style={{
            top: leaf.y,
            left: leaf.x,
            originX: 0.5,
            originY: 0.5,
          }}
          initial={{
            scale: leaf.scale,
            rotate: leaf.rotate,
            opacity: leaf.opacity,
          }}
          animate={
            prefersReducedMotion
              ? { opacity: leaf.opacity, scale: leaf.scale }
              : {
                  scale: [leaf.scale, leaf.scale * 1.2, leaf.scale],
                  rotate: [leaf.rotate, leaf.rotate + 15, leaf.rotate - 5, leaf.rotate],
                  y: [0, -30, 10, 0],
                  x: [0, 20, -10, 0],
                }
          }
          transition={{
            duration: leaf.duration,
            delay: leaf.delay,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        >
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-md"
          >
            <path d={LEAF_PATH} />
          </svg>
        </motion.div>
      ))}
      
    </div>
  );
}
