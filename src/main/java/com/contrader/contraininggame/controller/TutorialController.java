package com.contrader.contraininggame.controller;

import com.contrader.contraininggame.model.Regola;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/tutorial")
@CrossOrigin(origins = "http://localhost:4200")
public class TutorialController extends AbstractController<Regola, Long> {
    @Override
    public void update(Regola m) {
        // do nothing
    }

    @Override
    public void insert(Regola m) {
        // do nothing
    }

    @Override
    public void delete(Long id) {
        // do nothing
}

    @Override
    public Regola read(Long key) {
        return null;
    }
}
