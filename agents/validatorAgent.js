function validateCode(code) {
  if (code.includes("getByPlaceholder")) {
    throw new Error("Invalid locator detected");
  }
  return true;
}

module.exports = { validateCode };