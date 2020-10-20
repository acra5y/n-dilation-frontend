export default (styleTags, app) => `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <meta name="description" lang="en" content="Numerically calculate Unitary N-Dilations for your real square matrix contractions.">
            <meta name="keywords" lang="en" content="Linear Algebra, Real Matrices, Square Matrices, Matrix Contractions, Unitary N-Dilations">
            <title>N-Dilation-Computer</title>
            <link rel="icon" href="/public/favicon.svg" type="image/svg+xml">
            ${styleTags}
            <style>
                @font-face {
                    font-display: fallback;
                    font-family: 'Work Sans';
                    font-style: normal;
                    font-weight: 400;
                    src: local(''),
                        url('/public/fonts/work-sans-v8-latin-ext_latin-regular.woff2') format('woff2'),
                        url('/public/fonts/work-sans-v8-latin-ext_latin-regular.woff') format('woff'),
                        url('/public/fonts/work-sans-v8-latin-ext_latin-regular.ttf') format('truetype'),
                        url('/public/fonts/work-sans-v8-latin-ext_latin-regular.svg#WorkSans') format('svg');
                }
                #root {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
            </style>
        </head>
        <body>
            <section id="root">${app}</section>
            <script type="text/javascript" src="/public/main.js"></script>
        </body>
    </html>
`;
