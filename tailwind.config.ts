import type { Config } from "tailwindcss";
import plugin from 'tailwindcss/plugin'

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [
    plugin(function({ addUtilities }) {
      addUtilities({
        '.dialog-backdrop::backdrop': {
          'background-color': 'rgba(0, 0, 0, 0.6)',
        },
        '.cell-size-sm': {
          'height': 'min(calc(100vw/11), 80px)',
          'width': 'min(calc(100vw/11), 80px)',
        },
        '.cell-size-lg': {
          'height': 'min(calc(100vw/22), 36px)',
          'width': 'min(calc(100vw/22), 36px)',
        },
        '.close-modal-btn::before': {
          'position': 'absolute',
          'content': '""',
          'top': '0px',
          'left': '10px',
          'width': '2px',
          'height': '24px',
          'background-color': '#000000',
          'transform': 'rotate(-45deg)',
        },
        '.close-modal-btn::after': {
          'position': 'absolute',
          'content': '""',
          'top': '0px',
          'left': '10px',
          'width': '2px',
          'height': '24px',
          'background-color': '#000000',
          'transform': 'rotate(45deg)',
        },
      });
    }),
  ],
} satisfies Config;
