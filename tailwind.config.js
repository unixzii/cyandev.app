function createGlitchBlinkKeyframes(passive) {
  return {
    "0%, 30%, 34%, 40%, 44%, 65%": { opacity: 0 },
    "70%, 95%": { opacity: passive ? 0.05 : 0.1 },
    "33%, 43%, 100%": {
      opacity: 1,
      ...(passive
        ? {}
        : {
            textShadow: "0px 1px 20px rgb(255 255 255 / 69%)",
          }),
    },
  };
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "background": "var(--cyan-background-color)",
        "background-secondary": "var(--cyan-background-secondary-color)",
        "background-tertiary": "var(--cyan-background-tertiary-color)",
        "foreground": "var(--cyan-foreground-color)",
        "foreground-secondary": "var(--cyan-foreground-secondary-color)",
        "foreground-tertiary": "var(--cyan-foreground-tertiary-color)",
        "border": "var(--cyan-border-color)",
        "backdrop-tint": "var(--cyan-backdrop-tint-color)",
        "accent": "var(--cyan-accent-color)",
        "accent-alt": "#78B3CE",
        "reveal-highlight": "var(--cyan-reveal-highlight-color)",
      },
      animation: {
        "smooth-blink": "smoothBlink 1s linear infinite",
        "glitch-blink": "glitchBlink 2s linear both",
        "glitch-blink-passive": "glitchBlinkPassive 2s linear both",
      },
      fontFamily: {
        "serif": "var(--cyan-serif-font)",
        "mono": "var(--cyan-mono-font)",
      },
      keyframes: {
        smoothBlink: {
          "0%, 40%, 100%": { opacity: 1 },
          "55%, 90%": { opacity: 0 },
        },
        glitchBlink: createGlitchBlinkKeyframes(false),
        glitchBlinkPassive: createGlitchBlinkKeyframes(true),
      },
    },
  },
  plugins: [],
};
