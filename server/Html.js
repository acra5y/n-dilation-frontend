export default (styleTags, app) => `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>App</title>
            ${styleTags}
        </head>
        <body>
            <section id="root">${app}</section>
            <script type="text/javascript" src="/public/main.js"></script>
        </body>
    </html>
`;
