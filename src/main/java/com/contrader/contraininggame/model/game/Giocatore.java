package com.contrader.contraininggame.model.game;

import lombok.Data;
import lombok.Getter;

@Data
public class Giocatore extends AbstractPartecipante {

    private int score = 0;

    public Giocatore(String nominativo) {
        super(nominativo);
    }

    @Override
    public boolean isAlly(Partecipante p) {
        return p.getNominativo().equals(this.getNominativo());
    }
}
