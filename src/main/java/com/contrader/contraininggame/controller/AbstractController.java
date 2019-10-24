package com.contrader.contraininggame.controller;

import com.contrader.contraininggame.service.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

public abstract class AbstractController<Model, KeyType> {
    @Autowired
    protected Service<Model, KeyType> service;

    @GetMapping("/getall")
    public Iterable<Model> getAll() {
        return service.getAll();
    }

    @PutMapping("/update")
    public void update(@RequestBody Model m) {
        this.service.update(m);
    }

    @PostMapping("/insert")
    public void insert(@RequestBody Model m) {
        this.service.insert(m);
    }

    @DeleteMapping("/delete")
    public void delete(@RequestBody KeyType id) {
        this.service.delete(id);
    }

    @GetMapping("/read")
    public Model read(@RequestBody KeyType key) {
        Optional<Model> result = this.service.read(key);
        return result.orElse(null);

    }



}
