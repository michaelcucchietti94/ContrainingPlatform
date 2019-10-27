package com.contrader.contraininggame.repository;

import com.contrader.contraininggame.model.Continente;
import com.contrader.contraininggame.model.Stato;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public interface StatesRepository extends CrudRepository<Stato, Long> {
}
