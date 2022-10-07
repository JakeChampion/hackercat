"use strict";

import process from "process";

const nativeFetch = globalThis.fetch;
const base = process.env.HOST || "http://127.0.0.1:7676"

export default function fetch(path) {
    return nativeFetch(base + path, {redirect: 'manual'})
};