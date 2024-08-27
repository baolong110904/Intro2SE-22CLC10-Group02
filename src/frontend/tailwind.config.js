/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
      "./src/**/**/*.{js,ts,jsx,tsx}",
			"./public/index.html",
    ],
    darkMode: 'class',
    theme: {
			colors: {
				rose: colors.rose,
				fuchsia: colors.fuchsia,
				indigo: colors.indigo,
				slate: colors.slate,
				white: colors.white,
				black: colors.black,
				blue: colors.blue,
				green: colors.green,
				red: colors.red,
				pink: colors.pink,
			},
      extend: {
        colors: {
            primary: "#010851",
            secondary: "#9A7AF1",
            tartiary: "#707070",
            // pink: "#EE9A5E",
            darkBg: "#0f172a", // Background color for dark mode
            darkCard: "#1e293b", // Card background color for dark mode
            darkText: "#E4E4E7", // Text color for dark mode
						gray: {
							50: "#555555",
							100: "#FFFFFF",
							150: "#3f4046",
							200: "#EFEFEF",
							250: "#3F4346",
							300: "#DADADA",
							350: "#344154",
							400: "#818181",
							450: "#455A64",
							500: "#6F767E",
							600: "#404B53",
							650: "#202427",
							700: "#232830", //"#26282C", //"#2B3034",
							750: "#1A1C22",
							800: "#050A0E",
							850: "#26282C",
							900: "#95959E",
		
						},
						orange: {
							250: "#FF5810",
							350: "#FF5D5D",
						},
						yellow: {
							150: "#FF900C",
						},
						purple: {
							350: "#5568FE",
							550: "#596BFF",
							600: "#586FEA",
							650: "#2B3480",
							700: "#4F63D2",
							750: "#6246FB",
							300: "#4658BB",
						},
						red: { 
							150: "#D32F2F",
							250: "#FF6262",
							650: "#FF5D5D"
						 },
						pink: {
							150: "#EC4899",
							250: "#FFB5B5",
							750: "#2c1a22",
						},
						green: {
							150: "#3BA55D",
							250: "#40A954",
							350: "#34A85333",
							450: "#34A85380",
							550: "#87E5A2",
							650: "#96F3D24D",
							750: "#A3FEE3",
						},
						blue: {
							350: "#76d9e6",
						},
						
						customGray: {
							100: "#252A34",
							150: "#31353B",
							200: "#1E1E1E",
							250: "#B4B4B4",
							300: "#454545",
							350: "#2B303499",
							400: "#282828",
							500: "#848484",
							600: "#C4C4C4",
							700: "#272727",
							800: "#343434",
							850: "#9E9DA6",
							900: "#373C43",
						},
          },
          outline: {
            blue: '2px solid rgba(0, 112, 244, 0.5)',
          },
          fontFamily: {
            inter: ['Inter', 'sans-serif'],
          },
          boxShadow: {
            DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.08), 0 1px 2px 0 rgba(0, 0, 0, 0.02)',
            md: '0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.02)',
            lg: '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.01)',
            xl: '0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.01)',
            '3xl': '0 10px 50px 0px rgba(0, 0, 0, 0.15)',
          },
        keyframes:{
          slidein:{
            from: {
              opacity: "0",
              transform: "translateY(-10px)",
            },
            to: {
              opacity: "1",
              transform: "translateY(0)",
            },
          },
          'text-slide-2': {
              '0%, 40%': {
                  transform: 'translateY(0%)',
              },
              '50%, 90%': {
                  transform: 'translateY(-33.33%)',
              },
              '100%': {
                  transform: 'translateY(-66.66%)',
              },
          },
          'text-slide-3': {
              '0%, 26.66%': {
                  transform: 'translateY(0%)',
              },
              '33.33%, 60%': {
                  transform: 'translateY(-25%)',
              },
              '66.66%, 93.33%': {
                  transform: 'translateY(-50%)',
              },
              '100%': {
                  transform: 'translateY(-75%)',
              },
          },
          'text-slide-4': {
              '0%, 20%': {
                  transform: 'translateY(0%)',
              },
              '25%, 45%': {
                  transform: 'translateY(-20%)',
              },
              '50%, 70%': {
                  transform: 'translateY(-40%)',
              },
              '75%, 95%': {
                  transform: 'translateY(-60%)',
              },                            
              '100%': {
                  transform: 'translateY(-80%)',
              },
          },
          'text-slide-5': {
              '0%, 16%': {
                  transform: 'translateY(0%)',
              },
              '20%, 36%': {
                  transform: 'translateY(-16.66%)',
              },
              '40%, 56%': {
                  transform: 'translateY(-33.33%)',
              },
              '60%, 76%': {
                  transform: 'translateY(-50%)',
              },
              '80%, 96%': {
                  transform: 'translateY(-66.66%)',
              },
              '100%': {
                  transform: 'translateY(-83.33%)',
              },
          },
          'text-slide-6': {
              '0%, 13.33%': {
                  transform: 'translateY(0%)',
              },
              '16.66%, 30%': {
                  transform: 'translateY(-14.28%)',
              },
              '33.33%, 46.66%': {
                  transform: 'translateY(-28.57%)',
              },
              '50%, 63.33%': {
                  transform: 'translateY(-42.85%)',
              },
              '66.66%, 80%': {
                  transform: 'translateY(-57.14%)',
              },
              '83.33%, 96.66%': {
                  transform: 'translateY(-71.42%)',
              },
              '100%': {
                  transform: 'translateY(-85.71%)',
              },
          },
          'text-slide-7': {
              '0%, 11.43%': {
                  transform: 'translateY(0%)',
              },
              '14.28%, 25.71%': {
                  transform: 'translateY(-12.5%)',
              },
              '28.57%, 40%': {
                  transform: 'translateY(-25%)',
              },
              '42.85%, 54.28%': {
                  transform: 'translateY(-37.5%)',
              },
              '57.14%, 68.57%': {
                  transform: 'translateY(-50%)',
              },
              '71.42%, 82.85%': {
                  transform: 'translateY(-62.5%)',
              },
              '85.71%, 97.14%': {
                  transform: 'translateY(-75%)',
              },
              '100%': {
                  transform: 'translateY(-87.5%)',
              },
          },
          'text-slide-8': {
              '0%, 10%': {
                  transform: 'translateY(0%)',
              },
              '12.5%, 22.5%': {
                  transform: 'translateY(-11.11%)',
              },
              '25%, 35%': {
                  transform: 'translateY(-22.22%)',
              },
              '37.5%, 47.5%': {
                  transform: 'translateY(-33.33%)',
              },
              '50%, 60%': {
                  transform: 'translateY(-44.44%)',
              },
              '62.5%, 72.5%': {
                  transform: 'translateY(-55.55%)',
              },
              '75%, 85%': {
                  transform: 'translateY(-66.66%)',
              },
              '87.5%, 97.5%': {
                  transform: 'translateY(-77.77%)',
              },
              '100%': {
                  transform: 'translateY(-88.88%)',
              },
          }
        },
        "presets": [
          [
            "react-app",
            {
              "absoluteRuntime": false
            }
          ]
        ],
        animation: {
          slidein300: "slidein 1s ease 300ms forwards",
          slidein500: "slidein 1s ease 500ms forwards",
          slidein700: "slidein 1s ease 700ms forwards",
          'text-slide-2': 'text-slide-2 5s cubic-bezier(0.83, 0, 0.17, 1) infinite',
          'text-slide-3': 'text-slide-3 7.5s cubic-bezier(0.83, 0, 0.17, 1) infinite',
          'text-slide-4': 'text-slide-4 10s cubic-bezier(0.83, 0, 0.17, 1) infinite',
          'text-slide-5': 'text-slide-5 12.5s cubic-bezier(0.83, 0, 0.17, 1) infinite',
          'text-slide-6': 'text-slide-6 15s cubic-bezier(0.83, 0, 0.17, 1) infinite',
          'text-slide-7': 'text-slide-7 17.5s cubic-bezier(0.83, 0, 0.17, 1) infinite',
          'text-slide-8': 'text-slide-8 20s cubic-bezier(0.83, 0, 0.17, 1) infinite',
        }
      },
    },
    plugins: [
        require("@tailwindcss/forms"),
        "babel-plugin-react-css-modules",
      ],
      plugins: ["babel-plugin-react-css-modules"],
      // Add safelist here to handle dynamic classes
      safelist: [
        {
          pattern: /bg-(indigo|gray|green|blue|red|purple)-500/,
          variants: ['hover', 'focus'],
        },
        {
          pattern: /bg-(indigo|gray|green|blue|red|purple)-200/,
          variants: ['hover', 'focus'],
        },
        {
          pattern: /text-(indigo|gray|green|blue|red|purple)-400/,
          variants: ['hover', 'focus'],
        },
        'bg-blue-600',
        'text-white',
        'rounded-full',
        'w-7',
        'h-7',
        'flex',
        'items-center',
        'justify-center',
      ],    
  }