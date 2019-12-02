package com.contrader.contraininggame.controller.gamemapsubcontrollers;

import com.contrader.contraininggame.model.User;
import com.contrader.contraininggame.model.decorated.TerritorioDecorated;
import com.contrader.contraininggame.model.game.Giocatore;
import com.contrader.contraininggame.model.game.Partecipante;
import com.contrader.contraininggame.model.game.Squadra;
import com.contrader.contraininggame.model.game.Territorio;
import com.contrader.contraininggame.model.test.UserTestScore;
import com.contrader.contraininggame.service.PartitaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class PartitaController {
    @Autowired
    private PartitaService service;

    public void startGame(User u) {
        this.service.startGame(u);
    }

    
    public List<TerritorioDecorated> getConfinanti() {
        return service.getConfinanti();
    }

    
    public List<TerritorioDecorated> getConquistati() {
        return service.getConquistati();
    }

    
    public List<String> getPartecipanti() {
        List<String> result = new ArrayList<>();
        service.getPartecipanti().forEach(p -> {
            result.add(p.getNominativo());
        });
        return result;
    }

    
    public List<Territorio> getTerritoriOf(String nominativo) {
        return service.getTerritoriOf(nominativo);
    }


    public List<TerritorioDecorated> getTerritoriAvailableForAttack(Long idTerritorioTarget) {
        return this.service.getTerritoriAvailableForAttack(idTerritorioTarget);
    }
    
    public void muovi(UserTestScore testScore, Long destId, Long sourceId, int armate) {
        if(service.trasferisciUnita(sourceId, armate) && testScore.getScore() > 60) {
            service.muovi(destId, armate, testScore.getLevel());
        }
    }

    
    public void rinforza(UserTestScore testScore, Long territorioId) {
        if(testScore.getScore() > 60)
            service.rinforza(territorioId, testScore.getLevel());
    }
}
