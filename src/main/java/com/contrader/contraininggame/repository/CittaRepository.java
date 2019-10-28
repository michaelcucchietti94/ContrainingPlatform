package com.contrader.contraininggame.repository;

import com.contrader.contraininggame.model.Citta;
import com.contrader.contraininggame.model.Continente;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public interface CittaRepository extends CrudRepository<Citta, Long> {

    /*@Query("SELECT c.id, c.name, c.id_stato, c.idtest")
    List<Citta> getCitiesInState(Long idStato);*/
}
