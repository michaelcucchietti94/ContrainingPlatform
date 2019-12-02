package com.contrader.contraininggame.service.interfaces;

import com.contrader.contraininggame.model.Categoria;
import com.contrader.contraininggame.model.RispostaUtente;
import com.contrader.contraininggame.model.decorated.DomandaDecorated;
import com.contrader.contraininggame.model.test.UserTestScore;

public interface IUserTestService  {
    void startTest(String username, String argomento, Integer level);
    DomandaDecorated getNextQuestion(String username);
    Boolean hasMoreQuestions(String username);
    void addRisposta(RispostaUtente r);
    UserTestScore finishTest(String username);
}
