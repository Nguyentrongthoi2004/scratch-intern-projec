// src/utils/audioManager.js

class AudioManager {
  constructor() {
    this.bgm = null;
    this.sfxCache = {};
    this.bgmVolume = 0.3;
    this.sfxVolume = 0.9;
    this.enabled = true;
    this.initialized = false;
  }

  // Initialize BGM
  initBgm(path) {
    if (!this.bgm) {
      // Use absolute path to ensure robustness
      const absolutePath = path.startsWith('/') ? path : `/${path}`;
      this.bgm = new Audio(absolutePath);
      this.bgm.loop = true;
      this.bgm.volume = this.bgmVolume;
      this.bgm.preload = 'auto';
    }
  }

  // Preload SFX files to avoid latency
  preloadSfx(files) {
    files.forEach(file => {
      if (!this.sfxCache[file]) {
        // Use absolute path
        const path = `/assets/sounds/${file}`;
        const audio = new Audio(path);
        audio.preload = 'auto';
        this.sfxCache[file] = audio;
      }
    });
  }

  // Handle unlocking audio context on first user interaction
  unlockAudio() {
    if (this.bgm && this.bgm.paused && this.enabled) {
      const playPromise = this.bgm.play();
      if (playPromise !== undefined) {
        playPromise.catch(e => {
          // Auto-play was prevented
          // console.warn("Audio unlock failed (waiting for interaction):", e);
        });
      }
    }
  }

  playBgm() {
    if (!this.bgm) return;
    if (this.enabled) {
      this.bgm.volume = this.bgmVolume;
      const playPromise = this.bgm.play();
      if (playPromise !== undefined) {
        playPromise.catch(e => {
          // console.warn("BGM autoplay prevented:", e);
        });
      }
    }
  }

  pauseBgm() {
    if (this.bgm) {
      this.bgm.pause();
    }
  }

  playSfx(filename) {
    if (!this.enabled) return;

    // Use cached audio if available
    let audio = this.sfxCache[filename];

    if (audio) {
      const clone = audio.cloneNode();
      clone.volume = this.sfxVolume;
      clone.play().catch(e => {});
    } else {
      // Fallback
      const path = `/assets/sounds/${filename}`;
      const temp = new Audio(path);
      temp.volume = this.sfxVolume;
      temp.play().catch(() => {});
    }
  }

  setBgmVolume(val) {
    // val is 0-100
    this.bgmVolume = Math.max(0, Math.min(1, val / 100));
    if (this.bgm) {
      this.bgm.volume = this.bgmVolume;
    }
  }

  setSfxVolume(val) {
    // val is 0-100
    this.sfxVolume = Math.max(0, Math.min(1, val / 100));
  }

  setEnabled(val) {
    this.enabled = val;
    if (!val) {
      this.pauseBgm();
    } else {
      this.playBgm();
    }
  }
}

export const audioManager = new AudioManager();
