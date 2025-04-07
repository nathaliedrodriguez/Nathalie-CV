import type { Config } from "tailwindcss"

const config = {
  darkMode: "class",
  content: [
    "./src/**/*.{ts,tsx,js,jsx}",
    "./app/**/*.{ts,tsx,js,jsx}",
    "./components/**/*.{ts,tsx,js,jsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      // Increase all font sizes by 2 points (0.125rem)
      fontSize: {
        xs: ["0.875rem", { lineHeight: "1.25rem" }], // 14px (was 12px)
        sm: ["1rem", { lineHeight: "1.5rem" }], // 16px (was 14px)
        base: ["1.125rem", { lineHeight: "1.75rem" }], // 18px (was 16px)
        lg: ["1.25rem", { lineHeight: "1.75rem" }], // 20px (was 18px)
        xl: ["1.375rem", { lineHeight: "1.75rem" }], // 22px (was 20px)
        "2xl": ["1.625rem", { lineHeight: "2rem" }], // 26px (was 24px)
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }], // 30px (was 28px)
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }], // 36px (was 34px)
        "5xl": ["3rem", { lineHeight: "1" }], // 48px (was 46px)
        "6xl": ["3.75rem", { lineHeight: "1" }], // 60px (was 58px)
        "7xl": ["4.5rem", { lineHeight: "1" }], // 72px (was 70px)
        "8xl": ["6rem", { lineHeight: "1" }], // 96px (was 94px)
        "9xl": ["8rem", { lineHeight: "1" }], // 128px (was 126px)
      },
      // Implement more subtle font weights
      fontWeight: {
        thin: "100",
        extralight: "200",
        light: "300",
        normal: "350", // More subtle than default 400
        medium: "450", // More subtle than default 500
        semibold: "550", // More subtle than default 600
        bold: "650", // More subtle than default 700
        extrabold: "750", // More subtle than default 800
        black: "850", // More subtle than default 900
      },
      fontFamily: {
        title: ["var(--font-el-messiri)"],
        body: ["var(--font-epilogue)"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Colores personalizados del sitio
        site: {
          "bg-primary": "var(--site-bg-primary)",
          "bg-secondary": "var(--site-bg-secondary)",
          "bg-accent": "var(--site-bg-accent)",
          "text-primary": "var(--site-text-primary)",
          "text-secondary": "var(--site-text-secondary)",
          "accent-blue": "var(--site-accent-blue)",
          "accent-blue-hover": "var(--site-accent-blue-hover)",
          "accent-dark-blue": "var(--site-accent-dark-blue)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
} satisfies Config

export default config

