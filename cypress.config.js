const { defineConfig } = require("cypress");
require('dotenv').config();

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://qa.newsgt.isitics.com',
    defaultCommandTimeout: 15000, // 15s
    // tempo máximo para carregar uma página via cy.visit
    pageLoadTimeout: 60000, // 60s
    // timeouts para requisições XHR/fetch
    requestTimeout: 20000,
    responseTimeout: 30000,
    env: {
      // Carrega automaticamente todas as variáveis do .env
      ...process.env
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
