package com.contrader.contraininggame.service.interfaces;

import java.util.Optional;

public interface ReadableService<Model, KeyType> {
    Iterable<Model> getAll();
    Optional<Model> read(KeyType id);
}
