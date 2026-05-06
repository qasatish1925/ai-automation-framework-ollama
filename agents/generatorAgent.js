const fs = require("fs-extra");
const { callOllama } = require("../utils/ollamaClient");
const { extractJSON } = require("../utils/jsonExtractor");

async function generateTestCases(feature) {
  const prompt = `
You are a Senior QA Engineer.

Generate Between 3 - 5 test cases for the following feature:

"${feature}"

STRICT RULES:
- MUST return ATLEAST 3 test cases
- Each test case must have UNIQUE id
- DO NOT return 1 or 2
- DO NOT summarize
- DO NOT use "..."
- DO NOT explain anything

Each test case MUST include:
- id (TC_001, TC_002, TC_003)
- title
- steps (array)
- expectedResult

Return ONLY valid JSON array.

Example:
[
  {
    "id": "TC_001",
    "title": "Valid search for CBC",
    "steps": ["Open site", "Enter CBC", "Select first result", "Click search"],
    "expectedResult": "CBC results displayed"
  },
  {
    "id": "TC_002",
    "title": "Invalid search",
    "steps": ["Enter random text"],
    "expectedResult": "No results found"
  },
  {
    "id": "TC_003",
    "title": "Empty search",
    "steps": ["Click search without input"],
    "expectedResult": "Validation message shown"
  }
]

If output is not valid JSON, answer is WRONG.
`;

  const res = await callOllama(prompt);
  const data = extractJSON(res);

  fs.outputJsonSync("./output/testCases.json", data, { spaces: 2 });
  return data;

  if (!Array.isArray(data) || data.length < 3) {
  console.log("⚠️ Invalid number of test cases. Retrying...");
  throw new Error("Invalid test case count");
}

let attempts = 3;

while (attempts--) {
  try {
    const res = await callOllama(prompt);
    const data = extractJSON(res);

    if (data.length < 3) throw new Error();

    return data;
  } catch {
    console.log("Retrying test case generation...");
  }
}
}

module.exports = { generateTestCases };