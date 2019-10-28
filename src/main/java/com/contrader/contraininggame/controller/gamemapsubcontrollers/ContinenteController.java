package com.contrader.contraininggame.controller.gamemapsubcontrollers;

import com.contrader.contraininggame.controller.AbstractController;
import com.contrader.contraininggame.model.Continente;
import com.contrader.contraininggame.service.ContinenteService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/*
@RestController
@RequestMapping("continenti")
@CrossOrigin(origins = "http://localhost:4200")*/
class ContinenteController extends AbstractController<Continente, Long> {
    @Override
    public Iterable<Continente> getAll() {
        setData();
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
        setData();
        return super.read(key);
    }

    /* SPECIFIC METHODS */
    @GetMapping("byCategory_{id}")
    public List<Continente> getContinentiByCategory(@PathVariable("id") Long idCategoria) {
        return ((ContinenteService)service).getContinentiByCategory(idCategoria);
    }

    /* PRIVATE METHODS */
    private void setData() {
        ContinenteService s = (ContinenteService)this.service;
        s.initContinenti();
    }
}
