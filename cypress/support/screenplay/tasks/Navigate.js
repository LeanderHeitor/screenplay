class Navigate {
    constructor (url) {
        this.url = url;
    }

    static to(url) {
        return new Navigate(url);
    }

    performAs(actor) {
        const cy = actor.using('BrowseTheWeb').cy;
        cy.visit(this.url);
    }
}

module.exports = { Navigate }