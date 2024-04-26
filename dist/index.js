//import * as crypto from "crypto";
import { createHmac } from "node:crypto";
async function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
function formatter(s, factor, precision) {
    if (typeof s === "string") {
        let n = factor * parseFloat(s);
        let p = Math.pow(10, precision);
        n = Math.trunc(n * p) / p;
        n = parseFloat(n.toFixed(precision));
        return n;
    }
    else {
        // When s is a number, directly apply the factor and precision
        let n = s * factor;
        let p = Math.pow(10, precision);
        n = Math.trunc(n * p) / p;
        n = parseFloat(n.toFixed(precision));
        return n;
    }
}
function generateQueryString(params, apiSecret) {
    console.log(params);
    let queryString = Object.entries(params)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join('&');
    const signature = createHmac('sha256', apiSecret)
        .update(queryString)
        .digest('hex');
    return `${queryString}&signature=${signature}`;
}
export { sleep, formatter, generateQueryString };
