package com.contrader.contraininggame.model.states.americhe;

import com.contrader.contraininggame.model.Stato;
import com.contrader.contraininggame.utils.data.ContinentName;
import org.springframework.stereotype.Component;

@Component
public class Peru extends Stato {
    public Peru() {
        this.setContinente(ContinentName.AMERICHE.getContinente());
        this.setNome("Peru");
    }
}
