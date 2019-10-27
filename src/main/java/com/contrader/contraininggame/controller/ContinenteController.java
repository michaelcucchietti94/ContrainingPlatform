package com.contrader.contraininggame.controller;

import com.contrader.contraininggame.model.Continente;
import com.contrader.contraininggame.service.ContinenteService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


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


    /* PRIVATE METHODS */
    private void setData() {
        ContinenteService s = (ContinenteService)this.service;
        s.initContinenti();
    }
}
