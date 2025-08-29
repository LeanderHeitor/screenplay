const {PageTitles} = require("../ui/PageTitles");
class VerifyPageTitle {
    constructor(expectedTitle) {
        this.expectedTitle = expectedTitle;
    }

    static is (expectedTitle) {
        return new VerifyPageTitle(expectedTitle);
    }

    static producaoEmGrupo() {
        return new VerifyPageTitle(PageTitles.producaoEmGrupo);
    }

    static producaoIndividual() {
        return new VerifyPageTitle(PageTitles.producaoIndividual);
    }
    static atendimentos() {
        return new VerifyPageTitle(PageTitles.atendimentos);
    }

    checkAsExpected(actor){
        const cy = actor.using('BrowseTheWeb').cy

        cy.get('h1')
        .should('be.visible')
        .and('contain.text', this.expectedTitle)

        return actor;
    }
}
module.exports = {VerifyPageTitle};