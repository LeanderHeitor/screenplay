# CLAUDE.md

Este arquivo fornece orientações ao Claude Code (claude.ai/code) ao trabalhar com código neste repositório.

## Visão Geral do Projeto

Este é um projeto de automação de testes Cypress que implementa o **Padrão Screenplay** para testes end-to-end. O projeto segue princípios de design orientado a objetos para criar automação de testes mantível e legível.

## Comandos Comuns

### Testes
```bash
# Executar todos os testes
npx cypress run

# Abrir o Cypress Test Runner
npx cypress open

# Executar testes em modo headless
npx cypress run --headless

# Executar arquivo de teste específico
npx cypress run --spec "cypress/e2e/login.cy.js"
npx cypress run --spec "cypress/e2e/uo-modules-navigation.cy.js"
npx cypress run --spec "cypress/e2e/producao-submodules.cy.js"
```

### Testes Disponíveis
- **login.cy.js** - Testes básicos de login (sucesso e falha)
- **uo-modules-navigation.cy.js** - Testes de navegação de módulos para usuário UO
- **producao-submodules.cy.js** - Testes específicos para navegação hierárquica em submódulos

## Arquitetura

O projeto implementa o **Padrão Screenplay** com os seguintes componentes principais:

### Componentes Principais do Padrão
- **Actors** (`cypress/support/screenplay/actors/`): Representam usuários de teste que executam ações
- **Abilities** (`cypress/support/screenplay/abilities/`): O que os atores podem fazer (ex: BrowseTheWeb)
- **Tasks** (`cypress/support/screenplay/tasks/`): Ações de negócio de alto nível (ex: Login, Navigate)
- **Interactions** (`cypress/support/screenplay/interactions/`): Ações de UI de baixo nível (Click, Type, Press, Wait)
- **Questions** (`cypress/support/screenplay/questions/`): Lógica de verificação e asserção
- **UI Elements** (`cypress/support/screenplay/ui/`): Seletores e localizadores de página

### Fluxo do Padrão
1. **Actor** é criado com um nome e recebe **Abilities** (habilidades)
2. Actor **attemptsTo** (tenta executar) **Tasks** (tarefas)
3. **Tasks** são compostas de **Interactions** (interações)
4. Actor **shouldSee** (deve ver) **Questions** (perguntas) para verificação

### Exemplo de Uso
```javascript
const actor = new Actor('testUser').can(BrowseTheWeb.using(cy))

actor.attemptsTo(
    Navigate.to(LoginPage.url),
    Login.withCredentials(email, password)
)

actor.shouldSee(
    VerifyLogin.isSuccessful()
)
```

## Configuração

- URL Base: `https://qa.newsgt.isitics.com` (configurado em `cypress.config.js`)
- Variáveis de ambiente carregadas do arquivo `.env` via dotenv
- Timeouts configurados para diferentes operações (15s comandos, 60s carregamento de páginas, 20s/30s requisições)

## Variáveis de Ambiente

Os testes usam variáveis de ambiente para credenciais:
- `UO_EMAIL` / `UO_PASSWORD` - Credenciais do usuário UO (Unidade Operacional)
- `ADMIN_EMAIL` / `ADMIN_PASSWORD` - Credenciais do usuário Admin
- `INVALID_EMAIL` / `INVALID_PASSWORD` - Credenciais inválidas para testes negativos

Estas são definidas no arquivo `.env` (não commitado no controle de versão).

## Navegação de Módulos

### Seletores de Elementos
- **Módulos normais**: `data-testid="modern-card-link"`
- **Módulos com submódulos**: `data-testid="module-card"`
- **Submódulos**: `data-testid="submodule-card"`

### Navegação Hierárquica
Para módulos que possuem submódulos (ex: Produção):
```javascript
actor.attemptsTo(
    Navigate.toProducao(), // Clica no módulo pai
    Wait.forSubmodulesToLoad(), // Aguarda submódulos aparecerem
    NavigateToSubmodule.toProducaoEmGrupo() // Clica no submódulo específico
)
```

### Esperas Importantes
- `Wait.forModulesToLoad()` - Aguarda módulos principais carregarem
- `Wait.forSubmodulesToLoad()` - Aguarda submódulos aparecerem
- `Wait.forElement(selector)` - Aguarda elemento específico
- Todos os cliques verificam `should('be.visible')` antes da interação

## Personas e Usuários

### Uso de Personas
```javascript
const uoUser = Personas.uo(); // Retorna credenciais UO
const adminUser = Personas.admin(); // Retorna credenciais Admin

Login.withPersona(uoUser) // Login usando persona
```

## Padrão de Estrutura de Arquivos

Ao adicionar nova funcionalidade:
- **Tasks**: Ações de nível de negócio em `tasks/` (ex: Login, Navigate, NavigateToSubmodule)
- **Interactions**: Ações de nível de UI em `interactions/` (ex: Click, Type, Wait)
- **Questions**: Lógica de verificação em `questions/` (ex: VerifyModuleLinks, VerifySubmodules)
- **Personas**: Dados de usuários em `personas/` (ex: Personas.uo(), Personas.admin())
- **UI Elements**: Page objects com seletores em `ui/`
- **Abilities**: Capacidades do ator em `abilities/`

Cada classe segue o padrão:
- Métodos factory estáticos para criação
- Método `performAs(actor)` para Tasks/Interactions
- Método `checkAsExpected(actor)` para Questions