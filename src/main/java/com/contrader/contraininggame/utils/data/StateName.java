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
    UCRAINA(States.ucraina),
    CINA(States.cina),,
    FILIPPINE(States.filippine),
    GIAPPONE(States.giappone),
    INDIA(States.india),
    IRAN(States.iran),
    IRAQ(States.iraq),
    LIBANO(States.libano),
    MALESIA(States.malesia),
    PAKISTAN(States.pakistan),
    RUSSIA(States.russia),
    ALGERIA(States.algeria),
    EGITTO(States.egitto),
    ETIOPIA(States.etiopia),
    MADAGASCAR(States.madagascar),
    MAROCCO(States.marocco),
    NIGERIA(States.nigeria),
    REPUBBLICA_DEL_CONGO(States.repubblicaDelCongo),
    SUD_AFRICA(States.sudAfrica),
    SUDAN(States.sudan),
    TANZANIA(States.tanzania),
    AUSTRALIA(States.australia),
    NUOVA_ZELANDA(States.nuovaZelanda),
    POLINESIA(States.polinesia);


    private Stato stato;
    private StateName(Stato s) {
        this.stato = s;
    }

    public Stato getStato() {
        return stato;
    }
}
