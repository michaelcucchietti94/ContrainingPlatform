package com.contrader.contraininggame.utils.mappers;

import com.contrader.contraininggame.model.Stato;
import com.contrader.contraininggame.model.decorated.StatoDecorated;
import org.springframework.stereotype.Component;

@Component
public class StatiDecoratedMapper implements Mapper<Stato, StatoDecorated> {
    @Override
    public StatoDecorated apply(Stato stato) {
        StatoDecorated result = new StatoDecorated();
        result.setId(stato.getId());
        result.setName(stato.getName());
        result.setContinentPiece(stato.getContinentPiece());
        result.setTest(stato.getTest());
        return result;
    }
}
