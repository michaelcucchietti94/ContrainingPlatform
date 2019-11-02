package com.contrader.contraininggame.model.decorated;

import com.contrader.contraininggame.model.Domanda;
import com.contrader.contraininggame.model.RispostaDomanda;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Setter
public class DomandaDecorated extends Domanda {
    private boolean last = false;
    private List<RispostaDomanda> risposte;

    public boolean isLast() {
        return last;
    }
    public List<RispostaDomanda> getRisposte() {return risposte;}

    public static DomandaDecorated createFromDomanda(Domanda d) {
        DomandaDecorated dd = new DomandaDecorated();
        dd.setId(d.getId());
        dd.setSpiegazione(d.getSpiegazione());
        dd.setTest(d.getTest());
        dd.setTesto(d.getTesto());
        dd.setLast(false);
        dd.risposte = new ArrayList<>();

        return dd;
    }
}
