package com.contrader.contraininggame.service;

import com.contrader.contraininggame.model.Citta;
import com.contrader.contraininggame.model.Continente;
import com.contrader.contraininggame.model.Stato;
import com.contrader.contraininggame.repository.ContinenteRepository;
import com.contrader.contraininggame.repository.StatesRepository;
import com.contrader.contraininggame.utils.data.ContinentName;
import com.contrader.contraininggame.utils.data.StateName;

import java.util.Arrays;
import java.util.List;

public class StatesService extends DefaultService<Stato, Long> {
    private boolean emptyCache = true;

    private boolean isEmpty() {
        return ((List<Stato>)this.getAll()).size() == 0;
    }
    public void initStati() {
        StatesRepository repo = (StatesRepository)this.repository;
        if(emptyCache && isEmpty()) {
            Arrays.stream(StateName.values()).forEach((s) -> {
                this.insert(s.getStato());
            });
            emptyCache = false;
        }
    }
}
