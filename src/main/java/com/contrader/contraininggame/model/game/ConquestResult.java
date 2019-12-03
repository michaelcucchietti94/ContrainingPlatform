package com.contrader.contraininggame.model.game;

import lombok.Data;

@Data
public class ConquestResult {
    private String squadra1, squadra2;
    private int armate1, armate2;
    private int finalArmate1, finalArmate2;
    private int livello1, livello2;
}
