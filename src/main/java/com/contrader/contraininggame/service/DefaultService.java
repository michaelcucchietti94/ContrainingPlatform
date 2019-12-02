package com.contrader.contraininggame.service;

import com.contrader.contraininggame.service.interfaces.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public abstract class DefaultService<Model, KeyType> implements Service<Model, KeyType> {

    @Autowired
    protected CrudRepository<Model, KeyType> repository;

    @Override
    public Iterable<Model> getAll() {
        return repository.findAll();
    }

    @Override
    public Optional<Model> read(KeyType id) {
        return repository.findById(id);
    }

    @Override
    public Model insert(Model dto) {
        return repository.save(dto);
    }

    @Override
    public Model update(Model dto) {
        return repository.save(dto);
    }

    @Override
    public void delete(KeyType id) {
        repository.deleteById(id);
    }
}
