package com.contrader.contraininggame.service;

import java.util.Optional;

public interface Service<Model, KeyType> {
    Iterable<Model> getAll();

    Optional<Model> read(KeyType id);

    public Model insert (Model dto);

    public Model update (Model dto);

    public void delete (KeyType id);

}
