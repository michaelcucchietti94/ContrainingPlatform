package com.contrader.contraininggame.repository;

import com.contrader.contraininggame.model.game.Territorio;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public interface TerritoriRepository extends CrudRepository<Territorio, Long> {
    @Query(value = "Select * from territorio TCONF where TCONF.id in (select C.id_territorio2 from Territorio T JOIN confine C ON C.id_territorio1 = T.id where T.id = ?1)", nativeQuery = true)
    List<Territorio> getTerritoriConfinanti(Long idTerritorio);


    Territorio getById(Long id);
}
