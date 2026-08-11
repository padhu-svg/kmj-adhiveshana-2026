export function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

export function playTempleBellSound() {
  if (typeof window === "undefined") return;

  try {
    const audioContext = new (
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext
    )();

    const frequencies = [523.25, 659.25, 783.99, 1046.5];
    const now = audioContext.currentTime;

    frequencies.forEach((freq, i) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(freq, now + i * 0.15);

      gainNode.gain.setValueAtTime(0, now + i * 0.15);
      gainNode.gain.linearRampToValueAtTime(0.3, now + i * 0.15 + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(
        0.001,
        now + i * 0.15 + 1.5
      );

      oscillator.start(now + i * 0.15);
      oscillator.stop(now + i * 0.15 + 1.5);
    });
  } catch {
    // Audio not supported — silently fail
  }
}

export function triggerConfetti() {
  if (typeof window === "undefined") return;

  import("canvas-confetti").then(({ default: confetti }) => {
    const colors = ["#C89B3C", "#7A001E", "#E07A00", "#FFF9F1"];

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors,
    });

    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      });
    }, 300);
  });
}
