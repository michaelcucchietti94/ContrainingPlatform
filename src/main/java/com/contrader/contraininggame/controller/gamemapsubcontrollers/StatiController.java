package com.contrader.contraininggame.controller.gamemapsubcontrollers;

import com.contrader.contraininggame.controller.AbstractController;
import com.contrader.contraininggame.model.Stato;
import com.contrader.contraininggame.model.Stato;
import com.contrader.contraininggame.service.StatesService;
import com.contrader.contraininggame.service.UserService;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/* TESTING PROPOSE
@RestController
@RequestMapping("/states")
@CrossOrigin(origins = "http://localhost:4200")*/
@Component
public class StatiController extends AbstractController<Stato, Long> {
    @Override
    public Iterable<Stato> getAll() {
        setData();
        return super.getAll();
    }

    @Override
    public void update(Stato m) {
        // do nothing
    }

    @Override
    public void insert(Stato m) {
        // do nothing
    }

    @Override
    public void delete(Long id) {
        // do nothing
    }

    @Override
    public Stato read(Long key) {
        setData();
        return super.read(key);
    }

    /* METODI SPECIFICI */
    @GetMapping("/StatiByContinente_{id}")
    public List<Stato> getByContinente(@PathVariable("id") Long id) {
        StatesService sService = (StatesService)service;
        return sService.getStatiByContinente(id);

    }

    @GetMapping("/StatiByContinente_{idContinente}/Category_{idCategory}")
    public List<Stato> getStatiByContinenteAndCategory(@PathVariable("idContinente") Long idContinente, @PathVariable("idCategory") Long idCategoria) {
        return ((StatesService)service).getStatiByContinenteAndCategory(idContinente, idCategoria);
    }


    /* PRIVATE METHODS */
    private void setData() {
        StatesService s = (StatesService)this.service;
        s.initStati();
    }
}
