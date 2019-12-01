package com.contrader.contraininggame.model.game.support;

import com.contrader.contraininggame.model.test.UserTestScore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Action {
    private UserTestScore score;
    private Long territorioDest;
    private Long territorioSource;
    private Integer armate;
}
