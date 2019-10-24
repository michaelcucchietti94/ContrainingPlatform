package com.contrader.contraininggame.utils.data;

import com.contrader.contraininggame.model.Continente;

public enum ContinentName {
    AMERICHE(Continents.americhe),
    ASIA(Continents.asia),
    EUROPA(Continents.europa),
    AFRICA(Continents.africa),
    OCEANIA(Continents.oceania);

    private Continente continente;

    private ContinentName(Continente c) {
        this.continente = c;
    }
    public Continente getContinente() {
        return continente;
    }

}
