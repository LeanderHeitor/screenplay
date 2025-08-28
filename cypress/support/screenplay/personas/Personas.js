class Personas {
  // Usuário UO - apenas credenciais reais
  static uo() {
    return {
      name: "Unidade Operacional",
      email: Cypress.env("UO_EMAIL"),
      password: Cypress.env("UO_PASSWORD")
    };
  }

  // Usuário Admin - apenas credenciais reais
  static admin() {
    return {
      name: "Administrador",
      email: Cypress.env("ADMIN_EMAIL"),
      password: Cypress.env("ADMIN_PASSWORD")
    };
  }
}

module.exports = { Personas };
