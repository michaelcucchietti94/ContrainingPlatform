package com.contrader.contraininggame.repository;

import com.contrader.contraininggame.model.RispostaDomanda;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface RispostaDomandaRepository extends CrudRepository<RispostaDomanda, Long> {

    @Query(value = "SELECT * from risposta_domanda where id_domanda = ?1", nativeQuery = true)
    List<RispostaDomanda> getByDomanda(Long idDomanda);
}
