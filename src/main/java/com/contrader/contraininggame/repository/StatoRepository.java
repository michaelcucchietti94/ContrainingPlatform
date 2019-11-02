package com.contrader.contraininggame.repository;

import com.contrader.contraininggame.model.Stato;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public interface StatoRepository extends CrudRepository<Stato, Long> {

    @Query("SELECT s from Stato s where id_continent_piece = ?1")
    List<Stato> getStatiByContinentPiece(Long idContinentPiece);
}
