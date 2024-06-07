import type { Config } from "tailwindcss";
import daisyui from "daisyui"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        "mobile": {'min': '360px', 'max': '800px'},
        "sm" : {'min': '800px', 'max': '1300px'}
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        marquee: "marquee var(--duration) linear infinite",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
      },
      keyframes: {
        "shine-pulse": {
          "0%": {
            "background-position": "0% 0%",
          },
          "50%": {
            "background-position": "100% 100%",
          },
          to: {
            "background-position": "0% 0%",
          },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        "marquee-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-100% - var(--gap)))" },
        },
    },
  },
  },
  plugins: [daisyui,
    
    function ({ addUtilities } : any) {
    const newUtilities = {
        ".no-scrollbar::-webkit-scrollbar": {
            display: "none",
        },
        ".no-scrollbar": {
            "-ms-overflow-style": "none",
            "scrollbar-width": "none",
        },
    };
    addUtilities(newUtilities);
}],
  daisyui: {
    themes: [{
      'dark' : {
        'primary' : '#ffffff',
           'primary-focus' : '#ffffff',
           'primary-content' : '#000000',

           'secondary' : '#ffffff',
           'secondary-focus' : '#ffffff',
           'secondary-content' : '#000000',

           'accent' : '#ffffff',
           'accent-focus' : '#ffffff',
           'accent-content' : '#000000',

           'neutral' : '#333333',
           'neutral-focus' : '#4d4d4d',
           'neutral-content' : '#ffffff',

           'base-100' : '#000000',
           'base-200' : '#333333',
           'base-300' : '#4d4d4d',
           'base-content' : '#ffffff',

           'info' : '#0000ff',
           'success' : '#008000',
           'warning' : '#ffff00',
           'error' : '#ff0000',

        '--rounded-box': '1rem',          
        '--rounded-btn': '.5rem',        
        '--rounded-badge': '1.9rem',      

        '--animation-btn': '.25s',       
        '--animation-input': '.2s',       

        '--btn-text-case': 'uppercase',   
        '--navbar-padding': '.5rem',      
        '--border-btn': '1px', 
      }
    }]
  }
};
export default config;
