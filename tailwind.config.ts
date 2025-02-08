import type { Config } from 'tailwindcss'

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        beige: {
          '100': '#F8F4F0',
          '500': '#98908B',
        },
        slate: {
          '600': '#666CA3',
        },
        grey: {
          '100': '#F2F2F2',
          '300': '#B3B3B3',
          '500': '#696868',
          '900': '#201F24',
        },
        green: '#277C78',
        yellow: '#F2CDAC',
        cyan: '#82C9D7',
        navy: '#626070',
        red: '#C94736',
        purple: {
          '300': '#AF81BA',
          '500': '#826CB0',
        },
        turquoise: '#597C7C',
        brown: '#93674F',
        magenta: '#934F6F',
        blue: '#3F82B2',
        navyGrey: '#97A0AC',
        armyGreen: '#7F9161',
        gold: '#CAB361',
        orange: '#BE6C49',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      spacing: {
        '50': '0.25rem',
        '100': '0.5rem',
        '150': '0.75rem',
        '200': '1rem',
        '250': '1.25rem',
        '300': '1.5rem',
        '400': '2rem',
        '500': '2.5rem',
      },
      fontSize: {
        xl: ['2rem', { lineHeight: '1.2' }],
        lg: ['1.25rem', { lineHeight: '1.2' }],
        md: ['1rem', { lineHeight: '1.5' }],
        sm: ['0.875rem', { lineHeight: '1.5' }],
        xs: ['0.75rem', { lineHeight: '1.5' }],
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config

export default config
