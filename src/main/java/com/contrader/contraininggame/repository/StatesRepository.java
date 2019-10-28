package com.contrader.contraininggame.repository;

import com.contrader.contraininggame.model.Continente;
import com.contrader.contraininggame.model.Stato;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public interface StatesRepository extends CrudRepository<Stato, Long> {

    @Query(value = "Select s.id, s.nome, s.id_continente from Stato s where s.id_continente = ?1", nativeQuery = true)
    List<Stato> getStatiByContinente(Long idContinente);

    @Query(value = "select stato.id, stato.nome, stato.id_continente from continente c " +
            "join stato on c.id = stato.id_continente " +
            "join citta on citta.id_stato = stato.id " +
            "join test on citta.idtest = test.id " +
            "join categoria on categoria.id = test.idcategoria " +
            "where categoria.id = ?2 and c.id = ?1 " +
            "group by categoria.argomento", nativeQuery = true)
    List<Stato> getStatiByContinenteAndCategory(Long idContinente, Long idCategoria);
}
