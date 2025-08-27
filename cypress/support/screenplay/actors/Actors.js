class Actor {
    constructor(name) {
        this.name = name;
        this.abilities = new Map();
        //ator tem um nome e uma coletanea de habilidades
        //usa map para armazenar as habilidades usando o nome como chave
    }

    can(ability) {
        this.abilities.set(ability.constructor.name, ability);
        return this;
        //add habilidade ao ator
    }

    using(abilityName) {
        return this.abilities.get(abilityName);
        //recupera a habilidade do ator pelo nome
        //retonna a instancia da habilidade armazenada
    }

    attemptsTo(...tasks) {
        for (const task of tasks) {
            task.performAs(this);
            //executa uma ou múltiplas tasks em sequência (login, navigate...)
            //...tasks transforma argumentos individuais em um array, permitindo passar quantas tasks quiser
        }
        return this
    }

    shouldSee(verification) {
        verification.checkAsExpected(this);
        return this;
        //verificações
    }

}
module.exports = {Actor};