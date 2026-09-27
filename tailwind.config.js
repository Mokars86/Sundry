/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          cyan: '#00B4D8',
          teal: '#0ea5e9',
          coral: '#FF5E7E',
          rose: '#F43F5E',
          dark: '#0F172A',
          surface: '#1E293B',
        },
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #0284C7 0%, #38BDF8 35%, #FB7185 75%, #F43F5E 100%)',
        'brand-gradient-h': 'linear-gradient(90deg, #0284C7 0%, #38BDF8 40%, #FB7185 75%, #F43F5E 100%)',
        'coral-gradient': 'linear-gradient(135deg, #FF5E7E 0%, #E11D48 100%)',
        'cyan-gradient': 'linear-gradient(135deg, #00B4D8 0%, #0284C7 100%)',
      },
      boxShadow: {
        'glow-cyan': '0 0 20px -5px rgba(2, 132, 199, 0.5)',
        'glow-coral': '0 0 20px -5px rgba(244, 63, 94, 0.5)',
        'brand-glow': '0 4px 25px -5px rgba(244, 63, 94, 0.3), 0 0 15px -3px rgba(2, 132, 199, 0.25)',
      },
      animation: {
        'pulse-subtle': 'pulseSubtle 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'wave-bar': 'waveBar 1s ease-in-out infinite alternate',
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.03)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        waveBar: {
          '0%': { height: '20%' },
          '100%': { height: '100%' },
        }
      }
    },
  },
  plugins: [],
}
