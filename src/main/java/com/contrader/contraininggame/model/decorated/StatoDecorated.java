package com.contrader.contraininggame.model.decorated;

import com.contrader.contraininggame.model.Stato;
import lombok.Data;

@Data
public class StatoDecorated extends Stato {
    private Boolean enabled = false;
}
