package com.contrader.contraininggame.model.states.europa;

import com.contrader.contraininggame.model.Stato;
import com.contrader.contraininggame.utils.data.ContinentName;
import org.springframework.stereotype.Component;


public class Svezia extends Stato {
    public Svezia() {
        this.setContinente(ContinentName.EUROPA.getContinente());
        this.setNome("Svezia");
    }
}
