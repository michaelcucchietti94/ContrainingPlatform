package com.contrader.contraininggame.repository;

import com.contrader.contraininggame.model.RispostaDomanda;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public interface RispostaDomandaRepository extends CrudRepository<RispostaDomanda, Long> {

    @Query(value = "SELECT * from risposta_domanda where id_domanda = ?1", nativeQuery = true)
    List<RispostaDomanda> getByDomanda(Long idDomanda);
}
