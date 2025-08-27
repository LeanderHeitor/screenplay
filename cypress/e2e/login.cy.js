const { Actor } = require("../support/screenplay/actors/Actors")
const { BrowseTheWeb } = require("../support/screenplay/abilities/BrowseTheWeb")
const { Navigate } = require("../support/screenplay/tasks/Navigate")
const {Login} = require("../support/screenplay/tasks/Login")
const { LoginPage } = require("../support/screenplay/ui/LoginPage")
const {VerifyLogin} = require("../support/screenplay/questions/VerifyLogin")


describe('Login', () => {
  it('Login com sucesso', () => {
    const igor = new Actor('igor').can(BrowseTheWeb.using(cy))

    igor.attemptsTo(
        Navigate.to(LoginPage.url),
        Login.withCredentials( 
          Cypress.env('VALID_EMAIL'),
          Cypress.env('VALID_PASSWORD')
        )
    )

    igor.shouldSee(
      VerifyLogin.isSuccessful()
    )

  })

  it('Login com falha', () => {
    const igor = new Actor('igor').can(BrowseTheWeb.using(cy))

    igor.attemptsTo(
        Navigate.to(LoginPage.url),
        Login.withCredentials(
          Cypress.env('INVALID_EMAIL'),
          Cypress.env('INVALID_PASSWORD')
        )
    )

    igor.shouldSee(
      VerifyLogin.isUnsuccessful()
    )

  });
})