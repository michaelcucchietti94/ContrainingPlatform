package com.contrader.contraininggame.service;

import com.contrader.contraininggame.model.Regola;
import org.springframework.stereotype.Service;

@Service
public class TutorialService extends DefaultService<Regola, Long> {
    @Override
    public Regola insert(Regola dto) {
        return null;
    }

    @Override
    public Regola update(Regola dto) {
         return null;
    }

    @Override
    public void delete(Long id) {
        // Do nothing
    }
}
