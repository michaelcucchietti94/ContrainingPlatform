package com.contrader.contraininggame.service.interfaces;

import com.contrader.contraininggame.model.RispostaUtente;
import com.contrader.contraininggame.model.decorated.DomandaDecorated;
import com.contrader.contraininggame.model.test.UserTestScore;

public interface IUserTestService  {
    void startTest(String username, Long idTest);
    DomandaDecorated getNextQuestion(String username);
    void addRisposta(RispostaUtente r);
    UserTestScore finishTest(String username);
}
