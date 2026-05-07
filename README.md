# 🧠 AI-Powered QA Automation Framework (Ollama + Playwright)

## 🚀 Overview

This project is an **AI-driven automation framework** that simulates a real QA workflow using multiple agents:

* 👨‍💻 QA Engineer → Generates test cases
* 🧑‍🔍 Reviewer → Reviews test cases
* 🤖 Automation Engineer → Generates Playwright code

The framework uses **Ollama (local LLM)** and **Playwright**.

---

## 🎯 Features

* AI-generated test cases (3+ scenarios)
* AI-based review with comments & scores
* Dynamic Playwright test generation
* DOM-based locator detection (no guessing)
* Self-healing locator strategy
* HTML execution reports
* Fully free (runs locally with Ollama)

---

## 🏗️ Architecture

User Input → Generator → Reviewer → Automation → Playwright Execution → Report

---

## ⚙️ Setup

### 1. Install Dependencies

```bash
npm init -y
npm install -D @playwright/test
npm install fs-extra axios dotenv
```

---

### 2. Install Browsers

```bash
npx playwright install
```

---

### 3. Setup Ollama

```bash
brew install ollama
ollama pull llama3
ollama serve
```

---

## ▶️ How to Run

### Step 1: Generate Test Cases & Code

```bash
node orchestrator.js "Search CBC test" https://www.1mg.com/
```

---

### Step 2: Execute Tests

```bash
npm run test
```

---

### Step 3: View Report

```bash
npm run report
```

---

## 📂 Output

* `output/testCases.json` → Generated test cases
* `output/reviewComments.json` → Review results
* `output/reviewReport.txt` → Review summary
* `output/generatedTest.spec.js` → Playwright tests
* `playwright-report/` → HTML report

---

## 🔍 Locator Strategy

Priority:

1. getByRole('textbox')
2. input[type="search"]
3. generic input

Avoids:

* placeholder-based locators
* brittle selectors

---

## ❗ Problems Faced & Fixes

### 1. Ollama Connection Error

* Fix: run `ollama serve`

### 2. Invalid JSON from AI

* Fix: JSON extractor + retry logic

### 3. Only One Test Case Generated

* Fix: strict prompt + validation

### 4. Reviewer Comments Undefined

* Fix: fallback mapping

### 5. Wrong Locator (Placeholder Issue)

* Fix: DOM-based locator detection

### 6. Only One Playwright Test Generated

* Fix: loop through test cases

### 7. Playwright Module Error

* Fix:

```bash
npm install -D @playwright/test
```

---

## 🚀 Future Improvements

* UI dashboard
* CI/CD integration
* Data-driven testing
* AI-based assertions
* Flaky test detection
* Multi-feature execution
* JIRA/TestRail integration

---
## 🏁 Conclusion

This framework demonstrates:

* AI + QA integration
* Stable automation practices
* Scalable design

---
