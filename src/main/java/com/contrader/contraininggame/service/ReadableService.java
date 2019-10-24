package com.contrader.contraininggame.service;

import java.util.Optional;

public interface ReadableService<Model, KeyType> {
    Iterable<Model> getAll();
    Optional<Model> read(KeyType id);
}
