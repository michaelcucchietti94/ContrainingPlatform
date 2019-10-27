package com.contrader.contraininggame.model.states.americhe;

import com.contrader.contraininggame.model.Stato;
import com.contrader.contraininggame.utils.data.ContinentName;
import org.springframework.stereotype.Component;


public class Guatemala extends Stato {
    public Guatemala() {
        this.setContinente(ContinentName.AMERICHE.getContinente());
        this.setNome("Guatemala");
    }
}
