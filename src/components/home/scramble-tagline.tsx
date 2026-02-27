"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const WORDS = ["the wild", "the light", "the moment", "memories"];
const TIMINGS = [1667, 1667, 1666, 10000];
const CHARS = "abcdefghijklmnopqrstuvwxyz";

export default function ScrambleTagline() {
  const [display, setDisplay] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const animRef = useRef<number | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isMemories = wordIndex === WORDS.length - 1;

  const scramble = useCallback((target: string, onComplete: () => void) => {
    if (animRef.current) cancelAnimationFrame(animRef.current);
    let iter = 0;

    function frame() {
      const revealed = target.slice(0, Math.floor(iter));
      const remaining = target.slice(Math.floor(iter));
      const scrambled = remaining
        .split("")
        .map((c) =>
          c === " " ? " " : CHARS[Math.floor(Math.random() * CHARS.length)]
        )
        .join("");

      setDisplay(revealed + scrambled);

      if (iter < target.length) {
        iter += 0.4;
        animRef.current = requestAnimationFrame(frame);
      } else {
        setDisplay(target);
        onComplete();
      }
    }

    animRef.current = requestAnimationFrame(frame);
  }, []);

  useEffect(() => {
    scramble(WORDS[wordIndex], () => {
      timeoutRef.current = setTimeout(() => {
        setWordIndex((prev) => (prev + 1) % WORDS.length);
      }, TIMINGS[wordIndex]);
    });

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [wordIndex, scramble]);

  return (
    <div className="flex flex-col items-center gap-6">
      <p className="flex flex-wrap items-baseline justify-center gap-[0.3em] text-center">
        <span
          className="text-[clamp(1.8rem,4.5vw,3.5rem)] font-normal tracking-[0.06em] text-foreground/70"
          style={{ fontFamily: "'Courier New', monospace" }}
        >
          In search of&hellip;
        </span>
        <span
          className={`min-w-[6ch] text-[clamp(1.8rem,4.5vw,3.5rem)] font-bold tracking-[0.06em] transition-colors duration-300 ${
            isMemories ? "text-accent" : "text-foreground"
          }`}
          style={{ fontFamily: "'Courier New', monospace" }}
        >
          {display}
        </span>
      </p>

      {/* Word indicators */}
      <div className="flex items-center gap-2">
        {WORDS.map((_, i) => (
          <div
            key={i}
            className={`h-0.5 rounded-full transition-all duration-400 ${
              i === wordIndex
                ? `w-8 ${isMemories ? "bg-accent" : "bg-foreground"}`
                : "w-3 bg-foreground/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
