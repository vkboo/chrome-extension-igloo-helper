import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { awaitElement, log, addLocationChangeCallback } from "./utils";

log("React script has successfully started");

// Do required initial work. Gets called every time the URL changes,
// so that elements can be re-inserted as a user navigates a page with
// different routes.
async function main() {
    // Find <body/>. This can be any element. We wait until
    // the page has loaded enough for that element to exist.
    await awaitElement("body > div");
    // for SPA host page, body > div may be overwrite by SPA render engine, so use document.body to appendChild
    const body = document.body;
    const container = document.createElement("div");
    body.appendChild(container);
    const root = createRoot(container);
    root.render(<App />);
}

// Call `main()` every time the page URL changes, including on first load.
addLocationChangeCallback(() => {
    // Greasemonkey doesn't bubble errors up to the main console,
    // so we have to catch them manually and log them
    main().catch((e) => {
        log(e);
    });
});
