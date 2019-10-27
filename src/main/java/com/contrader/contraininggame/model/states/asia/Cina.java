package com.contrader.contraininggame.model.states.asia;

import com.contrader.contraininggame.model.Stato;
import com.contrader.contraininggame.utils.data.ContinentName;
import org.springframework.stereotype.Component;


public class Cina extends Stato {
    public Cina() {
        this.setContinente(ContinentName.ASIA.getContinente());
        this.setNome("Cina");
    }
}
