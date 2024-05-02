/** @type {import('tailwindcss').Config} */

const API_URL = import.meta.env.VITE_BASE_URL

const secondClinic = API_URL === 'http://localhost:3001/api';
let  config = {};

if (secondClinic) {
    config = {
        content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
        theme: {
            extend: {
                colors: {
                    'primary-dark': '#0c0c2a',
                    'primary-light': '#5a77e6',
                    'primary-main': '#091c94',

                    'secondary-dark': '#1f0032',
                    'secondary-light': '#220144',
                    'secondary-main': '#3c345f',

                    'common-dark': '#726f7e',
                    'common-light': '#a19fad',
                    'common-main': '#fff',
                    'common-black': '#3b3b3b'
                }
            }
        },
        plugins: [import('@tailwindcss/forms')]
    };
}
else {
    config = {
        content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
        theme: {
            extend: {
                colors: {
                    'primary-dark': '#0d290c',
                    'primary-light': '#77e65a',
                    'primary-main': '#1c9409',

                    'secondary-dark': '#00321f',
                    'secondary-light': '#014422',
                    'secondary-main': '#345f3c',

                    'common-dark': '#726f7e',
                    'common-light': '#a19fad',
                    'common-main': '#fff',
                    'common-black': '#3b3b3b'
                }
            }
        },
        plugins: [import('@tailwindcss/forms')]
    };
}

export default config;
