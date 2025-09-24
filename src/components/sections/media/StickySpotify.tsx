"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Music2, X } from "lucide-react";
import { useNowPlaying } from "@/components/sections/media/NowPlayingProvider";

type Pos = { x: number; y: number };
const STORAGE_KEY = "stickySpotifyPos_v3";
const DRAG_THRESHOLD = 6;
const LONG_PRESS_MS = 180;

export default function StickySpotify() {
  const { isPlaying } = useNowPlaying(); // opsional untuk label
  const [open, setOpen] = useState(false);

  const BASE_W = 360;
  const BASE_H = 152;
  const PAD_X = 8;

  const MIN = 0.6;
  const [scale, setScale] = useState(0.84);
  const [maxScale, setMaxScale] = useState(1.2);
  const [pos, setPos] = useState<Pos | null>(null);

  const wrapRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef<{
    startX: number;
    startY: number;
    startPos: Pos;
    dragging: boolean;
    longPressId: number | null;
  } | null>(null);

  useEffect(() => {
    const recalc = () => {
      const VIEW_MARGIN = 16;
      const vw = window.innerWidth;
      const allowedContentWidth = Math.max(200, vw - VIEW_MARGIN - PAD_X * 2);
      const fit = allowedContentWidth / BASE_W;
      const cap = Math.min(1.2, fit);
      setMaxScale(Math.max(MIN, cap));
      setScale((s) => clamp(s, MIN, Math.max(MIN, cap)));
    };
    recalc();
    window.addEventListener("resize", recalc);
    return () => window.removeEventListener("resize", recalc);
  }, []);

  const contentW = Math.round(BASE_W * scale);
  const contentH = Math.round(BASE_H * scale);
  const cardW = contentW + PAD_X * 2;

  const measureWrap = useCallback(() => {
    const el = wrapRef.current;
    if (!el) return { w: cardW, h: open ? contentH + 48 : 36 };
    const rect = el.getBoundingClientRect();
    const w = rect.width || cardW;
    const h = rect.height || (open ? contentH + 48 : 36);
    return { w, h };
  }, [open, contentH, cardW]);

  const clampToViewport = useCallback(
    (p: Pos) => {
      const margin = 8;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const { w, h } = measureWrap();
      return {
        x: clamp(p.x, margin, Math.max(margin, vw - w - margin)),
        y: clamp(p.y, margin, Math.max(margin, vh - h - margin)),
      };
    },
    [measureWrap]
  );

  useLayoutEffect(() => {
    const init = () => {
      let fromStore: Pos | null = null;
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        fromStore = raw ? JSON.parse(raw) : null;
      } catch {}
      const vw = window.innerWidth;
      const margin = 8;
      const def: Pos = { x: vw - cardW - margin, y: margin };
      setPos(() => clampToViewport(fromStore ?? def));
    };
    const id = requestAnimationFrame(init);
    return () => cancelAnimationFrame(id);
  }, [cardW, clampToViewport]);

  useEffect(() => {
    if (pos) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(pos));
      } catch {}
    }
  }, [pos]);

  useEffect(() => {
    const onResize = () => setPos((p) => (p ? clampToViewport(p) : p));
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [clampToViewport]);

  const onWrapperPointerDown: React.PointerEventHandler<HTMLDivElement> = (
    e
  ) => {
    const target = e.target as HTMLElement;
    if (
      target.closest(
        "input, textarea, select, a, label, [role='slider'], [data-no-drag]"
      )
    )
      return;
    if (!pos) return;

    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startPos: pos,
      dragging: false,
      longPressId: window.setTimeout(() => {
        if (!dragRef.current) return;
        startDragging(e.pointerId);
      }, LONG_PRESS_MS),
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
  };

  const startDragging = (pointerId: number) => {
    if (!dragRef.current || dragRef.current.dragging) return;
    wrapRef.current?.setPointerCapture?.(pointerId);
    dragRef.current.dragging = true;
    document.body.classList.add("select-none");
  };

  const clearTimers = () => {
    if (dragRef.current?.longPressId) {
      clearTimeout(dragRef.current.longPressId);
      dragRef.current.longPressId = null;
    }
  };

  const onPointerMove = (e: PointerEvent) => {
    const d = dragRef.current;
    if (!d) return;

    const dx = e.clientX - d.startX;
    const dy = e.clientY - d.startY;

    if (
      !d.dragging &&
      (Math.abs(dx) > DRAG_THRESHOLD || Math.abs(dy) > DRAG_THRESHOLD)
    ) {
      startDragging(e.pointerId);
    }

    if (!d.dragging) return;

    const next: Pos = { x: d.startPos.x + dx, y: d.startPos.y + dy };
    setPos(clampToViewport(next));
  };

  const onPointerUp = () => {
    clearTimers();
    if (!dragRef.current?.dragging) {
      dragRef.current = null;
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      return;
    }
    dragRef.current = null;
    document.body.classList.remove("select-none");
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", onPointerUp);
  };

  if (!pos) return null;

  return (
    <div
      ref={wrapRef}
      onPointerDown={onWrapperPointerDown}
      className={`sticky-spotify-wrap fixed z-[2000] ${
        open ? "cursor-grab active:cursor-grabbing" : "cursor-move"
      }`}
      style={{
        left: pos.x,
        top: pos.y,
        width: open ? cardW : "auto",
        touchAction: "none",
      }}
    >
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="group relative inline-flex items-center justify-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium border-[color:var(--border)] bg-[var(--background)]/90 text-[var(--foreground)] shadow-lg backdrop-blur"
          aria-label="Open Spotify player"
        >
          <Music2 className="h-4 w-4" />
          {isPlaying ? "Playing" : "Playing Spotify"}
          <span
            className="pointer-events-none absolute top-full left-1/2 -translate-x-1/2 mt-[-60px] whitespace-nowrap rounded-[50px] bg-black/5 px-2 py-1 text-[11px] text-[#494949] opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
            role="tooltip"
            aria-hidden="true"
          >
            Tap to play music
          </span>
        </button>
      ) : (
        <div
          className="rounded-2xl border border-[color:var(--border)] bg-[var(--background)]/90 text-[var(--foreground)] shadow-xl backdrop-blur p-2 overflow-visible select-none"
          style={{ width: cardW }}
        >
          <div className="relative mb-2 flex items-center justify-between gap-3 px-1 group">
            <span className="text-xs font-medium opacity-70">
              {isPlaying ? "Now Playing" : "Playing Spotify"}
            </span>

            <span
              className="pointer-events-none absolute top-full left-1/2 -translate-x-1/2 mt-[-70px] z-50 whitespace-nowrap rounded-[50px] bg-black/5 px-2 py-1 text-[11px] text-[#494949] opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100"
              role="tooltip"
            >
              Hi! Enjoy my playlist 🎵
            </span>

            <input
              data-no-drag
              type="range"
              min={MIN}
              max={maxScale}
              step={0.01}
              value={scale}
              onChange={(e) =>
                setScale(clamp(parseFloat(e.target.value), MIN, maxScale))
              }
              className="w-24 accent-current"
              aria-label="Resize player"
            />

            <button
              data-no-drag
              onClick={() => setOpen(false)}
              className="rounded-full p-1 hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:hover:bg-white/5 dark:focus-visible:ring-white/20"
              aria-label="Close Spotify dock"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div
            className="relative overflow-hidden rounded-xl"
            style={{ width: contentW, height: contentH }}
          >
            <div
              style={{
                width: BASE_W,
                height: BASE_H,
                transform: `scale(${scale})`,
                transformOrigin: "top left",
                willChange: "transform",
              }}
            >
              <iframe
                src="https://open.spotify.com/embed/playlist/5kajo3mgDkcaQr6RbNPSkR?utm_source=generator"
                width={BASE_W}
                height={BASE_H}
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                style={{ display: "block", border: 0 }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}
