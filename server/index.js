import express from "express";
// eslint-disable-next-line no-unused-vars
import React from "react";
import { renderToString } from "react-dom/server";
import path from "path";

import App from "../app/components/App";
import Html from "./Html";

const port = 3000;
const server = express();

const assetPath = path.join(__dirname, "..", "dist/public/");
server.use("/public", express.static(assetPath));

server.get("/", (req, res) => {
    const component = renderToString(<App />);

    res.send(Html(component));
});

server.listen(port);
// eslint-disable-next-line no-console
console.log(`listening on port ${port}...`);
