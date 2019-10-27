package com.contrader.contraininggame.repository;

import com.contrader.contraininggame.model.Citta;
import com.contrader.contraininggame.model.Continente;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public interface CittaRepository extends CrudRepository<Citta, Long> {

}
