// frontend/hooks/useVoiceCall.ts

import { useEffect, useRef, useState } from "react";

type VoiceCallStatus =
  | "idle"
  | "recording"
  | "processing"
  | "sending"
  | "error"
  | "done";

type UseVoiceCallOptions = {
  onResult?: (audioBlob: Blob, text?: string) => Promise<void> | void;
  onError?: (error: any) => void;
};

/**
 * Voice recording + upload hook (basic browser implementation)
 */
export function useVoiceCall(options?: UseVoiceCallOptions) {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const [status, setStatus] = useState<VoiceCallStatus>("idle");
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
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      recorder.onstop = async () => {
        const blob = new Blob(chunksRef.current, {
          type: "audio/webm",
        });

        const url = URL.createObjectURL(blob);
        setAudioUrl(url);

        try {
          setStatus("sending");
          await options?.onResult?.(blob);
          setStatus("done");
        } catch (err) {
          setStatus("error");
          options?.onError?.(err);
        }
      };

      recorder.start();
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
      setStatus("processing");
    } catch (err) {
      setStatus("error");
      options?.onError?.(err);
    }
  };

  /**
   * Reset state
   */
  const reset = () => {
    setStatus("idle");
    setAudioUrl(null);
    chunksRef.current = [];
  };

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  return {
    start,
    stop,
    reset,
    status,
    audioUrl,
    isRecording: status === "recording",
  };
}