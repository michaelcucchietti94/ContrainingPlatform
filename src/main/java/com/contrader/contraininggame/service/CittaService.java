package com.contrader.contraininggame.service;

import com.contrader.contraininggame.model.Citta;
import com.contrader.contraininggame.repository.CittaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CittaService extends DefaultService<Citta, Long> {

    public List<Citta> getCitiesForState(Long idStato) {
        return ((CittaRepository)repository).getCitiesInState(idStato);
    }

}
