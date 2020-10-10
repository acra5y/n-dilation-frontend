/* eslint-disable no-console */
import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import path from "path";
import { ServerStyleSheet } from "styled-components";
import expressStaticGzip from "express-static-gzip";
import cacheManager from "cache-manager";

import App from "../app/components/App";
import Html from "./Html";

const port = 3000;
const server = express();

const maxAge = 14400;

const assetPath = path.join(__dirname, "..", "dist/public/");
server.use(
    "/public",
    expressStaticGzip(assetPath, {
        enableBrotli: true,
        serveStatic: {
            maxAge: maxAge * 1000,
        },
    })
);

const memoryCache = cacheManager.caching({ store: "memory" });

const renderPage = (cb) => {
    console.log("rendering page");
    const sheet = new ServerStyleSheet();
    try {
        const component = renderToString(sheet.collectStyles(<App />));
        const styleTags = sheet.getStyleTags();

        cb(null, Html(styleTags, component));
    } catch (error) {
        console.error(error);
        cb(error, null);
    } finally {
        sheet.seal();
    }
};

const createResponseHandler = (res) => (err, html) => {
    if (err) {
        return res.status(500).send("Internal Server Error");
    }
    res.set("Cache-Control", `public, max-age=${maxAge}`);
    res.send(html);
};

server.get("/", (req, res) => {
    console.log(req.url, new Date().toISOString());
    const cacheKey = "App" + JSON.stringify(req.query);
    memoryCache.wrap(cacheKey, renderPage, createResponseHandler(res));
});

server.listen(port);
// eslint-disable-next-line no-console
console.log(`listening on port ${port}...`);
