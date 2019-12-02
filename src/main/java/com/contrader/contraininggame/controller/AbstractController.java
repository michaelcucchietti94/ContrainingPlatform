package com.contrader.contraininggame.controller;

import com.contrader.contraininggame.service.interfaces.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

public abstract class AbstractController<Model, KeyType> {
    @Autowired
    protected Service<Model, KeyType> service;

    @GetMapping("/getAll")
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
    public void delete(@RequestParam KeyType id) {
    	System.out.print(id);
        this.service.delete(id);
    }

    @GetMapping("/read")
    public Model read(@RequestParam KeyType key) {
        Optional<Model> result = this.service.read(key);
        return result.orElse(null);

    }



}
