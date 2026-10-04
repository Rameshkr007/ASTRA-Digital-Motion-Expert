/**
 * Procedural Web Audio Engine for ASTRA
 * 100% code-generated sound synthesis (zero external audio files or dependencies).
 * Fully adheres to browser autoplay policies (starts muted, requires user gesture).
 */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.droneGain = null;
    this.droneOsc = null;
    this.isMuted = true;
    this.initialized = false;
  }

  init() {
    if (this.initialized || typeof window === "undefined") return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      this.ctx = new AudioContext();

      // Master ambient drone setup (low 55Hz cyber harmonic)
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(55, this.ctx.currentTime); // A1 note

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(140, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.0001, this.ctx.currentTime);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();

      this.droneOsc = osc;
      this.droneGain = gain;
      this.filter = filter;
      this.initialized = true;
    } catch (e) {
      console.warn("Web Audio not supported", e);
    }
  }

  toggle() {
    this.init();
    if (!this.ctx) return false;

    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }

    this.isMuted = !this.isMuted;

    if (this.droneGain) {
      const targetGain = this.isMuted ? 0.0001 : 0.06;
      this.droneGain.gain.setTargetAtTime(targetGain, this.ctx.currentTime, 0.4);
    }

    if (!this.isMuted) {
      this.playChime(520, 0.08, 0.15);
    }

    return !this.isMuted;
  }

  playHover() {
    if (this.isMuted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(880, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.025, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch (e) {}
  }

  playClick() {
    if (this.isMuted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(320, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(640, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.09);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.09);
    } catch (e) {}
  }

  playChime(freq = 600, dur = 0.2, vol = 0.05) {
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(vol, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + dur);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + dur);
    } catch (e) {}
  }

  modulateVelocity(velocity) {
    if (this.isMuted || !this.ctx || !this.filter) return;
    try {
      const absV = Math.min(Math.abs(velocity), 2500);
      const targetFreq = 140 + (absV / 2500) * 360;
      this.filter.frequency.setTargetAtTime(targetFreq, this.ctx.currentTime, 0.15);
    } catch (e) {}
  }
}

export const soundEngine = new SoundEngine();
