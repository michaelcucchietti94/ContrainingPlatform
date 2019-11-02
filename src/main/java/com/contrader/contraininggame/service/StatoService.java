package com.contrader.contraininggame.service;

import com.contrader.contraininggame.model.Stato;
import com.contrader.contraininggame.repository.StatoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StatoService extends DefaultService<Stato, Long> {

    public List<Stato> getStatiByContinentPiece(Long idCP) {
        return ((StatoRepository)repository).getStatiByContinentPiece(idCP);
    }

}
