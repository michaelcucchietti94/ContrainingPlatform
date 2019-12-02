package com.contrader.contraininggame.controller;

import com.contrader.contraininggame.controller.gamemapsubcontrollers.*;
import com.contrader.contraininggame.model.*;
import com.contrader.contraininggame.model.decorated.DomandaDecorated;
import com.contrader.contraininggame.model.decorated.TerritorioDecorated;
import com.contrader.contraininggame.model.game.Partecipante;
import com.contrader.contraininggame.model.game.Squadra;
import com.contrader.contraininggame.model.game.Territorio;
import com.contrader.contraininggame.model.game.support.Action;
import com.contrader.contraininggame.model.test.UserTestScore;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/game")
@CrossOrigin(origins = "http://localhost:4200")
public class GameMapController {

    /* TESTING USER */
    @Autowired
    private UserTestController userTestController;

    @GetMapping("/test/user_{username}/start_test_{argomento}/lv_{level}")
    public void startTest(@PathVariable("username") String username, @PathVariable("argomento") String argomento, @PathVariable("level") Integer level) {
        userTestController.startTest(username, argomento, level);
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
    
    /* GAMING */
    @Autowired
    private PartitaController partita;


    @PostMapping("/match/start")
    public void startGame(@RequestBody User u) {
        partita.startGame(u);
    }

    @GetMapping("/match/getConfini")
    public List<TerritorioDecorated> getConfinanti() {
        return partita.getConfinanti();
    }

    @GetMapping("/match/getAvailableAttackerFor_{targetTerritorio}")
    public List<TerritorioDecorated> getIdTerritoriAvailableForAttack(@PathVariable("targetTerritorio") Long idTerritorio) {
        return partita.getTerritoriAvailableForAttack(idTerritorio);
    }

    @GetMapping("/match/getConquistati")
    public List<TerritorioDecorated> getConquistati() {
        return partita.getConquistati();
    }

    @GetMapping("/match/getPartecipanti")
    public List<String> getPartecipanti() {
        return partita.getPartecipanti();
    }

    @GetMapping("/match/getTerritoriOf_{nominativo}")
    public List<Territorio> getTerritoriOf(@PathVariable("nominativo") String p) {
        return partita.getTerritoriOf(p);
    }

    @PostMapping("/match/muovi")
    public void muovi(@RequestBody Action azione) {
        partita.muovi(azione.getScore(), azione.getTerritorioDest(), azione.getTerritorioSource(), azione.getArmate());
    }

    @PostMapping("/match/rinforza")
    public void rinforza(@RequestBody Action azione) {
        partita.rinforza(azione.getScore(), azione.getTerritorioDest());
    }

    /* GAMING */
    
}
