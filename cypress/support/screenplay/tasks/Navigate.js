const {Click} = require('../interactions/Click');

class Navigate {
    constructor (url, isModuleNavigation = false) {
        this.url = url;
        this.isModuleNavigation = isModuleNavigation;
    }

    static to(url) {
        return new Navigate(url);
    }

    // Navegação específica para módulos usando os elementos reais
    static toDashboards() {
        return new Navigate("Dashboards", true);
    }

    static toAtendimentos() {
        return new Navigate("Atendimentos", true);
    }

    static toProducao() {
        return new Navigate("Produção", true);
    }

    static toReceita() {
        return new Navigate("Receita", true);
    }

    static toColaboradores() {
        return new Navigate("Colaboradores", true);
    }

    static toClientes() {
        return new Navigate("Clientes", true);
    }

    static toProdutos() {
        return new Navigate("Produtos", true);
    }

    static toConfiguracoes() {
        return new Navigate("Configurações", true);
    }

    static toIndicadoresISIs() {
        return new Navigate("Indicadores de ISIs", true);
    }

    performAs(actor) {
        const cy = actor.using('BrowseTheWeb').cy;
        
        if (this.isModuleNavigation) {
            // Procura em ambos os seletores (modern-card-link OU module-card)
            cy.get('[data-testid="modern-card-link"], [data-testid="module-card"]')
              .contains(this.url)
              .should('be.visible') // garante que está visível
              .click();
        } else {
            // Navegação tradicional por URL
            cy.visit(this.url);
        }
        
        return actor;
    }
}

module.exports = { Navigate }