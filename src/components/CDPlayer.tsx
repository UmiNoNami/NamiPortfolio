"use client";

import { useEffect, useRef, useState } from "react";
import PixelWindow from "./PixelWindow";
import { playClick } from "@/lib/sound";

const TRACK = { src: "/audio.mp3", artist: "Nami", title: "audio.mp3" };

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "00:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

/**
 * Classic Windows 98 "CD Player" applet, rebuilt as a fun, ACTUALLY
 * FUNCTIONAL stand-in for the note_to_self Notepad window — real
 * play/pause/stop/eject wired to an <audio> element playing /audio.mp3,
 * with a live LCD-style elapsed/total time readout.
 */
export default function CDPlayer({ className = "" }: { className?: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [ejected, setEjected] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => setCurrentTime(audio.currentTime);
    const onMeta = () => setDuration(audio.duration || 0);
    const onEnd = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onMeta);
    audio.addEventListener("ended", onEnd);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.removeEventListener("ended", onEnd);
    };
  }, []);

  const togglePlay = () => {
    playClick();
    const audio = audioRef.current;
    if (!audio || ejected) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const stop = () => {
    playClick();
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    setCurrentTime(0);
    setIsPlaying(false);
  };

  const restart = () => {
    playClick();
    const audio = audioRef.current;
    if (!audio || ejected) return;
    audio.currentTime = 0;
    setCurrentTime(0);
  };

  const toggleEject = () => {
    playClick();
    const audio = audioRef.current;
    if (!ejected) {
      audio?.pause();
      setIsPlaying(false);
      setEjected(true);
    } else {
      setEjected(false);
    }
  };

  return (
    <PixelWindow
      title="CD Player"
      className={className}
      menuItems={["Disc", "View", "Options", "Help"]}
      statusBar={{
        left: `Total Play: ${formatTime(duration)} m:s`,
        right: `Track: ${formatTime(currentTime)} m:s`,
      }}
    >
      <audio ref={audioRef} src={TRACK.src} preload="metadata" />

      <div className="flex items-center gap-3 sm:gap-4">
        {/* LCD readout */}
        <div className="win-inset flex h-14 flex-1 items-center justify-center bg-black px-3 sm:h-16">
          <span className="font-mono text-2xl tracking-widest text-[#3ff23f] sm:text-3xl">
            {ejected ? "-- --:--" : `[01] ${formatTime(currentTime)}`}
          </span>
        </div>

        {/* transport buttons */}
        <div className="grid shrink-0 grid-cols-3 gap-1 sm:gap-1.5">
          <button
            type="button"
            aria-label="Restart track"
            onClick={restart}
            className="win-outset-sm flex h-7 w-7 items-center justify-center bg-winface text-xs leading-none text-black active:win-inset-sm sm:h-8 sm:w-8 sm:text-sm"
          >
            ⏮
          </button>
          <button
            type="button"
            aria-label={isPlaying ? "Pause" : "Play"}
            onClick={togglePlay}
            className="win-outset-sm flex h-7 w-7 items-center justify-center bg-winface text-xs leading-none text-black active:win-inset-sm sm:h-8 sm:w-8 sm:text-sm"
          >
            {isPlaying ? "⏸" : "▶"}
          </button>
          <button
            type="button"
            aria-label="Pause"
            onClick={togglePlay}
            className="win-outset-sm flex h-7 w-7 items-center justify-center bg-winface text-xs leading-none text-black active:win-inset-sm sm:h-8 sm:w-8 sm:text-sm"
          >
            ⏸
          </button>
          <button
            type="button"
            aria-label="Restart track"
            onClick={restart}
            className="win-outset-sm flex h-7 w-7 items-center justify-center bg-winface text-xs leading-none text-black active:win-inset-sm sm:h-8 sm:w-8 sm:text-sm"
          >
            ⏭
          </button>
          <button
            type="button"
            aria-label="Stop"
            onClick={stop}
            className="win-outset-sm flex h-7 w-7 items-center justify-center bg-winface text-xs leading-none text-black active:win-inset-sm sm:h-8 sm:w-8 sm:text-sm"
          >
            ■
          </button>
          <button
            type="button"
            aria-label="Eject"
            onClick={toggleEject}
            className="win-outset-sm flex h-7 w-7 items-center justify-center bg-winface text-xs leading-none text-black active:win-inset-sm sm:h-8 sm:w-8 sm:text-sm"
          >
            ⏏
          </button>
        </div>
      </div>

      {/* Artist / Title / Track fields */}
      <div className="mt-4 flex flex-col gap-2.5 sm:mt-5 sm:gap-3">
        <div className="flex items-center gap-2">
          <span className="w-12 shrink-0 font-mono text-sm text-black sm:w-14 sm:text-base">
            Artist:
          </span>
          <span className="win-inset flex-1 truncate bg-white px-2 py-1 font-mono text-sm text-black sm:text-base">
            {ejected ? "—" : TRACK.artist}
          </span>
          <span className="win-outset-sm shrink-0 bg-winface px-2 py-1 font-mono text-xs text-black sm:text-sm">
            &lt;D&gt;
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-12 shrink-0 font-mono text-sm text-black sm:w-14 sm:text-base">
            Title:
          </span>
          <span className="win-inset flex-1 truncate bg-white px-2 py-1 font-mono text-sm text-black sm:text-base">
            {ejected ? "—" : TRACK.title}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-12 shrink-0 font-mono text-sm text-black sm:w-14 sm:text-base">
            Track:
          </span>
          <span className="win-inset flex-1 truncate bg-white px-2 py-1 font-mono text-sm text-black sm:text-base">
            {ejected ? "No Disc" : "Track 1"}
          </span>
          <span className="win-outset-sm shrink-0 bg-winface px-2 py-1 font-mono text-xs text-black sm:text-sm">
            &lt;01&gt;
          </span>
        </div>
      </div>
    </PixelWindow>
  );
}
