package com.contrader.contraininggame.model.states.africa;

import com.contrader.contraininggame.model.Stato;
import com.contrader.contraininggame.utils.data.ContinentName;


public class Marocco extends Stato {
    public Marocco() {
        this.setContinente(ContinentName.AFRICA.getContinente());
        this.setNome("Marocco");
    }
}
