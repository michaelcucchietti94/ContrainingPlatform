package com.contrader.contraininggame.model.states.oceania;

import com.contrader.contraininggame.model.Stato;
import com.contrader.contraininggame.utils.data.ContinentName;


public class Australia extends Stato {
    public Australia() {
        this.setContinente(ContinentName.OCEANIA.getContinente());
        this.setNome("Australia");
    }
}
