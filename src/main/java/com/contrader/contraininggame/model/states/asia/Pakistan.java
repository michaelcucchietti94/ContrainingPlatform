package com.contrader.contraininggame.model.states.asia;

import com.contrader.contraininggame.model.Stato;
import com.contrader.contraininggame.utils.data.ContinentName;


public class Pakistan extends Stato {
    public Pakistan() {
        this.setContinente(ContinentName.ASIA.getContinente());
        this.setNome("Pakistan");
    }
}
