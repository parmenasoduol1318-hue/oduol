export default class SamplePlayer {
  private audioCtx: AudioContext | null = null;

  constructor() {
    try {
      // @ts-ignore
      const AC = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AC();
    } catch (e) {
      this.audioCtx = null;
    }
  }

  // Play a short click or tone at given frequency for duration (seconds)
  playTone(frequency = 440, duration = 0.12, nowOffset = 0) {
    if (!this.audioCtx) return;

    const now = this.audioCtx.currentTime + nowOffset;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.value = frequency;
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.5, now + 0.001);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    osc.connect(gain);
    gain.connect(this.audioCtx.destination);
    osc.start(now);
    osc.stop(now + duration + 0.02);
  }

  // Play a sequence of beats where beats is array of durations in beats and bpm sets base tempo
  async playSequence(beats: number[], bpm = 80) {
    if (!this.audioCtx) return;
    const beatMs = 60000 / bpm;
    let offset = 0;
    for (let i = 0; i < beats.length; i++) {
      const dur = beats[i] * (beatMs / 1000); // seconds
      // higher pitch for downbeat
      const freq = i === 0 ? 880 : 660;
      this.playTone(freq, Math.max(0.06, Math.min(0.25, dur)), offset);
      offset += dur;
    }
  }

  // Play an audio file URL (if supported)
  playUrl(url: string) {
    try {
      if (typeof window !== 'undefined') {
        const audio = new Audio(url);
        audio.play().catch(() => {});
      }
    } catch (e) {
      // ignore
    }
  }
}
