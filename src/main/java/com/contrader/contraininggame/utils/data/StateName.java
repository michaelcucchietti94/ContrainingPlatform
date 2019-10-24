package com.contrader.contraininggame.utils.data;

import com.contrader.contraininggame.model.Stato;

public enum StateName {
    ARGENTINA(States.argentina),
    BRASILE(States.brasile),
    CANADA(States.canada),
    COLOMBIA(States.colombia),
    CUBA(States.cuba),
    GUATEMALA(States.guatemala),
    MESSICO(States.messico),
    NICARAGUA(States.nicaragua),
    PERU(States.peru),
    USA(States.usa),
    DANIMARCA(States.danimarca),
    FRACIA(States.francia),
    GERMANIA(States.germania),
    GRECIA(States.grecia),
    ISLANDA(States.islanda),
    ITALIA(States.italia),
    REGNOUNITO(States.regnoUnito),
    SPAGNA(States.spagna),
    SVEZIA(States.svezia),
    UCRAINA(States.ucraina);

    private Stato stato;
    private StateName(Stato s) {
        this.stato = s;
    }

    public Stato getStato() {
        return stato;
    }
}
