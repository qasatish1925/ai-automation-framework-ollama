const { generateTestCases } = require("./agents/generatorAgent");
const { reviewTestCases } = require("./agents/reviewerAgent");
const { generatePlaywrightCode } = require("./agents/automationAgent");

async function run() {
  const feature = process.argv[2];
  const url = process.argv[3];

  if (!feature || !url) {
    console.log("Usage: node orchestrator.js '<feature>' <url>");
    return;
  }

  await generateTestCases(feature);
  await reviewTestCases();
  await generatePlaywrightCode(url);

  console.log("Done");
}

run();