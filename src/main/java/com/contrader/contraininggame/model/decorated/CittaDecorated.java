package com.contrader.contraininggame.model.decorated;

import com.contrader.contraininggame.model.Citta;
import lombok.Data;

@Data
public class CittaDecorated extends Citta {
    private Boolean enabled = false;
}
