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

    @Query("SELECT c from Citta c where id_stato = ?1")
    List<Citta> getCitiesInState(Long idStato);
}
