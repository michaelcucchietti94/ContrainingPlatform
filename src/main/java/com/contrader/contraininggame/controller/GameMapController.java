package com.contrader.contraininggame.controller;

import com.contrader.contraininggame.controller.gamemapsubcontrollers.CittaController;
import com.contrader.contraininggame.controller.gamemapsubcontrollers.ContinenteController;
import com.contrader.contraininggame.controller.gamemapsubcontrollers.StatiController;
import com.contrader.contraininggame.model.Citta;
import com.contrader.contraininggame.model.Continente;
import com.contrader.contraininggame.model.Stato;
import com.contrader.contraininggame.model.User;
import com.contrader.contraininggame.model.decorated.CittaDecorated;
import com.contrader.contraininggame.model.decorated.RequestCities;
import com.contrader.contraininggame.service.ContinenteService;
import com.contrader.contraininggame.service.StatesService;
import com.contrader.contraininggame.utils.mappers.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/map")
@CrossOrigin(origins = "http://localhost:4200")
public class GameMapController {

    @Autowired
    private CittaController cittaController;

    @Autowired
    private ContinenteController continenteController;

    @Autowired
    private StatiController statiController;

    @Autowired
    private TestController testController;

    @Autowired
    private Mapper<Citta, CittaDecorated> cittaMapper;



    @GetMapping("ContinenteByCategory_{id}")
    public List<Continente> getContinentiByCategory(@PathVariable("id") Long idCategoria) {
        return continenteController.getContinentiByCategory(idCategoria);
    }

    @GetMapping("/StatiByContinente_{id}")
    public List<Stato> getByContinente(@PathVariable("id") Long id) {
        return statiController.getByContinente(id);
    }

    @GetMapping("/StatiByContinente_{idContinente}/Category_{idCategory}")
    public List<Stato> getStatiByContinenteAndCategory(@PathVariable("idContinente") Long idContinente, @PathVariable("idCategory") Long idCategoria) {
        return statiController.getStatiByContinenteAndCategory(idContinente, idCategoria);
    }

    @GetMapping("CitiesByState_{id}")
    public List<CittaDecorated> getCitiesByState(@PathVariable("id") Long idStato) {
        return cittaController.getCitiesForState(idStato)
                .stream()
                .map(cittaMapper)
                .collect(Collectors.toList());
    }

    /**
     * Ritorna un array di città con il flag enabled impostato a seconda se l'utente può accedere o meno ad una determinata categoria di test
     * per un certo livello
     * @param request Oggetto che incapsula User e Stato
     * @return
     */
    @PostMapping("CitiesAvailable")
    public List<CittaDecorated> getAvailableCities(@RequestBody RequestCities request) {
        User user = request.getUser();
        Stato stato = request.getStato();

        List<CittaDecorated> sureAvailable = getCitiesByState(stato.getId()).stream().filter((citta) -> citta.getTest().getLivello() <= user.getLivello()).collect(Collectors.toList());

        // Tutte le città che hanno livello <= del livello utente sono abilitate sicuramente
        sureAvailable
                .forEach((citta) -> citta.setEnabled(true));

        // Tutte le città che hanno livello > del livello dell'utente potrebbero essere abilitate se l'utente ha completato i
        // test della stessa categoria ma di livello inferiore.
        // Ottieni quindi la lista di città che potrebbero essere abilitate
        List<CittaDecorated> maybeAvailable = getCitiesByState(stato.getId())
                .stream()
                .filter((citta) -> citta.getTest().getLivello() > user.getLivello())
                .collect(Collectors.toList());


        // Per ogni città da verificare
        maybeAvailable.stream().forEach((citta) -> {

            int level = citta.getTest().getLivello() - 1;                   // i test completati devono essere quelli del livello inferiore
            long idCategoria = citta.getTest().getCategoria().getId();      // i test devono appartenere alla stessa categoria della città
            String username = user.getUsername();                           // la verifica si attua per l'utete specificato

            int remainingTests = testController.getRemainingTest(username, level, idCategoria); // conta i test rimanenti
            // se il numero di test rimanenti per quella categoria per il livello inferiore per l'utente specificato è pari a 0, allora l'utente
            // ha accesso alla città
            if(remainingTests == 0) {
                citta.setEnabled(true);
            } else {
                citta.setEnabled(false);
            }
        });


        // unisci le due liste
        List<CittaDecorated> toAdd = new ArrayList<>();
        maybeAvailable.stream()
                .filter(CittaDecorated::getEnabled)
                .forEach(citta -> {
                    if(sureAvailable.stream().noneMatch((cittaSure) -> cittaSure.getId().equals(citta.getId()))) {
                        toAdd.add(citta);
                    }
                });

        sureAvailable.addAll(toAdd);
        return sureAvailable;
    }
}
