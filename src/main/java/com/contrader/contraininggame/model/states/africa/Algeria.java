package com.contrader.contraininggame.model.states.africa;

import com.contrader.contraininggame.model.Stato;
import com.contrader.contraininggame.utils.data.ContinentName;


public class Algeria extends Stato {
    public Algeria() {
        this.setContinente(ContinentName.AFRICA.getContinente());
        this.setNome("Algeria");
    }
}
