package com.contrader.contraininggame.model.states.asia;

import com.contrader.contraininggame.model.Stato;
import com.contrader.contraininggame.utils.data.ContinentName;


public class Malesia extends Stato {
    public Malesia() {
        this.setContinente(ContinentName.ASIA.getContinente());
        this.setNome("Malesia");
    }
}
