// frontend/hooks/useSpeech.ts

import { useCallback, useEffect, useRef, useState } from "react";

export type SpeechStatus =
  | "idle"
  | "speaking"
  | "paused"
  | "stopped"
  | "error";

type UseSpeechOptions = {
  lang?: string;
  rate?: number;
  pitch?: number;
  volume?: number;
  onEnd?: () => void;
  onError?: (error: any) => void;
};

/**
 * Web Speech API (Text-to-Speech) hook
 */
export function useSpeech(options?: UseSpeechOptions) {
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const [status, setStatus] = useState<SpeechStatus>("idle");
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setIsSupported(false);
    }
  }, []);

  const speak = useCallback(
    (text: string) => {
      try {
        if (!("speechSynthesis" in window)) return;

        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);

        utterance.lang = options?.lang || "en-US";
        utterance.rate = options?.rate || 1;
        utterance.pitch = options?.pitch || 1;
        utterance.volume = options?.volume || 1;

        utterance.onstart = () => setStatus("speaking");

        utterance.onend = () => {
          setStatus("stopped");
          options?.onEnd?.();
        };

        utterance.onerror = (err) => {
          setStatus("error");
          options?.onError?.(err);
        };

        utteranceRef.current = utterance;

        window.speechSynthesis.speak(utterance);
      } catch (err) {
        setStatus("error");
        options?.onError?.(err);
      }
    },
    [options]
  );

  const pause = () => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.pause();
    setStatus("paused");
  };

  const resume = () => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.resume();
    setStatus("speaking");
  };

  const stop = () => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    setStatus("stopped");
  };

  return {
    speak,
    pause,
    resume,
    stop,
    status,
    isSupported,
  };
}