export default (html) => `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>App</title>
        </head>
        <body>
            <section id="root">
                ${html}
            </section>
        <script src="/dist/client.js"></script>
        </body>
    </html>
`;
