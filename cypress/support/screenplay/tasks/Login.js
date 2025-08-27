const {Type} = require ('../interactions/Type');
const {Click} = require ('../interactions/Click');
const {LoginPage} = require ('../ui/LoginPage');

class Login {
    constructor (email, password){
        this.email = email;
        this.password = password;
    }

    static withCredentials(email, password){
        return new Login(email, password);
    }

    performAs(actor){
        return actor.attemptsTo(
            Type.theText(this.email).into(LoginPage.emailField),
            Type.theText(this.password).into(LoginPage.passwordField),
            Click.on(LoginPage.loginButton)
        )
    }
}

module.exports = { Login }