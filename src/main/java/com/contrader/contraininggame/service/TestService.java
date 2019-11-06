package com.contrader.contraininggame.service;

import com.contrader.contraininggame.model.Domanda;
import com.contrader.contraininggame.model.Test;
import com.contrader.contraininggame.repository.TestRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TestService extends DefaultService<Test, Long> {

    public Integer getRemainingTestFor(String username, Integer livello, Long idCategoria) {
        TestRepository repo = (TestRepository)repository;
        return repo.countRemainingTest(username, livello, idCategoria);
    }

    public List<Domanda> getDomandeOfTest(Long idTest) {
        return ((TestRepository)repository).getDomandeOfTest(idTest);
    }

    public Integer countTest() {
        return ((TestRepository)repository).countTest();
    }
    public Integer countTest(Integer livello) {
        return ((TestRepository)repository).countTest(livello);
    }

    public List<Test> testDoneForUser(String username) {
        return ((TestRepository)repository).TestDoneForUser(username);
    }
    public List<Test> testDoneForUser(String username, Integer livello) {
        return ((TestRepository)repository).TestDoneForUser(username, livello);
    }

    public List<Test> testNotDoneForUser(String username) {
        return ((TestRepository)repository).testNotDoneForUser(username);
    }

    public List<Test> testNotDoneForUser(String username, Integer livello) {
        return ((TestRepository)repository).testNotDoneForUser(username, livello);
    }


}
