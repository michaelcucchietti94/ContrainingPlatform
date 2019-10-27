package com.contrader.contraininggame.model.states.oceania;

import com.contrader.contraininggame.model.Stato;
import com.contrader.contraininggame.utils.data.ContinentName;


public class NuovaZelanda extends Stato {
    public NuovaZelanda() {
        this.setContinente(ContinentName.OCEANIA.getContinente());
        this.setNome("Nuova Zelanda");
    }
}
