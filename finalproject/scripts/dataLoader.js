// dataLoader.js
export async function loadJSON(path) {
  try {
    const resp = await fetch(path);
    if (!resp.ok) throw new Error(`HTTP ${resp.status}: ${resp.statusText}`);
    const data = await resp.json();
    return data;
  } catch (err) {
    console.error("Error loading JSON:", err);
    // rethrow so callers know to handle or display message
    throw err;
  }
}
