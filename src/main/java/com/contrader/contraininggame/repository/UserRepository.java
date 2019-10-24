package com.contrader.contraininggame.repository;

import com.contrader.contraininggame.model.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public interface UserRepository extends CrudRepository<User, Long> {

    @Query("SELECT u FROM User u where username like ?1 and password like ?2")
    User authenticate(String username, String password);

    @Query(value = "SELECT u.username, sum(question_score) as score FROM User u INNER JOIN Risposta_Utente ru ON u.username like ru.id_utente GROUP BY u.username ORDER BY score DESC", nativeQuery = true)
    List<Object[]> getRankings();

    //@Query("SELECT u, sum(question_score) as score FROM User u INNER JOIN RispostaUtente ru ON u.username like ru.id_utente where username like ?1 GROUP BY u")
    //Object[] getUserRanking(String username);
}
