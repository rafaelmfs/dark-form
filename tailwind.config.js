/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.tsx", "index.html"],
  theme: {
    extend: {
      colors: {
        gray: {
          900: "#111111",
          800: "#222222",
          500: "#3A3A3A",
          400: "#606060",
          300: "#7B7B7B",
          200: "#B4B4B4",
          100: "#EDEEF0",
        },
        slate: {
          900: "#111113",
          800: "#18191B",
        },
        green: {
          600: "#174933",
          500: "#2F7C57",
          400: "#30A46C",
        },
      },

      backgroundImage: {
        "login-gradient": "linear-gradient(#0D1520 60%, #0B161A 100%)",
      },
    },
    fontFamily: {
      inter: "Inter",
      "instrument-sans": "Instrument Sans",
    },
  },
  plugins: [],
};
