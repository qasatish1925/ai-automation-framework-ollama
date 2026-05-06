function cleanJSON(text) {
  return text
    .replace(/```json/g, '')
    .replace(/```/g, '')
    .replace(/\.\.\./g, '') // 🔥 remove ellipsis
    .trim();
}

function extractJSON(text) {
  try {
    return JSON.parse(text);
  } catch {
    try {
      const cleaned = cleanJSON(text);

      const match = cleaned.match(/\[.*\]/s);

      if (!match) throw new Error("No JSON array found");

      return JSON.parse(match[0]);
    } catch (err) {
      console.error("❌ Failed to parse JSON");
      console.error("Raw Response:\n", text);
      throw err;
    }
  }
}

module.exports = { extractJSON };