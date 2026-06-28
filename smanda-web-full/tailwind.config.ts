import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        soft: "0 2px 20px rgba(79,70,229,0.06)",
      },
    },
  },
  plugins: [],
} satisfies Config;
