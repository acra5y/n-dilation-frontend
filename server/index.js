import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import path from "path";
import { ServerStyleSheet } from "styled-components";

import App from "../app/components/App";
import Html from "./Html";

const port = 3000;
const server = express();

const assetPath = path.join(__dirname, "..", "dist/public/");
server.use("/public", express.static(assetPath));

server.get("/", (req, res) => {
    const sheet = new ServerStyleSheet();
    try {
        const component = renderToString(sheet.collectStyles(<App />));
        const styleTags = sheet.getStyleTags();
        res.send(Html(styleTags, component));
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
        res.status(500).send("Internal Server Error");
    } finally {
        sheet.seal();
    }
});

server.listen(port);
// eslint-disable-next-line no-console
console.log(`listening on port ${port}...`);
