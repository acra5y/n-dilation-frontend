import { useEffect } from "react";

import { useWindowContext } from "./WindowContext";

const WasmLoader = ({ onLoad, onError }) => {
    const window = useWindowContext();

    useEffect(() => {
        if (!window.Go) {
            const script = document.createElement("script");
            script.onload = async function() {
                const go = new window.Go();
                const webAssembly = await window.WebAssembly.instantiateStreaming(
                    window
                        .fetch("/public/wasm/main.wasm")
                        .then(response => {
                            if (!response.ok)
                                throw new Error(
                                    `Could not fetch ${response.url}: ${
                                        response.status
                                    }`
                                );
                            return response;
                        })
                        .catch(e => {
                            onError();
                            throw e;
                        }),
                    go.importObject
                );
                go.run(webAssembly.instance); // populates window.UnitaryNDilation
                onLoad();
            };
            script.src = "/public/wasm/wasm_exec.js";
            script.type = "text/javascript";

            document.head.appendChild(script);
        } else {
            onLoad();
        }
    }, []);

    return null;
};

WasmLoader.displayName = "WasmLoader";

export default WasmLoader;
