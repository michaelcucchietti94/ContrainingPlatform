package com.contrader.contraininggame.repository;

import com.contrader.contraininggame.model.Test;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface TestRepository extends CrudRepository<Test, Long> {

    @Query(value = "select count(*) as TestRimanenti from test join categoria on categoria.id = test.idcategoria " +
            "where test.livello <= ?2 and categoria.id = ?3 and test.id not in " +
            "(select test.id " +
            "from test join categoria on test.idcategoria = categoria.id " +
            "join domanda on domanda.idtest = test.id " +
            "join risposta_domanda on risposta_domanda.id_domanda = domanda.id " +
            "join risposta_utente on risposta_utente.id_risposta = risposta_domanda.id " +
            "join user on user.username like risposta_utente.id_utente " +
            "where user.username like ?1 and categoria.id = ?3 " +
            "group by insertdate, test.id " +
            "having (sum(risposta_domanda.corretta)*100/count(*)) >= 60)", nativeQuery = true)
    Integer countRemainingTest(String username, Integer livello, Long idCategoria);
}
