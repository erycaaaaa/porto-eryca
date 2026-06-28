"use client";

import React, { useState } from "react";

export default function AnimatedSketch({ className = "" }: { className?: string }) {
  // State key untuk me-restart animasi saat diklik
  const [animationKey, setAnimationKey] = useState(0);

  const handleReplay = () => {
    setAnimationKey((prev) => prev + 1);
  };

  return (
    <div 
      className={`relative w-full h-full max-w-md mx-auto cursor-pointer group ${className}`}
      onClick={handleReplay}
      title="Click to replay animation"
    >
      {/* Teks panduan kecil saat di-hover */}
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/75 text-white text-[10px] px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Click to replay
      </div>

      <svg
        key={animationKey} // Key ini akan memaksa SVG re-mount dan animasi mengulang
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 500 600"
        className="w-full h-full"
      >
        <defs>
          <filter id="pencil-texture" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.05"
              numOctaves="4"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="2.5"
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />

            <feTurbulence
              type="turbulence"
              baseFrequency="0.5"
              numOctaves="2"
              result="fineNoise"
            />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.2 0"
              in="fineNoise"
              result="fadedFineNoise"
            />

            <feComposite
              operator="in"
              in="fadedFineNoise"
              in2="displaced"
              result="final"
            />
            <feMerge>
              <feMergeNode in="displaced" />
              <feMergeNode in="final" />
            </feMerge>
          </filter>

          <style>{`
            .sketch-line {
              fill: none;
              stroke: #2c2c2c; /* Warna abu-abu gelap khas pensil 2B/4B */
              stroke-width: 2.5;
              stroke-linecap: round;
              stroke-linejoin: round;
              filter: url(#pencil-texture); /* Memasang filter pensil */
              
              /* Teknik CSS perkiraan panjang stroke untuk animasi drawing */
              stroke-dasharray: 1200;
              stroke-dashoffset: 1200;
              animation: drawEffect 4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
            }
          
          /* Variasi ketebalan garis agar sketsa terlihat alami */
          .thin-line {
            stroke-width: 1.5;
            opacity: 0.8;
          }

          .shading {
            stroke-width: 1;
            opacity: 0.4;
          }

          /* Urutan animasi (delay) agar tidak muncul barengan sekaligus */
          .layer-1 { animation-delay: 0s; }
          .layer-2 { animation-delay: 1.2s; }
          .layer-3 { animation-delay: 2.5s; }
          .layer-4 { animation-delay: 3.5s; }

          @keyframes drawEffect {
            to {
              stroke-dashoffset: 0;
            }
          }
        `}</style>
      </defs>

      {/* Background Cream */}
      <rect width="100%" height="100%" fill="#faf8f3" rx="16" />

      <g id="pencil-sketch-portrait">
        {/* LAYER 1: Bentuk Wajah & Leher */}
        {/* Wajah / Rahang */}
        <path
          className="sketch-line layer-1"
          d="M 190,260 C 170,290 175,340 185,360 C 195,380 210,420 250,420 C 290,420 305,380 315,360 C 325,340 330,290 310,260"
        />
        {/* Telinga Kiri */}
        <path
          className="sketch-line layer-1 thin-line"
          d="M 180,310 C 170,310 170,340 180,345"
        />
        {/* Telinga Kanan */}
        <path
          className="sketch-line layer-1 thin-line"
          d="M 320,310 C 330,310 330,340 320,345"
        />
        {/* Leher Kiri */}
        <path
          className="sketch-line layer-1 thin-line"
          d="M 225,415 L 225,470"
        />
        {/* Leher Kanan */}
        <path
          className="sketch-line layer-1 thin-line"
          d="M 275,415 L 275,470"
        />

        {/* LAYER 2: Rambut */}
        {/* Rambut Atas */}
        <path
          className="sketch-line layer-2"
          d="M 185,260 C 170,170 220,140 250,140 C 280,140 330,170 315,260"
        />
        {/* Rambut Kiri */}
        <path
          className="sketch-line layer-2"
          d="M 180,260 C 140,220 120,300 130,390"
        />
        {/* Rambut Kanan */}
        <path
          className="sketch-line layer-2"
          d="M 320,260 C 360,220 380,300 370,390"
        />
        {/* Aksen Poni Kiri */}
        <path
          className="sketch-line layer-2 thin-line"
          d="M 190,260 C 190,220 210,200 250,190"
        />
        {/* Aksen Poni Kanan */}
        <path
          className="sketch-line layer-2 thin-line"
          d="M 310,260 C 310,220 290,200 250,190"
        />

        {/* LAYER 3: Fitur Wajah (Mata, Hidung, Mulut) */}
        {/* Alis Kiri */}
        <path
          className="sketch-line layer-3"
          d="M 205,285 C 220,280 235,285 245,290"
        />
        {/* Alis Kanan */}
        <path
          className="sketch-line layer-3"
          d="M 255,290 C 265,285 280,280 295,285"
        />
        {/* Mata Kiri */}
        <path
          className="sketch-line layer-3 thin-line"
          d="M 210,305 C 220,300 230,300 240,305 C 230,310 220,310 210,305"
        />
        <circle className="sketch-line layer-3" cx="225" cy="305" r="2" fill="#2c2c2c" />
        {/* Mata Kanan */}
        <path
          className="sketch-line layer-3 thin-line"
          d="M 260,305 C 270,300 280,300 290,305 C 280,310 270,310 260,305"
        />
        <circle className="sketch-line layer-3" cx="275" cy="305" r="2" fill="#2c2c2c" />
        {/* Hidung */}
        <path
          className="sketch-line layer-3 thin-line"
          d="M 250,305 L 245,345 C 250,350 255,350 260,340"
        />
        {/* Bibir/Mulut */}
        <path
          className="sketch-line layer-3"
          d="M 230,375 C 240,380 260,380 270,375 C 260,385 240,385 230,375"
        />
        <path
          className="sketch-line layer-3 thin-line"
          d="M 235,377 C 245,378 255,378 265,377"
        />

        {/* LAYER 4: Pakaian & Shading Halus */}
        {/* Bahu/Baju Kiri */}
        <path
          className="sketch-line layer-4"
          d="M 225,470 C 200,480 140,500 110,560"
        />
        {/* Bahu/Baju Kanan */}
        <path
          className="sketch-line layer-4"
          d="M 275,470 C 300,480 360,500 390,560"
        />
        {/* Kerah Baju */}
        <path
          className="sketch-line layer-4 thin-line"
          d="M 225,470 C 250,490 275,470 275,470"
        />
        {/* Shading Leher */}
        <path
          className="sketch-line layer-4 shading"
          d="M 235,420 L 230,450 M 245,420 L 240,455 M 255,420 L 250,455 M 265,420 L 260,450"
        />
        {/* Tanda Tangan / Corettan Kecil */}
        <path
          className="sketch-line layer-4 thin-line"
          d="M 370,550 C 380,540 390,550 380,560"
        />
      </g>
    </svg>
    </div>
  );
}
