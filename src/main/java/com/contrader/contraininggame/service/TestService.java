package com.contrader.contraininggame.service;

import com.contrader.contraininggame.model.Test;
import com.contrader.contraininggame.repository.TestRepository;
import org.springframework.stereotype.Service;

@Service
public class TestService extends DefaultService<Test, Long> {

    public Integer getRemainingTestFor(String username, Integer livello, Long idCategoria) {
        TestRepository repo = (TestRepository)repository;
        return repo.countRemainingTest(username, livello, idCategoria);
    }
}
