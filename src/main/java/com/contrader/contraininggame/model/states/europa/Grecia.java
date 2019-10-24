package com.contrader.contraininggame.model.states.europa;

import com.contrader.contraininggame.model.Stato;
import com.contrader.contraininggame.utils.data.ContinentName;
import org.springframework.stereotype.Component;

@Component
public class Grecia extends Stato {
    public Grecia() {
        this.setContinente(ContinentName.EUROPA.getContinente());
        this.setNome("Grecia");
    }
}
