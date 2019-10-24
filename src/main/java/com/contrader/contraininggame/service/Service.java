package com.contrader.contraininggame.service;

import java.util.Optional;

public interface Service<Model, KeyType> {
    Iterable<Model> getAll();

    Optional<Model> read(KeyType id);

    Model insert (Model dto);

    Model update (Model dto);

    void delete (KeyType id);

}
