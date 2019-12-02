package com.contrader.contraininggame.repository;

import com.contrader.contraininggame.model.User;
import com.contrader.contraininggame.model.game.Giocatore;
import com.contrader.contraininggame.model.game.Partita;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public class PartitaRepositoryConcrete implements PartitaRepository {
    private Partita partita = null;
    
    private void createPartita() {
        partita = new Partita();
        Giocatore g1 = new Giocatore("Marco86");
        g1.setScore(170);
        Giocatore g2 = new Giocatore("xAnto88");
        g1.setScore(180);
        Giocatore g3 = new Giocatore("red576");
        g1.setScore(150);
        Giocatore g4 = new Giocatore("manuel.povi");
        g1.setScore(150);
        Giocatore g5 = new Giocatore("MariangelaDiLella");
        g1.setScore(200);
        Giocatore g6 = new Giocatore("Carlo33");
        g1.setScore(0);
        Giocatore g7 = new Giocatore("Luca_ciao");
        g1.setScore(160);
        Giocatore g8 = new Giocatore("Dured.Il.Magnifico");
        g1.setScore(190);
        Giocatore g9 = new Giocatore("Maria_riccioli_doro");
        g1.setScore(200);
        Giocatore g10 = new Giocatore("DeVita.TheBest");
        g1.setScore(170);
        Giocatore g11 = new Giocatore("Mirco_il_sanguinario777");
        g1.setScore(170);
        
        partita.register(g1);
        partita.register(g2);
        partita.register(g3);
        partita.register(g4);
        partita.register(g5);
        partita.register(g6);
        partita.register(g7);
        partita.register(g8);
        partita.register(g9);
        partita.register(g10);
        partita.register(g11);
    }
    
    @Override
    public Partita getPartita() {
        if(partita == null) createPartita();
        
        return partita;
    }

    @Override
    public Giocatore createGiocatore(User u) {
        return new Giocatore(u.getUsername());
    }
}
