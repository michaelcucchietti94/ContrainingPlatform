package com.contrader.contraininggame.model.states.europa;

import com.contrader.contraininggame.model.Stato;
import com.contrader.contraininggame.utils.data.ContinentName;
import org.springframework.stereotype.Component;


public class Ucraina extends Stato {
    public Ucraina() {
        this.setContinente(ContinentName.EUROPA.getContinente());
        this.setNome("Ucraina");
    }
}
