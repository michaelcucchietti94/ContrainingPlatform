package com.contrader.contraininggame.model;

import com.contrader.contraininggame.utils.TypeChecker;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
public class Ranking {
    private String username;
    private Long score;

    public static Ranking createFromRepoObject(Object[] o) {
        if(o == null || o.length != 2)
            return null;



        if(o[0] instanceof String && TypeChecker.isNumeric(o[1])) {
            Ranking r = new Ranking();
            r.setUsername(o[0].toString());
            BigDecimal b = (BigDecimal)o[1];
            r.setScore(b.longValue());
            return r;
        }

        return null;
    }
}
