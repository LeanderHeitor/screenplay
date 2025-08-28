class Wait {
    constructor(milliseconds, elementLocator = null, elementText = null){
        this.milliseconds = milliseconds;
        this.elementLocator = elementLocator;
        this.elementText = elementText;
    }

    // Espera um tempo fixo
    static for (milliseconds){
        return new Wait(milliseconds);
    }

    // Aguarda elemento ficar visível
    static forElement(elementLocator) {
        return new Wait(null, elementLocator);
    }

    // Aguarda elemento com texto específico ficar visível
    static forElementWithText(elementLocator, text) {
        return new Wait(null, elementLocator, text);
    }

    // Aguarda módulos carregarem na página inicial
    static forModulesToLoad() {
        return new Wait(null, '[data-testid="modern-card-link"]');
    }

    // Aguarda submódulos aparecerem após clicar em um módulo
    static forSubmodulesToLoad() {
        return new Wait(null, '[data-testid="submodule-card"]');
    }

    performAs(actor){
        const cy = actor.using('BrowseTheWeb').cy;
        
        if (this.elementLocator && this.elementText) {
            // Aguarda elemento com texto específico aparecer
            cy.get(this.elementLocator).contains(this.elementText).should('be.visible');
        } else if (this.elementLocator) {
            // Aguarda elemento aparecer
            cy.get(this.elementLocator).should('be.visible');
        } else {
            // Espera tempo fixo
            cy.wait(this.milliseconds);
        }
        
        return actor;
    }
}
module.exports = {Wait};