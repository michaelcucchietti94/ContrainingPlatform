package com.contrader.contraininggame.service;

import com.contrader.contraininggame.model.game.Territorio;
import com.contrader.contraininggame.repository.TerritoriRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TerritorioService extends DefaultService<Territorio, Long> {

    public List<Territorio> getTerritoriConfinanti(Long idTerritorio) {
        return ((TerritoriRepository)repository).getTerritoriConfinanti(idTerritorio);
    }

    public Territorio getById(Long id) {
        return ((TerritoriRepository)repository).getById(id);
    }
}
