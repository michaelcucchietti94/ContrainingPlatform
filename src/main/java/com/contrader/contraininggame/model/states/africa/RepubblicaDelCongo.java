package com.contrader.contraininggame.model.states.africa;

import com.contrader.contraininggame.model.Stato;
import com.contrader.contraininggame.utils.data.ContinentName;


public class RepubblicaDelCongo extends Stato {
    public RepubblicaDelCongo() {
        this.setContinente(ContinentName.AFRICA.getContinente());
        this.setNome("Repubblica Del Congo");
    }
}
