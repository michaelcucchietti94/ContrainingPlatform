package com.contrader.contraininggame.utils.mappers;

import com.contrader.contraininggame.model.Ranking;
import org.springframework.stereotype.Component;

@Component
public class RankingMapper implements Mapper<Object[], Ranking> {
    @Override
    public Ranking apply(Object[] objects) {
        return Ranking.createFromRepoObject(objects);
    }

    RankingMapper() {}
}
