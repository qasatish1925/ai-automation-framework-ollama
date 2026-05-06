const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './output',
  reporter: [['html', { open: 'never' }]],
});