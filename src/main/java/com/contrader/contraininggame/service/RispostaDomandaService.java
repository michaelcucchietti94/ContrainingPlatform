package com.contrader.contraininggame.service;

import com.contrader.contraininggame.model.RispostaDomanda;
import com.contrader.contraininggame.repository.RispostaDomandaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RispostaDomandaService extends DefaultService<RispostaDomanda, Long> {
    public List<RispostaDomanda> getByDomanda(Long idDomanda) {
        return ((RispostaDomandaRepository)repository).getByDomanda(idDomanda);
    }
}
