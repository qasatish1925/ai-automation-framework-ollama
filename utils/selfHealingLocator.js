function getLocatorHelper() {
  return `
const getSearchInput = (page) =>
  page.getByRole('textbox').first() ||
  page.locator('input[type="search"]').first() ||
  page.locator('input').first();
`;
}

module.exports = { getLocatorHelper };