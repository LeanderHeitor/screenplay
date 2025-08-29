class VerifySubmodules {
    constructor(expectedSubmodules) {
        this.expectedSubmodules = expectedSubmodules;
    }

    // Verifica se submódulos específicos estão visíveis
    static areVisible(expectedSubmodules) {
        return new VerifySubmodules(expectedSubmodules);
    }

    // Submódulos esperados para Produção
    static forProducao() {
        return new VerifySubmodules(['Produção em Grupo', 'Produção Individual']);
    }


    checkAsExpected(actor) {
        const cy = actor.using('BrowseTheWeb').cy;
        
        // Primeiro aguarda pelo menos um submódulo aparecer
        cy.get('[data-testid="submodule-card"]').should('exist');
        
        // Depois verifica se cada submódulo esperado está visível
        this.expectedSubmodules.forEach(submoduleText => {
            cy.get('[data-testid="submodule-card"]')
              .contains(submoduleText)
              .should('be.visible');
        });

        return actor;
    }
}

module.exports = { VerifySubmodules };