package com.contrader.contraininggame.model.states.americhe;

import com.contrader.contraininggame.model.Stato;
import com.contrader.contraininggame.utils.data.ContinentName;
import org.springframework.stereotype.Component;

@Component
public class Brasile extends Stato {
    public Brasile() {
        this.setContinente(ContinentName.AMERICHE.getContinente());
        this.setNome("Brasile");
    }
}
