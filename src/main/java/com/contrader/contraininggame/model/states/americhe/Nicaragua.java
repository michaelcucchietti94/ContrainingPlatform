package com.contrader.contraininggame.model.states.americhe;

import com.contrader.contraininggame.model.Stato;
import com.contrader.contraininggame.utils.data.ContinentName;
import org.springframework.stereotype.Component;

@Component
public class Nicaragua extends Stato {
    public Nicaragua() {
        this.setContinente(ContinentName.AMERICHE.getContinente());
        this.setNome("Nicaragua");
    }
}
