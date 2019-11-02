package com.contrader.contraininggame.controller.gamemapsubcontrollers;

import com.contrader.contraininggame.controller.AbstractController;
import com.contrader.contraininggame.model.Stato;
import com.contrader.contraininggame.service.StatoService;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class StatoController extends AbstractController<Stato, Long> {

    public List<Stato> getStateForContinentPiece(Long idStato) {
        return ((StatoService)service).getStatiByContinentPiece(idStato);
    }
}
