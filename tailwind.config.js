/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
	theme: {
		extend: {
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			colors: {
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				}
			},
			backgroundImage: {
				'lines-pattern': 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 800 800\'%3E%3Cg stroke-width=\'3.5\' stroke=\'hsla(0, 0%25, 100%25, 1.00)\' fill=\'none\'%3E%3Cline x1=\'0\' y1=\'0\' x2=\'400\' y2=\'400\'%3E%3C/line%3E%3Cline x1=\'400\' y1=\'0\' x2=\'800\' y2=\'400\'%3E%3C/line%3E%3Cline x1=\'800\' y1=\'0\' x2=\'1200\' y2=\'400\'%3E%3C/line%3E%3Cline x1=\'0\' y1=\'400\' x2=\'400\' y2=\'800\'%3E%3C/line%3E%3Cline x1=\'400\' y1=\'400\' x2=\'800\' y2=\'800\'%3E%3C/line%3E%3Cline x1=\'800\' y1=\'400\' x2=\'1200\' y2=\'800\'%3E%3C/line%3E%3Cline x1=\'0\' y1=\'800\' x2=\'400\' y2=\'1200\'%3E%3C/line%3E%3Cline x1=\'400\' y1=\'800\' x2=\'800\' y2=\'1200\'%3E%3C/line%3E%3Cline x1=\'800\' y1=\'800\' x2=\'1200\' y2=\'1200\'%3E%3C/line%3E%3C/g%3E%3C/svg%3E")',
				'lines-pattern-light': 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 800 800\'%3E%3Cg stroke-width=\'3.5\' stroke=\'hsla(215, 16%25, 47%25, 1.00)\' fill=\'none\'%3E%3Cline x1=\'0\' y1=\'0\' x2=\'400\' y2=\'400\'%3E%3C/line%3E%3Cline x1=\'400\' y1=\'0\' x2=\'800\' y2=\'400\'%3E%3C/line%3E%3Cline x1=\'800\' y1=\'0\' x2=\'1200\' y2=\'400\'%3E%3C/line%3E%3Cline x1=\'0\' y1=\'400\' x2=\'400\' y2=\'800\'%3E%3C/line%3E%3Cline x1=\'400\' y1=\'400\' x2=\'800\' y2=\'800\'%3E%3C/line%3E%3Cline x1=\'800\' y1=\'400\' x2=\'1200\' y2=\'800\'%3E%3C/line%3E%3Cline x1=\'0\' y1=\'800\' x2=\'400\' y2=\'1200\'%3E%3C/line%3E%3Cline x1=\'400\' y1=\'800\' x2=\'800\' y2=\'1200\'%3E%3C/line%3E%3Cline x1=\'800\' y1=\'800\' x2=\'1200\' y2=\'1200\'%3E%3C/line%3E%3C/g%3E%3C/svg%3E")',
				'grid-pattern': 'url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 800 800%22%3E%3Cg stroke-width=%223.5%22 stroke=%22hsla(0, 0%25, 100%25, 1.00)%22 fill=%22none%22%3E%3Crect width=%22400%22 height=%22400%22 x=%220%22 y=%220%22 opacity=%220.15%22%3E%3C/rect%3E%3Ccircle r=%2210.85%22 cx=%220%22 cy=%220%22 fill=%22hsla(0, 0%25, 100%25, 1.00)%22 stroke=%22none%22%3E%3C/circle%3E%3Crect width=%22400%22 height=%22400%22 x=%22400%22 y=%220%22 opacity=%220.15%22%3E%3C/rect%3E%3Ccircle r=%2210.85%22 cx=%22400%22 cy=%220%22 fill=%22hsla(0, 0%25, 100%25, 1.00)%22 stroke=%22none%22%3E%3C/circle%3E%3Crect width=%22400%22 height=%22400%22 x=%22800%22 y=%220%22 opacity=%220.15%22%3E%3C/rect%3E%3Ccircle r=%2210.85%22 cx=%22800%22 cy=%220%22 fill=%22hsla(0, 0%25, 100%25, 1.00)%22 stroke=%22none%22%3E%3C/circle%3E%3Crect width=%22400%22 height=%22400%22 x=%220%22 y=%22400%22 opacity=%220.15%22%3E%3C/rect%3E%3Ccircle r=%2210.85%22 cx=%220%22 cy=%22400%22 fill=%22hsla(0, 0%25, 100%25, 1.00)%22 stroke=%22none%22%3E%3C/circle%3E%3Crect width=%22400%22 height=%22400%22 x=%22400%22 y=%22400%22 opacity=%220.15%22%3E%3C/rect%3E%3Ccircle r=%2210.85%22 cx=%22400%22 cy=%22400%22 fill=%22hsla(0, 0%25, 100%25, 1.00)%22 stroke=%22none%22%3E%3C/circle%3E%3Crect width=%22400%22 height=%22400%22 x=%22800%22 y=%22400%22 opacity=%220.15%22%3E%3C/rect%3E%3Ccircle r=%2210.85%22 cx=%22800%22 cy=%22400%22 fill=%22hsla(0, 0%25, 100%25, 1.00)%22 stroke=%22none%22%3E%3C/circle%3E%3Crect width=%22400%22 height=%22400%22 x=%220%22 y=%22800%22 opacity=%220.15%22%3E%3C/rect%3E%3Ccircle r=%2210.85%22 cx=%220%22 cy=%22800%22 fill=%22hsla(0, 0%25, 100%25, 1.00)%22 stroke=%22none%22%3E%3C/circle%3E%3Crect width=%22400%22 height=%22400%22 x=%22400%22 y=%22800%22 opacity=%220.15%22%3E%3C/rect%3E%3Ccircle r=%2210.85%22 cx=%22400%22 cy=%22800%22 fill=%22hsla(0, 0%25, 100%25, 1.00)%22 stroke=%22none%22%3E%3C/circle%3E%3Crect width=%22400%22 height=%22400%22 x=%22800%22 y=%22800%22 opacity=%220.15%22%3E%3C/rect%3E%3Ccircle r=%2210.85%22 cx=%22800%22 cy=%22800%22 fill=%22hsla(0, 0%25, 100%25, 1.00)%22 stroke=%22none%22%3E%3C/circle%3E%3C/g%3E%3C/svg%3E")',
				'grid-pattern-light': 'url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 800 800%22%3E%3Cg stroke-width=%223.5%22 stroke=%22hsla(215, 16%25, 47%25, 1.00)%22 fill=%22none%22%3E%3Crect width=%22400%22 height=%22400%22 x=%220%22 y=%220%22 opacity=%220.15%22%3E%3C/rect%3E%3Ccircle r=%2210.85%22 cx=%220%22 cy=%220%22 fill=%22hsla(215, 16%25, 47%25, 1.00)%22 stroke=%22none%22%3E%3C/circle%3E%3Crect width=%22400%22 height=%22400%22 x=%22400%22 y=%220%22 opacity=%220.15%22%3E%3C/rect%3E%3Ccircle r=%2210.85%22 cx=%22400%22 cy=%220%22 fill=%22hsla(215, 16%25, 47%25, 1.00)%22 stroke=%22none%22%3E%3C/circle%3E%3Crect width=%22400%22 height=%22400%22 x=%22800%22 y=%220%22 opacity=%220.15%22%3E%3C/rect%3E%3Ccircle r=%2210.85%22 cx=%22800%22 cy=%220%22 fill=%22hsla(215, 16%25, 47%25, 1.00)%22 stroke=%22none%22%3E%3C/circle%3E%3Crect width=%22400%22 height=%22400%22 x=%220%22 y=%22400%22 opacity=%220.15%22%3E%3C/rect%3E%3Ccircle r=%2210.85%22 cx=%220%22 cy=%22400%22 fill=%22hsla(215, 16%25, 47%25, 1.00)%22 stroke=%22none%22%3E%3C/circle%3E%3Crect width=%22400%22 height=%22400%22 x=%22400%22 y=%22400%22 opacity=%220.15%22%3E%3C/rect%3E%3Ccircle r=%2210.85%22 cx=%22400%22 cy=%22400%22 fill=%22hsla(215, 16%25, 47%25, 1.00)%22 stroke=%22none%22%3E%3C/circle%3E%3Crect width=%22400%22 height=%22400%22 x=%22800%22 y=%22400%22 opacity=%220.15%22%3E%3C/rect%3E%3Ccircle r=%2210.85%22 cx=%22800%22 cy=%22400%22 fill=%22hsla(215, 16%25, 47%25, 1.00)%22 stroke=%22none%22%3E%3C/circle%3E%3Crect width=%22400%22 height=%22400%22 x=%220%22 y=%22800%22 opacity=%220.15%22%3E%3C/rect%3E%3Ccircle r=%2210.85%22 cx=%220%22 cy=%22800%22 fill=%22hsla(215, 16%25, 47%25, 1.00)%22 stroke=%22none%22%3E%3C/circle%3E%3Crect width=%22400%22 height=%22400%22 x=%22400%22 y=%22800%22 opacity=%220.15%22%3E%3C/rect%3E%3Ccircle r=%2210.85%22 cx=%22400%22 cy=%22800%22 fill=%22hsla(215, 16%25, 47%25, 1.00)%22 stroke=%22none%22%3E%3C/circle%3E%3Crect width=%22400%22 height=%22400%22 x=%22800%22 y=%22800%22 opacity=%220.15%22%3E%3C/rect%3E%3Ccircle r=%2210.85%22 cx=%22800%22 cy=%22800%22 fill=%22hsla(215, 16%25, 47%25, 1.00)%22 stroke=%22none%22%3E%3C/circle%3E%3C/g%3E%3C/svg%3E")'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
}
