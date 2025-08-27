class Wait {
    constructor(milliseconds){
        this.milliseconds = milliseconds;
         //armazena tempo de espera em ms
    }

    static for (milliseconds){
        return new Wait(milliseconds);
    }

    performAs(actor){
        const cy = actor.using('BrowseTheWeb').cy;
        cy.wait(this.milliseconds);
        return actor;
        //executa uma espera
    }
}
module.exports = {Wait};