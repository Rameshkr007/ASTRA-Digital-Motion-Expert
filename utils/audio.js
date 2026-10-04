/**
 * Enhanced Procedural Web Audio Engine for ASTRA
 * Includes:
 * - Real-time Web Audio AnalyserNode for live spectrum visualization
 * - Mode switch harmonic chords
 * - Shockwave energy discharge sound effect
 * - Ambient cyber drone with velocity modulation
 */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.analyser = null;
    this.droneGain = null;
    this.droneOsc = null;
    this.filter = null;
    this.isMuted = true;
    this.initialized = false;
    this.dataArray = null;
  }

  init() {
    if (this.initialized || typeof window === "undefined") return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      this.ctx = new AudioContext();

      // Analyser for real-time visualizer
      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 64;
      this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);

      // Master ambient drone (55Hz root cyber hum)
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(55, this.ctx.currentTime);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(140, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.0001, this.ctx.currentTime);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
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
      this.playChime(520, 0.12, 0.2);
    }

    return !this.isMuted;
  }

  getSpectrumData() {
    if (!this.analyser || this.isMuted) return null;
    this.analyser.getByteFrequencyData(this.dataArray);
    return this.dataArray;
  }

  playHover() {
    if (this.isMuted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(880, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1320, this.ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.02, this.ctx.currentTime);
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
      osc.frequency.exponentialRampToValueAtTime(680, this.ctx.currentTime + 0.08);

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

  playShockwave() {
    if (this.isMuted || !this.ctx) return;
    try {
      // Sub-bass sweep
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(180, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(35, this.ctx.currentTime + 0.45);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.5);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.5);

      // High resonance shimmer
      const shimmer = this.ctx.createOscillator();
      const sGain = this.ctx.createGain();
      shimmer.type = "triangle";
      shimmer.frequency.setValueAtTime(1400, this.ctx.currentTime);
      shimmer.frequency.exponentialRampToValueAtTime(400, this.ctx.currentTime + 0.35);

      sGain.gain.setValueAtTime(0.03, this.ctx.currentTime);
      sGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.38);

      shimmer.connect(sGain);
      sGain.connect(this.ctx.destination);
      shimmer.start();
      shimmer.stop(this.ctx.currentTime + 0.38);
    } catch (e) {}
  }

  playModeShift(mode = "emerald") {
    if (this.isMuted || !this.ctx) return;
    const baseFreqs = {
      violet: [440, 660, 880],
      emerald: [523.25, 659.25, 783.99],
      solar: [587.33, 739.99, 880],
      overdrive: [698.46, 880, 1046.5],
    };
    const freqs = baseFreqs[mode] || [440, 660, 880];
    freqs.forEach((f, idx) => {
      setTimeout(() => this.playChime(f, 0.25, 0.035), idx * 45);
    });
  }

  modulateVelocity(velocity) {
    if (this.isMuted || !this.ctx || !this.filter) return;
    try {
      const absV = Math.min(Math.abs(velocity), 2500);
      const targetFreq = 140 + (absV / 2500) * 380;
      this.filter.frequency.setTargetAtTime(targetFreq, this.ctx.currentTime, 0.15);
    } catch (e) {}
  }
}

export const soundEngine = new SoundEngine();
