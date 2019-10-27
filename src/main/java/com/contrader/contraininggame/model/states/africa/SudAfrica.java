package com.contrader.contraininggame.model.states.africa;

import com.contrader.contraininggame.model.Stato;
import com.contrader.contraininggame.utils.data.ContinentName;


public class SudAfrica extends Stato {
    public SudAfrica() {
        this.setContinente(ContinentName.AFRICA.getContinente());
        this.setNome("Sud Africa");
    }
}
