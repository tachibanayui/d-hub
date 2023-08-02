export function generateLink(base: string, params: { [key: string]: string }) {
    const urlParams = new URLSearchParams();
    for (const e in params) {
        if (typeof params[e] === "string") {
            urlParams.append(e, params[e]);
        }
    }

    return `${base}?${urlParams}`;
}
