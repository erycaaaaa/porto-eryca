"use client";

import React, { createContext, useContext, useMemo, useState } from "react";

type Ctx = {
  isPlaying: boolean;
  setPlaying: (v: boolean) => void;
  toggle: () => void;
};

const NowPlayingCtx = createContext<Ctx | null>(null);

export default function NowPlayingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isPlaying, setPlaying] = useState(false);

  const value = useMemo(
    () => ({
      isPlaying,
      setPlaying,
      toggle: () => setPlaying((p) => !p),
    }),
    [isPlaying]
  );

  return (
    <NowPlayingCtx.Provider value={value}>{children}</NowPlayingCtx.Provider>
  );
}

export function useNowPlaying() {
  const ctx = useContext(NowPlayingCtx);
  if (!ctx)
    throw new Error("useNowPlaying must be used within NowPlayingProvider");
  return ctx;
}
