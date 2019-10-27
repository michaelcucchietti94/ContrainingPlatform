package com.contrader.contraininggame.model.states.asia;

import com.contrader.contraininggame.model.Stato;
import com.contrader.contraininggame.utils.data.ContinentName;
import org.springframework.stereotype.Component;


public class Libano extends Stato {
    public Libano() {
        this.setContinente(ContinentName.ASIA.getContinente());
        this.setNome("Libano");
    }
}
