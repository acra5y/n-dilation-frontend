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
                    src: url('https://fonts.googleapis.com/css?family=Droid+Sans');
                    font-family: 'Droid Sans', sans-serif;
                    font-display: fallback;
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
