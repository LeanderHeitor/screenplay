class Press { 
    constructor(key){
        this.key = key;
        //armazena a tecla a ser pressionada
    }
    static key (key){
        return new Press(key);
        //instancia de press
        //press.key('Enter')
    }

    performAs(actor){
        const cy = actor.using('BrowseTheWeb').cy;
        cy.get('body').type(`{${this.key}}`);
        return actor;
        //obtem cypress via ator
        //localiza o campo com cy.get
        //digita a tecla com type(`{${this.key}}`)
    }
}
module.exports = {Press};