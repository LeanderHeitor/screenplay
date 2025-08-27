class Click {
    constructor(elementLocator) {
        this.elementLocator = elementLocator;
        //armazena o seletor do elemento a ser clicado
    }

    static on(elementLocator) {
        return new Click(elementLocator);
        /* criar instância de forma fluente
        Retorna: Nova instância de Click
        Uso: Click.on('.login-button') em vez de new Click('.login-button') */
    }

    performAs(actor) {
        const cy = actor.using('BrowseTheWeb').cy;
        cy.get(this.elementLocator).click({ force: true });
        return actor;
        //com BrowseTheWeb, obtem instancia do cypress
        //localiza elemento com cy.get()
        //force no click ignora qualquer verificação de visibilidade
    }
}

module.exports = { Click };