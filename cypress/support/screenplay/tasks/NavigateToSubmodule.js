class NavigateToSubmodule {
    constructor(submoduleName) {
        this.submoduleName = submoduleName;
    }

    // Navegação para submódulos específicos
    static toProducaoEmGrupo() {
        return new NavigateToSubmodule('Produção em Grupo');
    }

    static toProducaoIndividual() {
        return new NavigateToSubmodule('Produção Individual');
    }

    performAs(actor) {
        const cy = actor.using('BrowseTheWeb').cy;
        
        // Aguarda submódulo aparecer e clica
        cy.get('[data-testid="submodule-card"]')
          .contains(this.submoduleName)
          .should('be.visible').click()
        cy.wait(2000)
        return actor;
    }
}

module.exports = { NavigateToSubmodule };