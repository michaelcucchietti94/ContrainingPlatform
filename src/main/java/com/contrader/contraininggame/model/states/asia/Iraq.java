package com.contrader.contraininggame.model.states.asia;

import com.contrader.contraininggame.model.Stato;
import com.contrader.contraininggame.utils.data.ContinentName;


public class Iraq extends Stato {
    public Iraq() {
        this.setContinente(ContinentName.ASIA.getContinente());
        this.setNome("Iraq");
    }
}
