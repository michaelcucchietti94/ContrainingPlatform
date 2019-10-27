package com.contrader.contraininggame.model.states.asia;

import com.contrader.contraininggame.model.Stato;
import com.contrader.contraininggame.utils.data.ContinentName;
import org.springframework.stereotype.Component;


public class Russia extends Stato {
    public Russia() {
        this.setContinente(ContinentName.ASIA.getContinente());
        this.setNome("Russia");
    }
}
