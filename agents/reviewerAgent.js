const fs = require("fs-extra");
const { callOllama } = require("../utils/ollamaClient");
const { extractJSON } = require("../utils/jsonExtractor");

async function reviewTestCases() {
  const testCases = fs.readJsonSync("./output/testCases.json");

  const prompt = `
You are a QA Reviewer.

Review the following test cases:

${JSON.stringify(testCases, null, 2)}

For EACH test case return:

- id
- status (Approved / Needs Improvement / Rejected)
- comments (MANDATORY, never empty)
- clarityScore (1-10)
- coverageScore (1-10)

STRICT RULES:
- comments must NEVER be undefined
- Always provide meaningful feedback
- Return JSON array only
- No explanation text

Example:
[
  {
    "id": "TC_001",
    "status": "Approved",
    "comments": "Well structured and clear steps",
    "clarityScore": 9,
    "coverageScore": 8
  }
]

If JSON is invalid, answer is WRONG.
`;

  const res = await callOllama(prompt);
  const data = extractJSON(res);

  const safeReviews = data.map(r => ({
  id: r.id || "UNKNOWN",
  status: r.status || "Needs Improvement",
  comments: r.comments || "No comments provided",
  clarityScore: r.clarityScore || 5,
  coverageScore: r.coverageScore || 5
}));

fs.outputJsonSync("./output/reviewComments.json", safeReviews, { spaces: 2 });

  const report = safeReviews.map(r => `
========================
Test Case: ${r.id}
Status: ${r.status}
Clarity: ${r.clarityScore}
Coverage: ${r.coverageScore}
Comments: ${r.comments}
========================
`).join("\n");

fs.writeFileSync("./output/reviewReport.txt", report);

  return data;
}

module.exports = { reviewTestCases };