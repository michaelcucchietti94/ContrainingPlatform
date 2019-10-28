package com.contrader.contraininggame.controller.gamemapsubcontrollers;

import com.contrader.contraininggame.controller.AbstractController;
import com.contrader.contraininggame.model.Citta;
import com.contrader.contraininggame.service.CittaService;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CittaController extends AbstractController<Citta, Long> {

    public List<Citta> getCitiesForState(Long idStato) {
        return ((CittaService)service).getCitiesForState(idStato);
    }
}
