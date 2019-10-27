package com.contrader.contraininggame.model.states.oceania;

import com.contrader.contraininggame.model.Stato;
import com.contrader.contraininggame.utils.data.ContinentName;


public class Polinesia extends Stato {
    public Polinesia() {
        this.setContinente(ContinentName.OCEANIA.getContinente());
        this.setNome("Polinesia");
    }
}
