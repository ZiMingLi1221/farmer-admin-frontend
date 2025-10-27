/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class", // 使用 class 模式
  theme: {
    extend: {
      // ========== 間距 ==========
      spacing: {
        "sidebar-main": "5rem", // 80px
        "sidebar-secondary": "16rem", // 256px
        "sidebar-combined": "21rem", // 336px
      },

      // ========== 動畫時長 ==========
      transitionDuration: {
        DEFAULT: "300ms",
      },

      // ========== Z-index ==========
      zIndex: {
        "sidebar-main": "50",
        "sidebar-secondary": "40",
        header: "30",
        modal: "100",
      },
    },
  },
  plugins: [],
};
