package com.contrader.contraininggame.model.game;

import java.util.List;

public interface Partecipante {
    List<Territorio> getTerritori();
    void conquista(Territorio t);
    void perdi(Territorio t);

    String getNominativo();
    boolean isAlly(Partecipante p);
    int getScore();
}
