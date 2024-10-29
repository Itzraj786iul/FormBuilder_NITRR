/** @type {import('tailwindcss').Config} */
module.exports = {
<<<<<<< HEAD
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
}

=======
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		backgroundImage: {
  			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  			'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
			tc1: '#03045e',
			tc2: '023e8a',
			tc3: '#0077b6',
			tc4: '0096c7',
			tc5: '#00b4d8',
			tc6: '48cae4',
			tc7: '#90e0ef',
			tc8: 'ade8f4',
			tc9: '#caf0f8'}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
>>>>>>> d431438 (add sign-up and sign-in functionality with server integration)
