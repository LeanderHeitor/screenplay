class Type{
    constructor(text, elementLocator){
        this.text = text;
        this.elementLocator = elementLocator;
        //guarda o texto a ser digitado
    }

    static theText(text){
        //retorna nova instancia de Type
        return {
            into: (elementLocator) => new Type(text, elementLocator)
            //define onde digitar o texto
            //Permite sintaxe Type.text('valor').into('campo')
        }
    }

    performAs(actor){
        const cy = actor.using('BrowseTheWeb').cy;
        cy.get(this.elementLocator).type(this.text);
        return actor;
        //obtem o cypress via ator
        //localiza o campo com cy.get
        //digita o texto com type(this.text)
    }
}

module.exports = {Type} 