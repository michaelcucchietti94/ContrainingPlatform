package com.contrader.contraininggame.model.game;

import com.contrader.contraininggame.model.game.support.CSSColor;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
public class Squadra extends AbstractPartecipante {
    private List<Giocatore> team = new ArrayList<>();
    private CSSColor color = new CSSColor(120,120,120);

    public Squadra(String nominativo) {
        super(nominativo);
    }

    @Override
    public boolean isAlly(Partecipante p) {
        if(this.getNominativo().equals(p.getNominativo()))
            return true;

        for(Giocatore f : team) {
            if(f.isAlly(p)) {
                return true;
            }
        }

        return false;
        //return team.stream().anyMatch((g) -> g.isAlly(p));
    }

    @Override
    public int getScore() {
        int[] result = {0};
        team.forEach(t -> result[0] += t.getScore());

        return result[0];
    }
    public void setColor(int r, int g, int b) {
        this.color = new CSSColor(r,g,b);
    }
    public String getColor() {
        return this.color.toString();
    }
}
