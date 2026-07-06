// frontend/hooks/useRecorder.ts

import { useEffect, useRef, useState } from "react";

export type RecorderStatus =
  | "idle"
  | "recording"
  | "paused"
  | "stopped"
  | "error";

type UseRecorderOptions = {
  onStop?: (audioBlob: Blob) => void | Promise<void>;
  onError?: (error: any) => void;
};

/**
 * Audio recorder hook (Web MediaRecorder API)
 */
export function useRecorder(options?: UseRecorderOptions) {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const [status, setStatus] = useState<RecorderStatus>("idle");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  /**
   * Start recording
   */
  const start = async () => {
    try {
      setStatus("recording");

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      streamRef.current = stream;

      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = async () => {
        const blob = new Blob(chunksRef.current, {
          type: "audio/webm",
        });

        const url = URL.createObjectURL(blob);
        setAudioUrl(url);

        try {
          await options?.onStop?.(blob);
        } catch (err) {
          options?.onError?.(err);
          setStatus("error");
        }
      };

      recorder.start();
    } catch (err) {
      setStatus("error");
      options?.onError?.(err);
    }
  };

  /**
   * Pause recording
   */
  const pause = () => {
    try {
      mediaRecorderRef.current?.pause();
      setStatus("paused");
    } catch (err) {
      setStatus("error");
      options?.onError?.(err);
    }
  };

  /**
   * Resume recording
   */
  const resume = () => {
    try {
      mediaRecorderRef.current?.resume();
      setStatus("recording");
    } catch (err) {
      setStatus("error");
      options?.onError?.(err);
    }
  };

  /**
   * Stop recording
   */
  const stop = () => {
    try {
      mediaRecorderRef.current?.stop();
      streamRef.current?.getTracks().forEach((t) => t.stop());
      setStatus("stopped");
    } catch (err) {
      setStatus("error");
      options?.onError?.(err);
    }
  };

  /**
   * Reset recorder state
   */
  const reset = () => {
    chunksRef.current = [];
    setAudioUrl(null);
    setStatus("idle");
  };

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  return {
    start,
    pause,
    resume,
    stop,
    reset,
    status,
    audioUrl,
    isRecording: status === "recording",
  };
}