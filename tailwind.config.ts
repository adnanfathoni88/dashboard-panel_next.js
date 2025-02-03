import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },

      // add color 11121E 1D1D29
      colors: {
        dark: {
          50: "#1D1D29",
          100: "#11121E",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
