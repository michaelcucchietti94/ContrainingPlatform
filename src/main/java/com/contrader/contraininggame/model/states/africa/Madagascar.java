package com.contrader.contraininggame.model.states.africa;

import com.contrader.contraininggame.model.Stato;
import com.contrader.contraininggame.utils.data.ContinentName;


public class Madagascar extends Stato {
    public Madagascar() {
        this.setContinente(ContinentName.AFRICA.getContinente());
        this.setNome("Madagascar");
    }
}
