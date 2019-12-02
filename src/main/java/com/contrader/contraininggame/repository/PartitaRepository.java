package com.contrader.contraininggame.repository;

import com.contrader.contraininggame.model.User;
import com.contrader.contraininggame.model.game.Giocatore;
import com.contrader.contraininggame.model.game.Partita;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;


public interface PartitaRepository {
    Partita getPartita();
    Giocatore createGiocatore(User u);

}
