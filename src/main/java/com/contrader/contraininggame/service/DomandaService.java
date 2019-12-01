package com.contrader.contraininggame.service;

import com.contrader.contraininggame.model.Categoria;
import com.contrader.contraininggame.model.Domanda;
import com.contrader.contraininggame.repository.DomandaRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DomandaService extends DefaultService<Domanda, Long> {

    public List<Domanda> getDomandeByCategory(Categoria c) {
        return ((DomandaRepository)repository).getAllByCategoria(c);
    }

    public List<Domanda> getRandomDomandeByCategory(Categoria c, Integer level) {
        List<Domanda> all = getDomandeByCategory(c).stream().filter(d -> d.getLevel().equals(level)).collect(Collectors.toList());
        List<Domanda> result = new ArrayList<>();

        int n = Math.min(all.size(), 3);
        for(int i = 0; i < n; i++) {
            int index = (int)(Math.random()*all.size());
            result.add(all.remove(index));
        }

        return result;
    }
}
