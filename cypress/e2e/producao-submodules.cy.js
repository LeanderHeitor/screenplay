const { Actor } = require("../support/screenplay/actors/Actors");
const { BrowseTheWeb } = require("../support/screenplay/abilities/BrowseTheWeb");
const { Navigate } = require("../support/screenplay/tasks/Navigate");
const { Login } = require("../support/screenplay/tasks/Login");
const { LoginPage } = require("../support/screenplay/ui/LoginPage");
const { VerifyLogin } = require("../support/screenplay/questions/VerifyLogin");
const { VerifySubmodules } = require("../support/screenplay/questions/VerifySubmodules");
const { Wait } = require("../support/screenplay/interactions/Wait");
const { Personas } = require("../support/screenplay/personas/Personas");

describe('Submódulos de Produção', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('Deve mostrar submódulos ao clicar em Produção', () => {
        const uo = new Actor('Usuário UO').can(BrowseTheWeb.using(cy));

        uo.attemptsTo(
            Navigate.to(LoginPage.url),
            Login.withPersona(Personas.uo()),
            Wait.forModulesToLoad(), // aguarda módulos carregarem
            Navigate.toProducao(), // clica no módulo Produção
            Wait.for(2000) // aguarda 2 segundos para submódulos aparecerem
        );

        uo.shouldSee(
            VerifySubmodules.forProducao() // verifica submódulos usando Screenplay
        );
    });
});