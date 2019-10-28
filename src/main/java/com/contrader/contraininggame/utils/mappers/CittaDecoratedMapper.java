package com.contrader.contraininggame.utils.mappers;

import com.contrader.contraininggame.model.Citta;
import com.contrader.contraininggame.model.decorated.CittaDecorated;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class CittaDecoratedMapper implements Mapper<Citta, CittaDecorated> {
    @Override
    public CittaDecorated apply(Citta citta) {
        CittaDecorated result = new CittaDecorated();
        result.setId(citta.getId());
        result.setName(citta.getName());
        result.setStato(citta.getStato());
        result.setTest(citta.getTest());
        return result;
    }
}
