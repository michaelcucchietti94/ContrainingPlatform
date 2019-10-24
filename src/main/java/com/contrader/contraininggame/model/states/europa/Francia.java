package com.contrader.contraininggame.model.states.europa;

import com.contrader.contraininggame.model.Stato;
import com.contrader.contraininggame.utils.data.ContinentName;
import org.springframework.stereotype.Component;

@Component
public class Francia extends Stato {
    public Francia() {
        this.setContinente(ContinentName.EUROPA.getContinente());
        this.setNome("Francia");
    }
}
