import { useCallback, useEffect, useRef, useState } from "react";
import { logger } from "../lib/logger";

export const useAudio = (url?: string) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [loading, setLoading] = useState(false);

  // initialize audio
  useEffect(() => {
    if (!url) return;

    const audio = new Audio(url);
    audioRef.current = audio;

    const onLoaded = () => {
      setDuration(audio.duration || 0);
      setLoading(false);
    };

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const onEnded = () => {
      setIsPlaying(false);
    };

    const onError = (e: any) => {
      logger.error("Audio error", e);
      setIsPlaying(false);
      setLoading(false);
    };

    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("error", onError);

    setLoading(true);

    return () => {
      audio.pause();
      audio.src = "";
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("error", onError);
    };
  }, [url]);

  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.play().catch((err) => {
      logger.error("Play failed", err);
    });

    setIsPlaying(true);
  }, []);

  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    setIsPlaying(false);
  }, []);

  const seek = useCallback((time: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = time;
    setCurrentTime(time);
  }, []);

  return {
    isPlaying,
    duration,
    currentTime,
    loading,
    play,
    pause,
    seek,
  };
};