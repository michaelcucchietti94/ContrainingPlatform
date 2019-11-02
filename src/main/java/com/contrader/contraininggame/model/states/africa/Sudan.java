package com.contrader.contraininggame.model.states.africa;

import com.contrader.contraininggame.model.Stato;
import com.contrader.contraininggame.utils.data.ContinentName;


public class Sudan extends Stato {
    public Sudan() {
        this.setContinente(ContinentName.AFRICA.getContinente());
        this.setNome("Sudan");
    }
}