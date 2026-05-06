async function detectSearchLocator(page) {
  if (await page.getByRole('textbox').count() > 0) {
    return "page.getByRole('textbox').first()";
  }

  if (await page.locator('input[type=\"search\"]').count() > 0) {
    return "page.locator('input[type=\"search\"]').first()";
  }

  return "page.locator('input').first()";
}

module.exports = { detectSearchLocator };