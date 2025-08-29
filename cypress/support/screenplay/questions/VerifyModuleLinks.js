class VerifyModuleLinks {
    constructor(expectedModules) {
        this.expectedModules = expectedModules;
    }

    // Verifica se módulos específicos estão visíveis
    static areVisible(expectedModules) {
        return new VerifyModuleLinks(expectedModules);
    }

    // Módulos esperados para usuário UO baseados nos elementos reais
    static forUOUser() {
        const uoModules = [
            "Dashboards", 
            "Atendimentos", 
            "Produção", 
            "Receita", 
            "Colaboradores", 
            "Clientes", 
            "Produtos", 
            "Configurações", 
            "Indicadores de ISIs"
        ];
        return new VerifyModuleLinks(uoModules);
    }

    // admin modules
    static forAdminUser() {
        const adminModules = []; 
        return new VerifyModuleLinks(adminModules);
    }

    checkAsExpected(actor) {
        const cy = actor.using('BrowseTheWeb').cy;
        
        // Primeiro aguarda pelo menos um módulo aparecer
        cy.get('[data-testid="modern-card-link"]').should('exist');
        
        // Depois verifica se cada módulo esperado está visível
        this.expectedModules.forEach(moduleText => {
            cy.get('[data-testid="modern-card-link"]')
              .contains(moduleText)
              .should('be.visible');
        });

        return actor;
    }
}

module.exports = { VerifyModuleLinks };