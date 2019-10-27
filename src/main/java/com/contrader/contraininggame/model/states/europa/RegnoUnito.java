package com.contrader.contraininggame.model.states.europa;

import com.contrader.contraininggame.model.Stato;
import com.contrader.contraininggame.utils.data.ContinentName;
import org.springframework.stereotype.Component;


public class RegnoUnito extends Stato {
    public RegnoUnito() {
        this.setContinente(ContinentName.EUROPA.getContinente());
        this.setNome("Regno Unito");
    }
}
