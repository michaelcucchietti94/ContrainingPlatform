package com.contrader.contraininggame.service;

import com.contrader.contraininggame.model.Categoria;
import com.contrader.contraininggame.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoriaService extends DefaultService<Categoria, Long> {

    public Categoria getCategoriaFromArgomento(String argomento) {
        List<Categoria> category = ((CategoryRepository)repository).getCategoriaByArgomento(argomento);
        return category.size() == 0 ? null : category.get(0);
    }
}
