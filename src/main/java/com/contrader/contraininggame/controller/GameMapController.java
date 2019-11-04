package com.contrader.contraininggame.controller;

import com.contrader.contraininggame.controller.gamemapsubcontrollers.*;
import com.contrader.contraininggame.model.*;
import com.contrader.contraininggame.model.decorated.StatoDecorated;
import com.contrader.contraininggame.model.decorated.DomandaDecorated;
import com.contrader.contraininggame.model.decorated.RequestState;
import com.contrader.contraininggame.model.test.UserTestScore;
import com.contrader.contraininggame.utils.mappers.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/game")
@CrossOrigin(origins = "http://localhost:4200")
public class GameMapController {

    @Autowired
    private StatoController statoController;

    @Autowired
    private ContinenteController continenteController;

    @Autowired
    private ContinentPieceController continentPieceController;

    @Autowired
    private TestController testController;

    @Autowired
    private UserTestController userTestController;

    @Autowired
    private RispostaDomandaController rispostaDomandaController;

    @Autowired
    private Mapper<Stato, StatoDecorated> statiMapper;



    @GetMapping("/ContinenteByCategory_{id}")
    public List<Continente> getContinentiByCategory(@PathVariable("id") Long idCategoria) {
        return continenteController.getContinentiByCategory(idCategoria);
    }

    @GetMapping("/PiecesByContinente_{id}")
    public List<ContinentPiece> getPiecesOfContinent(@PathVariable("id") Long id) {
        return continentPieceController.getByContinente(id);
    }

    @GetMapping("/PiecesByContinente_{idContinente}/Category_{idCategory}")
    public List<ContinentPiece> getPiecesByContinentAndCategory(@PathVariable("idContinente") Long idContinente, @PathVariable("idCategory") Long idCategoria) {
        return continentPieceController.getByContinenteAndCategory(idContinente, idCategoria);
    }

    @GetMapping("/StatiByContinentPiece_{id}")
    public List<StatoDecorated> getStatiByContinentPiece(@PathVariable("id") Long idCP) {
        return statoController.getStateForContinentPiece(idCP)
                .stream()
                .map(statiMapper)
                .collect(Collectors.toList());
    }

    /**
     * Ritorna un array di città con il flag enabled impostato a seconda se l'utente può accedere o meno ad una determinata categoria di test
     * per un certo livello
     * @param request Oggetto che incapsula User e ContinentPiece
     * @return
     */
    @PostMapping("/StatiAvailable")
    public List<StatoDecorated> getAvailableStati(@RequestBody RequestState request) {
        User user = request.getUser();
        ContinentPiece continentPiece = request.getContinentPiece();

        List<StatoDecorated> sureAvailable = getStatiByContinentPiece(continentPiece.getId()).stream().filter((stato) -> stato.getTest().getLivello() <= user.getLivello()).collect(Collectors.toList());

        // Tutte le città che hanno livello <= del livello utente sono abilitate sicuramente
        sureAvailable
                .forEach((stato) -> stato.setEnabled(true));

        // Tutte le città che hanno livello > del livello dell'utente potrebbero essere abilitate se l'utente ha completato i
        // test della stessa categoria ma di livello inferiore.
        // Ottieni quindi la lista di città che potrebbero essere abilitate
        List<StatoDecorated> maybeAvailable = getStatiByContinentPiece(continentPiece.getId())
                .stream()
                .filter((stato) -> stato.getTest().getLivello() > user.getLivello())
                .collect(Collectors.toList());


        // Per ogni città da verificare
        maybeAvailable.stream().forEach((stato) -> {

            int level = stato.getTest().getLivello() - 1;                   // i test completati devono essere quelli del livello inferiore
            long idCategoria = stato.getTest().getCategoria().getId();      // i test devono appartenere alla stessa categoria della città
            String username = user.getUsername();                           // la verifica si attua per l'utete specificato

            int remainingTests = testController.getRemainingTest(username, level, idCategoria); // conta i test rimanenti
            // se il numero di test rimanenti per quella categoria per il livello inferiore per l'utente specificato è pari a 0, allora l'utente
            // ha accesso alla città
            if(remainingTests == 0) {
                stato.setEnabled(true);
            } else {
                stato.setEnabled(false);
            }
        });


        // unisci le due liste
        List<StatoDecorated> toAdd = new ArrayList<>();
        maybeAvailable.stream()
                .filter(StatoDecorated::getEnabled)
                .forEach(stato -> {
                    if(sureAvailable.stream().noneMatch((statoSure) -> statoSure.getId().equals(stato.getId()))) {
                        toAdd.add(stato);
                    }
                });

        sureAvailable.addAll(toAdd);
        return sureAvailable;
    }

    @GetMapping("/test/user_{username}/start_test_{idTest}")
    public void startTest(@PathVariable("username") String username, @PathVariable("idTest") Long idTest) {
        userTestController.startTest(username, idTest);
    }

    @GetMapping("/test/user_{username}/getNextQuestion")
    public DomandaDecorated getNextQuestion(@PathVariable("username") String username) {
        return userTestController.getNextQuestion(username);
    }

    @PostMapping("/test/user/addResponse")
    public void addResponse(@RequestBody RispostaUtente risposta) {
        userTestController.addRisposta(risposta);
    }

    @GetMapping("/test/user_{username}/end_test")
    public UserTestScore endTest(@PathVariable("username") String username) {
        return this.userTestController.endTest(username);
    }

    @GetMapping("/countTest")
    public Integer countTest() {
        return testController.countTest();
    }
    @GetMapping("/countTest_level_{level}")
    public Integer countTest(@PathVariable("level") Integer level) {
        return testController.countTest(level);
    }


    @GetMapping("/user_{username}/testDone")
    public List<Test> testForUser(@PathVariable("username") String username){
        return testController.userDoneTest(username);
    }

    @GetMapping("/user_{username}/testDone_level_{level}")
    public List<Test> testForUser(@PathVariable("username") String username, @PathVariable("level") Integer level){
        return testController.userDoneTest(username, level);
    }

    @GetMapping("/user_{username}/countTestDone")
    public Integer countTestForUser(@PathVariable("username") String username){
        return testController.countUserDoneTest(username);
    }

    @GetMapping("/user_{username}/countTestDone_level_{level}")
    public Integer countTestForUser(@PathVariable("username") String username, @PathVariable("level") Integer level){
        return testController.countUserDoneTest(username, level);
    }
}
