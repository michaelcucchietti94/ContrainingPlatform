package com.contrader.contraininggame.model.states.asia;

import com.contrader.contraininggame.model.Stato;
import com.contrader.contraininggame.utils.data.ContinentName;


public class Iran extends Stato {
    public Iran() {
        this.setContinente(ContinentName.ASIA.getContinente());
        this.setNome("Iran");
    }
}
