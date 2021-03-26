function checkResult(res) {
    if (!res.ok) {
      res("fetch failed!");
    }
}
// TODO: Implement checkresult (with erro message?)
export async function fetchJson(url) {
    const result = await fetch(url);
    checkResult(result);
    
    return await result.json();
}

export async function postJson(url, json) {
    const result = await fetch(url, {
        method: "POST",
        body: JSON.stringify(json),
        headers: {
            "Content-Type" : "application/json"
        }
    });
    
    checkResult(result);
    return result.ok;
}