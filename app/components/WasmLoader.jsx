import { useEffect } from "react";

import { useWindowContext } from "./WindowContext";

const WasmLoader = () => {
    const window = useWindowContext();

    useEffect(() => {
        if (!window.Go) {
            const script = document.createElement("script");
            script.onload = async function() {
                const go = new window.Go();
                const webAssembly = await window.WebAssembly.instantiateStreaming(
                    window.fetch("/public/wasm/main.wasm"),
                    go.importObject
                );
                go.run(webAssembly.instance); // populates window.UnitaryNDilation
            };
            script.src = "/public/wasm/wasm_exec.js";
            script.type = "text/javascript";

            document.head.appendChild(script);
        }
    }, []);

    return null;
};

WasmLoader.displayName = "WasmLoader";

export default WasmLoader;
