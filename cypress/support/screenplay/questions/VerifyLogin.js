const {LoginPage} = require('../ui/LoginPage');

class VerifyLogin {
    static isUnsuccessful() {
        return new LoginUnsuccessfulQuestion();
    }
    
    static isSuccessful() {
        return new LoginSuccessfulQuestion();
    }
}

class LoginUnsuccessfulQuestion {
    checkAsExpected(actor) {
        const browse = actor.using('BrowseTheWeb') || actor.ability('BrowseTheWeb');
        const cy = browse?.cy || global.cy;
        
        cy.get(LoginPage.errorMessage)
          .should('be.visible')
          //perguntar sobre mensagem de erro
          //cy.contains('contain', 'Email ou Senha incorretos.') || cy.contains('contain', 'Erro de conexão. Verifique sua internet e tente novamente.');
    }
}

class LoginSuccessfulQuestion {
    checkAsExpected(actor) {
        const browse = actor.using('BrowseTheWeb') || actor.ability('BrowseTheWeb');
        const cy = browse?.cy || global.cy;
        
        cy.get(LoginPage.errorMessage).should('not.exist');
        cy.get(LoginPage.welcomeBanner).should('be.visible');
    }
}

module.exports = {VerifyLogin};