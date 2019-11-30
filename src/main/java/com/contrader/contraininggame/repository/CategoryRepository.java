package com.contrader.contraininggame.repository;

import com.contrader.contraininggame.model.Categoria;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public interface CategoryRepository extends CrudRepository<Categoria, Long> {
    List<Categoria> getCategoriaByArgomento(String argomento);
}
