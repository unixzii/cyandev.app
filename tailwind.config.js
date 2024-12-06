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
        "glitch-blink": "glitchBlink 2s linear both",
      },
      fontFamily: {
        "serif": "var(--cyan-serif-font)",
        "mono": "var(--cyan-mono-font)",
      },
      keyframes: {
        glitchBlink: {
          "0%, 30%, 34%, 40%, 44%, 65%": { opacity: 0 },
          "70%, 98%": {
            opacity: 0.3,
            textShadow: "0px 0px 30px rgb(255 255 255 / 90%)",
          },
          "33%, 43%, 100%": {
            opacity: 1,
            textShadow: "0px 0px 50px rgb(255 255 255 / 80%)",
          },
        },
      },
    },
  },
  plugins: [],
};
