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
        '.move-table-right-sm': {
          'transform': 'translate(calc(min(calc(100vw/11), 50px)/2))',
        },
        '.move-table-right-lg': {
          'transform': 'translate(calc(min(calc(100vw/22), 36px)/2))',
        },
        '.cell-size-sm': {
          'height': 'min(calc(100vw/11), 50px)',
          'width': 'min(calc(100vw/11), 50px)',
        },
        '.cell-size-lg': {
          'height': 'min(calc(100vw/22), 36px)',
          'width': 'min(calc(100vw/22), 36px)',
        },
        '.rock-size-sm': {
          'height': 'calc(min(calc(100vw/11), 50px) * 0.8)',
          'width': 'calc(min(calc(100vw/11), 50px) * 0.8)',
        },
        '.rock-size-lg': {
          'height': 'calc(min(calc(100vw/22), 36px) * 0.8)',
          'width': 'calc(min(calc(100vw/22), 36px) * 0.8)',
        },
        '.rock-position-sm': {
          'top': 'calc(min(calc(100vw/11), 50px) / (-2.3))',
          'left': 'calc(min(calc(100vw/11), 50px) / (-2.3))',
        },
        '.rock-position-lg': {
          'top': 'calc(min(calc(100vw/22), 36px) / (-2.3))',
          'left': 'calc(min(calc(100vw/22), 36px) / (-2.3))',
        },
        '.circle-size-sm': {
          'height': 'calc(min(calc(100vw/11), 50px) * 0.4)',
          'width': 'calc(min(calc(100vw/11), 50px) * 0.4)',
        },
        '.circle-size-lg': {
          'height': 'calc(min(calc(100vw/22), 36px) * 0.4)',
          'width': 'calc(min(calc(100vw/22), 36px) * 0.4)',
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
        '.game-table tbody tr td:nth-last-child(1), .game-table tbody tr:nth-last-child(1) td': {
          'border': '0px',
        },
        '.score-underline::before': {
          'position': 'absolute',
          'content': '""',
          'top': '-30px',
          'left': '50%',
          'width': '2px',
          'height': '64px',
          'background-color': '#000000',
        },
      });
    }),
  ],
} satisfies Config;
