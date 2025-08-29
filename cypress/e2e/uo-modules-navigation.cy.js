const { Actor } = require("../support/screenplay/actors/Actors");
const { BrowseTheWeb } = require("../support/screenplay/abilities/BrowseTheWeb");
const { Navigate } = require("../support/screenplay/tasks/Navigate");
const { NavigateToSubmodule } = require("../support/screenplay/tasks/NavigateToSubmodule");
const { Login } = require("../support/screenplay/tasks/Login");
const { LoginPage } = require("../support/screenplay/ui/LoginPage");
const { VerifyLogin } = require("../support/screenplay/questions/VerifyLogin");
const { VerifyModuleLinks } = require("../support/screenplay/questions/VerifyModuleLinks");
const { VerifySubmodules } = require("../support/screenplay/questions/VerifySubmodules");
const { VerifyURL } = require("../support/screenplay/questions/VerifyURL");
const { Wait } = require("../support/screenplay/interactions/Wait");
const { Personas } = require("../support/screenplay/personas/Personas");
const {VerifyPageTitle} = require("../support/screenplay/questions/VerifyPageTitle");

describe('Navegação de Módulos - Usuário UO', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('UO deve ver todos os módulos disponíveis', () => {
        const uo = new Actor('Usuário UO').can(BrowseTheWeb.using(cy));

        uo.attemptsTo(
            Navigate.to(LoginPage.url),
            Login.withPersona(Personas.uo()),
            Wait.forModulesToLoad() // aguarda módulos carregarem
        );

        uo.shouldSee(
            VerifyLogin.isSuccessful(),
            VerifyModuleLinks.forUOUser()
        );
    });

    it('UO deve conseguir navegar para Dashboards', () => {
        const uo = new Actor('Usuário UO').can(BrowseTheWeb.using(cy));

        uo.attemptsTo(
            Navigate.to(LoginPage.url),
            Login.withPersona(Personas.uo()),
            Wait.forModulesToLoad(), // aguarda módulos aparecerem
            Navigate.toDashboards()
        );

        uo.shouldSee(
            VerifyURL.contains('dashboard') // ajuste conforme padrão da sua URL
        );
    });

    it.only('UO deve conseguir navegar para Atendimentos', () => {
        const uo = new Actor('Usuário UO').can(BrowseTheWeb.using(cy));

        uo.attemptsTo(
            Navigate.to(LoginPage.url),
            Login.withPersona(Personas.uo()),
            Wait.forModulesToLoad(), // aguarda módulos aparecerem
            Navigate.toAtendimentos()
        );

        uo.shouldSee(
            VerifyPageTitle.atendimentos(),
            VerifyURL.contains('atendimento') // ajuste conforme padrão da sua URL
        );
    });

    it('UO deve ver submódulos ao clicar em Produção', () => {
        const uo = new Actor('Usuário UO').can(BrowseTheWeb.using(cy));

        uo.attemptsTo(
            Navigate.to(LoginPage.url),
            Login.withPersona(Personas.uo()),
            Wait.forModulesToLoad(), // aguarda módulos aparecerem
            Navigate.toProducao(), // clica em Produção
            Wait.forSubmodulesToLoad() // aguarda submódulos aparecerem
        );

        uo.shouldSee(
            VerifySubmodules.forProducao() // verifica os 2 submódulos
        );
    });

    it('UO deve conseguir navegar para Produção em Grupo', () => {
        const uo = new Actor('Usuário UO').can(BrowseTheWeb.using(cy));

        uo.attemptsTo(
            Navigate.to(LoginPage.url),
            Login.withPersona(Personas.uo()),
            Wait.forModulesToLoad(),
            Navigate.toProducao(), // primeiro clica no módulo pai
            Wait.forSubmodulesToLoad(),
            NavigateToSubmodule.toProducaoEmGrupo() // depois no submódulo
        );

        uo.shouldSee(
            VerifyURL.contains('producao') // ajuste conforme sua URL
        );
    });
});