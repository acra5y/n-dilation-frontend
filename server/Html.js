export default (styleTags, app) => `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>App</title>
            ${styleTags}
            <style>
                @font-face {
                    src: url('https://fonts.googleapis.com/css?family=Droid+Sans');
                    font-family: 'Droid Sans', sans-serif;
                    font-display: fallback;
                }
            </style
        </head>
        <body>
            <section id="root">${app}</section>
            <script type="text/javascript" src="/public/main.js"></script>
        </body>
    </html>
`;
