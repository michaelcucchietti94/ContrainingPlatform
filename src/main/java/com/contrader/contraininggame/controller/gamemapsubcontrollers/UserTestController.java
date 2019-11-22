package com.contrader.contraininggame.controller.gamemapsubcontrollers;

import com.contrader.contraininggame.model.RispostaUtente;
import com.contrader.contraininggame.model.decorated.DomandaDecorated;
import com.contrader.contraininggame.model.test.UserTestScore;
import com.contrader.contraininggame.service.interfaces.IUserTestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UserTestController {
    @Autowired
    private IUserTestService userTestService;

    public void startTest(String username, Long idTest) {
        userTestService.startTest(username, idTest);
    }
    public DomandaDecorated getNextQuestion(String username) {
        return userTestService.getNextQuestion(username);
    }
    public Boolean hasMoreQuestion(String username) {
        return userTestService.hasMoreQuestions(username);
    }
    public void addRisposta(RispostaUtente rispostaUtente) {
        this.userTestService.addRisposta(rispostaUtente);
    }
    public UserTestScore endTest(String username) {
        return this.userTestService.finishTest(username);
    }
}
