"use client";

import React, { useRef, useState, useEffect } from "react";
import { Send, Eraser, PenTool } from "lucide-react";

export default function InteractiveCanvas({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  
  // Set up kanvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Set resolusi kanvas
    // Kita buat ukuran resolusi tinggi agar gambarnya bagus,
    // namun secara CSS akan di-resize sesuai container.
    canvas.width = 500;
    canvas.height = 600;
    
    // Fill dengan background cream mirip #faf8f3
    ctx.fillStyle = "#faf8f3";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Setup brush pensil
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#2c2c2c";
    ctx.lineWidth = 3;
  }, []);

  // Menyesuaikan koordinat mouse/touch ke dalam kanvas yang sebenarnya
  const getCoordinates = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  };

  const startDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const { x, y } = getCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
    setHasDrawn(true);
    
    // Tangkap pointer agar tidak men-scroll layar di HP
    (e.target as HTMLCanvasElement).setPointerCapture(e.pointerId);
  };

  const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) {
      ctx.closePath();
    }
    setIsDrawing(false);
    (e.target as HTMLCanvasElement).releasePointerCapture(e.pointerId);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.fillStyle = "#faf8f3";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  const sendToEryca = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // 1. Download gambar otomatis
    const dataURL = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = "my-sketch-for-eryca.png";
    link.href = dataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // 2. Buka web Gmail langsung di tab baru (Lebih aman dari mailto bawaan PC)
    const email = "eryca847@gmail.com";
    const subject = encodeURIComponent("Check out my sketch!");
    const body = encodeURIComponent("Hi Eryca,\n\nI just drew something on your website! I have attached the drawing (it should be in my Downloads folder as 'my-sketch-for-eryca.png').\n\nCheers!");
    
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;
    window.open(gmailUrl, "_blank");
  };

  return (
    <div className={`relative flex flex-col items-center w-full max-w-md mx-auto ${className}`}>
      
      {/* Container Kanvas */}
      <div className="relative w-full aspect-[5/6] rounded-2xl overflow-hidden shadow-lg ring-1 ring-black/5 bg-white mb-3">
        <canvas
          ref={canvasRef}
          className="w-full h-full touch-none cursor-crosshair"
          onPointerDown={startDrawing}
          onPointerMove={draw}
          onPointerUp={stopDrawing}
          onPointerCancel={stopDrawing}
        />
        {!hasDrawn && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30">
            <span className="flex flex-col items-center gap-2 text-neutral-800 font-medium">
              <PenTool size={24} />
              Draw something here...
            </span>
          </div>
        )}
      </div>

      {/* Toolbar */}
      <div className="flex gap-3 w-full justify-center">
        <button
          onClick={clearCanvas}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border border-neutral-300 bg-white hover:bg-neutral-50 text-neutral-700 transition-colors"
        >
          <Eraser size={16} />
          Clear
        </button>
        <button
          onClick={sendToEryca}
          disabled={!hasDrawn}
          className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-colors ${
            hasDrawn 
            ? "bg-amber-600 hover:bg-amber-700 text-white shadow-sm" 
            : "bg-neutral-200 text-neutral-400 cursor-not-allowed"
          }`}
        >
          <Send size={16} />
          Send to Eryca
        </button>
      </div>

    </div>
  );
}
