package com.contrader.contraininggame.controller.gamemapsubcontrollers;

import com.contrader.contraininggame.controller.AbstractController;
import com.contrader.contraininggame.controller.DBInitializable;
import com.contrader.contraininggame.model.Continente;
import com.contrader.contraininggame.service.ContinenteService;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/*
@RestController
@RequestMapping("continenti")
@CrossOrigin(origins = "http://localhost:4200")*/
@Component
public class ContinenteController extends AbstractController<Continente, Long> implements DBInitializable {
    @Override
    public Iterable<Continente> getAll() {
        initializeData();
        return super.getAll();
    }

    @Override
    public void update(Continente m) {
        // do nothing
    }

    @Override
    public void insert(Continente m) {
        // do nothing
    }

    @Override
    public void delete(Long id) {
        // do nothing
    }

    @Override
    public Continente read(Long key) {
        initializeData();
        return super.read(key);
    }

    /* SPECIFIC METHODS */
    @GetMapping("byCategory_{id}")
    public List<Continente> getContinentiByCategory(@PathVariable("id") Long idCategoria) {
        return ((ContinenteService)service).getContinentiByCategory(idCategoria);
    }

    /* INITIALIZATION */
    public void initializeData() {
        ContinenteService s = (ContinenteService)this.service;
        s.initContinenti();
    }
}
