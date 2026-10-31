/** @type {import('tailwindcss').Config} */
module.exports = {
 content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: '#0F5C4D', dark: '#0B4A3E', soft: '#E3F0EB', deep: '#0B3B32' },
        ink: '#14221D',        // نص أساسي
        muted: '#4B5B54',      // نص ثانوي
        subtle: '#5E6E67',     // نص مساعد / أيقونات
        canvas: '#FAFAF7',     // خلفية الصفحة
        sand: '#F3EEE3',       // خلفية قسم مميز
        line: { DEFAULT: '#E3E8E5', strong: '#C9D3CE' },
        success: { DEFAULT: '#15803D', soft: '#EBF6EE' },
        closed: { DEFAULT: '#5E6E67', soft: '#F1F3F2' },
        danger: { DEFAULT: '#BA1A1A', soft: '#FFDAD6' },
        warning: '#B45309', // مؤشر: تغييرات غير محفوظة
        // لوحة الإدارة
        panel: '#F3F5F4',
        side: { DEFAULT: '#0B3B32', hover: '#11453B', active: '#134A3F', line: '#144D42', text: '#D7E6E0', accent: '#7CC4AE' },
      },
      fontFamily: {
        sans: ['Tajawal', 'sans-serif'],
        heading: ['Cairo', 'sans-serif'],
      },
      maxWidth: { page: '1200px' },
    },
     plugins: [],
  },
}

