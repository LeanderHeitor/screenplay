class LoginPage {
    //uso de static para não ser necessario a criação de objeto para usar
    //melhor legibilidade: 
    static url = '/';
    static emailField = '[data-testid="email"]';
    static passwordField = '[data-testid="password"]';
    static loginButton = '[data-testid="login-btn"]';
    static errorMessage = '[data-slot="alert-description"]';
    static welcomeBanner = '[data-testid="welcome-banner"]';
}

module.exports = {LoginPage};