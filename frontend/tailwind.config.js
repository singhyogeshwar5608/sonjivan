/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0f172a',      // Deep slate - Royal & Luxury
        secondary: '#1e293b',    // Rich slate - Premium depth
        accent: '#d4af37',       // Royal Gold - Luxury accent
        accentDark: '#b8941f',   // Darker gold for hover
        textDark: '#1f2937',     // Deep charcoal
        textLight: '#f1f5f9',    // Soft white for dark backgrounds
        bgLight: '#f8fafc',      // Pure white tint
        bgDark: '#020617',       // Deep luxury black
        cardBg: '#1e293b',       // Premium card background
        borderDark: '#334155',   // Elegant border
        borderGold: '#d4af37',   // Gold border accent
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      boxShadow: {
        'luxury': '0 10px 40px rgba(212, 175, 55, 0.15)',
        'luxury-lg': '0 20px 60px rgba(212, 175, 55, 0.2)',
      },
    },
  },
  plugins: [],
}
