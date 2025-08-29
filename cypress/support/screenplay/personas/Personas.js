class Personas {
    static uo() {
        return {
            name: 'Unidade Operacional',
            email: Cypress.env('VALID_EMAIL'),
            password: Cypress.env('VALID_PASSWORD'),
        };
    }

    static admin() {
        return {
            name: 'Administrador',
            email: Cypress.env('ADMIN_EMAIL'),
            password: Cypress.env('ADMIN_PASSWORD'),
        };
    }

}

module.exports = { Personas };