export async function fetchJson(url) {
    const result = await fetch(url);
    return await result.json();
}