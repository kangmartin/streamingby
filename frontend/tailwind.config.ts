import daisyui from 'daisyui'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],

  daisyui: {
    themes: [
      {
        streamingby: {
          "primary": "#e50914",
          "secondary": "#221f1f",
          "accent": "#f5f5f1",
          "neutral": "#2a2a2a",
          "base-100": "#141414",
          "base-200": "#1a1a1a",
          "base-300": "#222222",
          "info": "#0ea5e9",
          "success": "#22c55e",
          "warning": "#f59e0b",
          "error": "#ef4444",
        },
      },
      "light",
      "dark",
    ],
  },
}
