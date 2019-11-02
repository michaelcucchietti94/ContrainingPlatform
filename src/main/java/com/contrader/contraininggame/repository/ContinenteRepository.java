package com.contrader.contraininggame.repository;

import com.contrader.contraininggame.model.Continente;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public interface ContinenteRepository extends CrudRepository<Continente, Long> {

    @Query(value = "select c.id, c.nome from continente c join continent_piece cp on c.id = cp.id_continente " +
            "join stato on stato.id_continent_piece = cp.id " +
            "join test on stato.idtest = test.id " +
            "join categoria on categoria.id = test.idcategoria " +
            "where categoria.id = ?1 " +
            "group by c.id", nativeQuery = true)
    List<Continente> getContinentiByCategory(Long idCategoria);


}
