package com.contrader.contraininggame.repository;

import com.contrader.contraininggame.model.Domanda;
import com.contrader.contraininggame.model.Test;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
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

    @Query("SELECT d from Test t inner join Domanda d on d.test = t and t.id = ?1")
    List<Domanda> getDomandeOfTest(Long idTest);

    @Query(value = "select count(*) from test", nativeQuery = true)
    Integer countTest();

    @Query(value = "select count(*) from test where livello = ?1", nativeQuery = true)
    Integer countTest(Integer level);


    @Query(value = "select distinct test.id, test.nome, test.livello, test.descrizione, test.idcategoria " +
            "from test " +
            "join domanda on domanda.idtest = test.id " +
            "join risposta_domanda on risposta_domanda.id_domanda = domanda.id " +
            "join risposta_utente on risposta_utente.id_risposta = risposta_domanda.id " +
            "join user on user.username like risposta_utente.id_utente " +
            "where user.username like ?1 " +
            "group by insertdate, test.id " +
            "having (sum(risposta_domanda.corretta)*100/count(*)) >= 60", nativeQuery = true)
    List<Test> TestDoneForUser(String username);

    @Query(value = "select distinct test.id, test.nome, test.livello, test.descrizione, test.idcategoria " +
            "from test " +
            "join domanda on domanda.idtest = test.id " +
            "join risposta_domanda on risposta_domanda.id_domanda = domanda.id " +
            "join risposta_utente on risposta_utente.id_risposta = risposta_domanda.id " +
            "join user on user.username like risposta_utente.id_utente " +
            "where user.username like ?1 and test.livello = ?2 " +
            "group by insertdate, test.id " +
            "having (sum(risposta_domanda.corretta)*100/count(*)) >= 60", nativeQuery = true)
    List<Test> TestDoneForUser(String username, Integer testLevel);

    @Query(value = "select test.id, test.nome, test.livello, test.descrizione, test.idcategoria " +
            "from test where test.id not in (" +
            "select distinct test.id " +
            "from test " +
            "join domanda on domanda.idtest = test.id " +
            "join risposta_domanda on risposta_domanda.id_domanda = domanda.id " +
            "join risposta_utente on risposta_utente.id_risposta = risposta_domanda.id " +
            "join user on user.username like risposta_utente.id_utente " +
            "where user.username like ?1 " +
            "group by insertdate, test.id " +
            "having (sum(risposta_domanda.corretta)*100/count(*)) >= 60)", nativeQuery = true)
    List<Test> testNotDoneForUser(String username);

    @Query(value = "select test.id, test.nome, test.livello, test.descrizione, test.idcategoria " +
            "from test where test.livello = ?2 and test.id not in (" +
            "select distinct test.id " +
            "from test " +
            "join domanda on domanda.idtest = test.id " +
            "join risposta_domanda on risposta_domanda.id_domanda = domanda.id " +
            "join risposta_utente on risposta_utente.id_risposta = risposta_domanda.id " +
            "join user on user.username like risposta_utente.id_utente " +
            "where user.username like ?1 and test.livello = ?2 " +
            "group by insertdate, test.id " +
            "having (sum(risposta_domanda.corretta)*100/count(*)) >= 60)", nativeQuery = true)
    List<Test> testNotDoneForUser(String username, Integer testLevel);


}
