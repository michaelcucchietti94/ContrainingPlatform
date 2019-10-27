package com.contrader.contraininggame.controller;

import com.contrader.contraininggame.model.Stato;
import com.contrader.contraininggame.model.Stato;
import com.contrader.contraininggame.service.StatesService;


class StatiController extends AbstractController<Stato, Long> {
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


    /* PRIVATE METHODS */
    private void setData() {
        StatesService s = (StatesService)this.service;
        s.initStati();
    }
}
