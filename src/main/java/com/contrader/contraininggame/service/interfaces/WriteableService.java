package com.contrader.contraininggame.service.interfaces;

import java.util.Optional;

public interface WriteableService<Model, KeyType> {

    Model insert (Model dto);

    Model update (Model dto);

    void delete (KeyType id);
}
