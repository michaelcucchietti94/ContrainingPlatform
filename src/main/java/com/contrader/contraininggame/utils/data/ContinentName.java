package com.contrader.contraininggame.utils.data;

import com.contrader.contraininggame.model.Continente;

public enum ContinentName {
    AMERICHE(Continents.americhe.clona()),
    ASIA(Continents.asia.clona()),
    EUROPA(Continents.europa.clona()),
    AFRICA(Continents.africa.clona()),
    OCEANIA(Continents.oceania.clona());

    private Continente continente;

    private ContinentName(Continente c) {
        this.continente = c;
    }
    public Continente getContinente() {
        return continente;
    }

}
