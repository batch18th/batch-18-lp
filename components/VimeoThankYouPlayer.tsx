"use client";

import { Pause, Play } from "lucide-react";
import { useRef, useState } from "react";

const vimeoOrigin = "https://player.vimeo.com";

function sendVimeoCommand(
  iframe: HTMLIFrameElement | null,
  method: "play" | "pause"
) {
  iframe?.contentWindow?.postMessage(JSON.stringify({ method }), vimeoOrigin);
}

export default function VimeoThankYouPlayer() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayback = () => {
    const nextIsPlaying = !isPlaying;
    sendVimeoCommand(iframeRef.current, nextIsPlaying ? "play" : "pause");
    setIsPlaying(nextIsPlaying);
  };

  return (
    <div className="mx-auto mt-7 max-w-4xl overflow-hidden rounded-2xl border-4 border-white bg-slate-950 shadow-[0_18px_46px_rgba(15,23,42,0.18)] ring-1 ring-brand-100 sm:rounded-3xl">
      <div className="group relative aspect-video w-full">
        <iframe
          ref={iframeRef}
          src="https://player.vimeo.com/video/1197608451?api=1&controls=0&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=som-thank-you-video"
          title="Digital marketing consultation thank you video"
          className="h-full w-full"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />

        <button
          type="button"
          onClick={togglePlayback}
          aria-label={isPlaying ? "Pause video" : "Play video"}
          className={`absolute left-1/2 top-1/2 inline-flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-brand-700 shadow-[0_16px_40px_rgba(15,23,42,0.24)] ring-1 ring-white/80 transition hover:scale-105 hover:bg-white focus:opacity-100 focus:outline-none focus:ring-4 focus:ring-brand-100 sm:h-20 sm:w-20 ${
            isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"
          }`}
        >
          {isPlaying ? (
            <Pause className="h-7 w-7 sm:h-9 sm:w-9" aria-hidden="true" />
          ) : (
            <Play
              className="ml-1 h-7 w-7 sm:h-9 sm:w-9"
              aria-hidden="true"
            />
          )}
        </button>
      </div>
    </div>
  );
}
