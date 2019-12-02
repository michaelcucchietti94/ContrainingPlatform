package com.contrader.contraininggame.model.decorated;

import com.contrader.contraininggame.model.game.Territorio;
import lombok.Data;

@Data
public class TerritorioDecorated extends Territorio {
    private String owner;

    public static TerritorioDecorated createFromTerritorio(Territorio t) {
        TerritorioDecorated tt = new TerritorioDecorated();

        tt.setId(t.getId());
        tt.setArmate(t.getArmate());
        tt.setCategory(t.getCategory());


        return tt;
    }
}
