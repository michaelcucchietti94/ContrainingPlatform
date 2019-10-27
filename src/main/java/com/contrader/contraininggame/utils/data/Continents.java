package com.contrader.contraininggame.utils.data;

import com.contrader.contraininggame.model.continents.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
class Continents {

    static Americhe americhe = new Americhe();
    static Asia asia = new Asia();
    static Europa europa = new Europa();
    static Africa africa = new Africa();
    static Oceania oceania = new Oceania();

}
