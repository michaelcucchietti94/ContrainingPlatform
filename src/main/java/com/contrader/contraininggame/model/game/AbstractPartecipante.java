package com.contrader.contraininggame.model.game;

import javax.servlet.http.Part;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public abstract class AbstractPartecipante implements Partecipante {
    private Map<Long, Territorio> territori = new HashMap<>();
    private String nominativo;

    public AbstractPartecipante(String nominativo) {
        this.nominativo = nominativo;
    }

    @Override
    public List<Territorio> getTerritori() {
        return new ArrayList<>(territori.values());
    }

    @Override
    public void conquista(Territorio t) {
        if(territori.containsKey(t.getId()))
            return;

        territori.put(t.getId(), t);
    }

    @Override
    public void perdi(Territorio t) {
        if(territori.containsKey((t.getId())))
            territori.remove(t.getId());
    }

    @Override
    public String getNominativo() {
        return this.nominativo;
    }
}
