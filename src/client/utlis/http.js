export async function fetchJson(url) {
    const result = await fetch(url);
    if(!result.ok) {
        alert("fetch failed!");
    }
    
    return await result.json();
}