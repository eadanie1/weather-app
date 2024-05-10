/** @type {import('tailwindcss').Config} */
import { defineConfig } from 'tailwindcss';

export default defineConfig({
  mode: 'jit',
  purge: [],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true,
    webpack5: true,
  },
  experimental: {
    applyComplexClasses: true,
  },
});