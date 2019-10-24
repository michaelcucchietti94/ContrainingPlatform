package com.contrader.contraininggame.model.states.americhe;

import com.contrader.contraininggame.model.Stato;
import com.contrader.contraininggame.utils.data.ContinentName;
import org.springframework.stereotype.Component;

@Component
public class Canada extends Stato {
    public Canada() {
        this.setContinente(ContinentName.AMERICHE.getContinente());
        this.setNome("Canada");
    }
}
