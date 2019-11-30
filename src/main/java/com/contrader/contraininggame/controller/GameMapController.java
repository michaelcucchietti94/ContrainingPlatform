package com.contrader.contraininggame.controller;

import com.contrader.contraininggame.controller.gamemapsubcontrollers.*;
import com.contrader.contraininggame.model.*;
import com.contrader.contraininggame.model.decorated.DomandaDecorated;
import com.contrader.contraininggame.model.test.UserTestScore;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/game")
@CrossOrigin(origins = "http://localhost:4200")
public class GameMapController {

    /* TESTING USER */
    @Autowired
    private UserTestController userTestController;

    @GetMapping("/test/user_{username}/start_test_{argomento}")
    public void startTest(@PathVariable("username") String username, @PathVariable("argomento") String argomento) {
        userTestController.startTest(username, argomento);
    }

    @GetMapping("/test/user_{username}/getNextQuestion")
    public DomandaDecorated getNextQuestion(@PathVariable("username") String username) {
        return userTestController.getNextQuestion(username);
    }

    @PostMapping("/test/user/addResponse")
    public void addResponse(@RequestBody RispostaUtente risposta) {
        userTestController.addRisposta(risposta);
    }

    @GetMapping("/test/user_{username}/hasMoreQuestion")
    public Boolean hasMoreQuestion(@PathVariable("username") String username) {
        return userTestController.hasMoreQuestion(username);
    }

    @GetMapping("/test/user_{username}/end_test")
    public UserTestScore endTest(@PathVariable("username") String username) {
        return this.userTestController.endTest(username);
    }

    /* TESTING USER */
}
