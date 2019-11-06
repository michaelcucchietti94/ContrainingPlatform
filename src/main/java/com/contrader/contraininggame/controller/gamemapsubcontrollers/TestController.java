package com.contrader.contraininggame.controller.gamemapsubcontrollers;

import com.contrader.contraininggame.controller.AbstractController;
import com.contrader.contraininggame.model.Test;
import com.contrader.contraininggame.service.TestService;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class TestController extends AbstractController<Test, Long> {

    public Integer getRemainingTest(String username, Integer livello, Long idCategoria) {
        return ((TestService)service).getRemainingTestFor(username, livello, idCategoria);
    }

    public Integer countTest() {
        return ((TestService)service).countTest();
    }

    public Integer countTest(Integer livello) {
        return ((TestService)service).countTest(livello);
    }

    public List<Test> userDoneTest(String username) {
        return ((TestService)service).testDoneForUser(username);
    }

    public List<Test> userDoneTest(String username, Integer livello) {
        return ((TestService)service).testDoneForUser(username, livello);
    }

    public List<Test> userNotDoneTest(String username) {
        return ((TestService)service).testNotDoneForUser(username);
    }

    public List<Test> userNotDoneTest(String username, Integer livello) {
        return ((TestService)service).testNotDoneForUser(username, livello);
    }


    public Integer countUserDoneTest(String username) {
        return ((TestService)service).testDoneForUser(username).size();
    }

    public Integer countUserDoneTest(String username, Integer livello) {
        return ((TestService)service).testDoneForUser(username, livello).size();
    }



}
