export default class MetronomeAudio {
  private audioCtx: AudioContext | null = null;
  private isRunning: boolean = false;
  private intervalId: any = null;
  private bpm: number = 60;
  private subdivision: number = 1;

  constructor() {
    try {
      // @ts-ignore
      const AC = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AC();
    } catch (e) {
      this.audioCtx = null;
    }
  }

  setBPM(bpm: number) {
    this.bpm = Math.max(20, Math.min(300, Math.round(bpm)));
    if (this.isRunning) {
      this.restart();
    }
  }

  setSubdivision(sub: number) {
    this.subdivision = Math.max(1, Math.floor(sub));
    if (this.isRunning) this.restart();
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    if (this.audioCtx) {
      this.scheduleTicksWebAudio();
    } else {
      this.scheduleTicksFallback();
    }
  }

  stop() {
    this.isRunning = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  private restart() {
    this.stop();
    this.start();
  }

  private scheduleTicksFallback() {
    const ms = (60_000 / this.bpm) / this.subdivision;
    this.intervalId = setInterval(() => {
      // Simple click using Audio element if available
      try {
        const osc = document.createElement('audio');
        // tiny beep generated via data URI of a 1-sine wave is complex; we'll use the built-in beep via oscillator if supported
        // fallback: short silent audio to trigger timing (no sound)
        osc.src = '';
        // append/remove to allow play
        // no-op for fallback; keep interval for timing only
      } catch (e) {
        // ignore
      }
    }, ms);
  }

  private scheduleTicksWebAudio() {
    if (!this.audioCtx) return;
    const intervalMs = (60_000 / this.bpm) / this.subdivision;

    this.intervalId = setInterval(() => {
      if (!this.audioCtx) return;
      const now = this.audioCtx.currentTime;
      const o = this.audioCtx.createOscillator();
      const g = this.audioCtx.createGain();
      o.type = 'square';
      o.frequency.value = 1000; // click pitch
      g.gain.value = 0.001;
      o.connect(g);
      g.connect(this.audioCtx.destination);
      o.start(now);
      g.gain.setValueAtTime(0.001, now);
      g.gain.exponentialRampToValueAtTime(0.00001, now + 0.05);
      o.stop(now + 0.06);
    }, intervalMs);
  }
}
