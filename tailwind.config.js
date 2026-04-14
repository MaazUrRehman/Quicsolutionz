import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
                poppins: ['Poppins', 'sans-serif'],
                manrope: ['Manrope', 'sans-serif'],
                cormorant: ['Cormorant Garamond', 'serif'],
                inter: ['Inter', 'sans-serif'],
                montserrat: ['Montserrat', 'sans-serif'],
                dm_sans: ['DM Sans', 'sans-serif'],
                outfit: ['Outfit', 'sans-serif'],
                plus_jakarta_sans: ['"Plus Jakarta Sans"', 'sans-serif'],
            },
        },
    },

    plugins: [forms],
};
