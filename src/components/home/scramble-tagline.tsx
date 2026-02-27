"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const WORDS = ["the wild", "the stillness", "the rush", "memory"];
const TIMINGS = [1500, 1650, 1600, 9000];
const CHARS = "abcdefghijklmnopqrstuvwxyz";

export default function ScrambleTagline() {
  const [display, setDisplay] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const animRef = useRef<number | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isFinalWord = wordIndex === WORDS.length - 1;

  const scramble = useCallback((target: string, onComplete: () => void) => {
    if (animRef.current) cancelAnimationFrame(animRef.current);
    let iter = 0;

    function frame() {
      const revealed = target.slice(0, Math.floor(iter));
      const remaining = target.slice(Math.floor(iter));
      const scrambled = remaining
        .split("")
        .map((c) => (c === " " ? " " : CHARS[Math.floor(Math.random() * CHARS.length)]))
        .join("");

      setDisplay(revealed + scrambled);

      if (iter < target.length) {
        iter += 0.38;
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
    <div className="flex flex-col gap-4">
      <p className="flex flex-wrap items-baseline gap-2 text-left">
        <span className="font-mono text-sm tracking-[0.12em] text-surface/70 uppercase">In search of</span>
        <span
          className={`min-w-[8ch] text-3xl font-semibold tracking-[0.05em] ${
            isFinalWord ? "text-accent-light" : "text-surface"
          }`}
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {display}
        </span>
      </p>

      <div className="flex items-center gap-2">
        {WORDS.map((_, i) => (
          <div
            key={i}
            className={`h-[3px] rounded-full transition-all duration-400 ${
              i === wordIndex
                ? `w-11 ${isFinalWord ? "bg-accent-light" : "bg-surface"}`
                : "w-4 bg-surface/35"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
