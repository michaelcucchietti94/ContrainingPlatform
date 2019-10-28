package com.contrader.contraininggame.service;

import com.contrader.contraininggame.model.Continente;
import com.contrader.contraininggame.repository.ContinenteRepository;
import com.contrader.contraininggame.utils.data.ContinentName;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class ContinenteService extends DefaultService<Continente, Long> {
    private boolean emptyCache = true;

    private boolean isEmpty() {
        return ((List<Continente>)this.getAll()).size() == 0;
    }
    public void initContinenti() {
        ContinenteRepository repo = (ContinenteRepository)this.repository;
        if(emptyCache && isEmpty()) {
            Arrays.stream(ContinentName.values()).forEach((c) -> {
                this.insert(c.getContinente());
            });
            emptyCache = false;
        }
    }


    public List<Continente> getContinentiByCategory(Long idCategoria) {
        return ((ContinenteRepository)repository).getContinentiByCategory(idCategoria);
    }
}
