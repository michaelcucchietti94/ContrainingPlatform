package com.contrader.contraininggame.repository;

import com.contrader.contraininggame.model.Categoria;
import com.contrader.contraininggame.model.Domanda;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public interface DomandaRepository extends CrudRepository<Domanda, Long> {


    List<Domanda> getAllByCategoria(Categoria c);
}
