class VerifyURL {
    constructor(expectedUrlPart) {
        this.expectedUrlPart = expectedUrlPart;
    }

    // Verifica se a URL contém uma parte específica
    static contains(urlPart) {
        return new VerifyURL(urlPart);
    }

    checkAsExpected(actor) {
        const cy = actor.using('BrowseTheWeb').cy;
        cy.url().should('include', this.expectedUrlPart);
        return actor;
    }
}

module.exports = { VerifyURL };