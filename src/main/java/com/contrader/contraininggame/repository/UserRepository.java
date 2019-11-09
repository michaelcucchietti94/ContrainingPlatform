package com.contrader.contraininggame.repository;

import com.contrader.contraininggame.model.User;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;

@Repository
@Transactional
public interface UserRepository extends CrudRepository<User, Long> {

    @Query("SELECT u FROM User u where username like ?1 and password like ?2")
    User authenticate(String username, String password);

    @Query(value = "SELECT u.username, sum(question_score) as score FROM User u INNER JOIN Risposta_Utente ru ON u.username like ru.id_utente GROUP BY u.username ORDER BY score DESC", nativeQuery = true)
    List<Object[]> getRankings();

    @Query(value = "SELECT u.username, sum(question_score) as score FROM User u INNER JOIN Risposta_Utente ru ON u.username like ru.id_utente where username like ?1 GROUP BY u.username", nativeQuery = true)
    Object[] getUserRanking(String username);

    @Query(value = "SELECT u.username, sum(question_score) as score FROM User u LEFT JOIN Risposta_Utente ru ON u.username like ru.id_utente where ru.insertdate > DATE_ADD(curdate(), INTERVAL -1 DAY) group by u.username ORDER BY score DESC", nativeQuery = true)
    List<Object[]> getDailyRanking();

    @Query(value = "SELECT u.username, sum(question_score) as score From User u LEFT Join Risposta_utente ru on u.username like ru.id_utente where ru.insertdate > DATE_ADD(curdate(), INTERVAL -7 DAY) group by u.username order by score desc", nativeQuery = true)
    List<Object[]> getWeeklyRanking();

    @Query(value = "select u.username, sum(question_score) as score from User u LEFT join Risposta_utente ru on u.username like ru.id_utente where u.livello = ?1 group by u.username order by score DESC", nativeQuery = true)
    List<Object[]> getLevelRanking(Integer level);

    @Query("select u from User u where u.livello = ?1")
    List<User> getUserByLevel(Long level);

    @Modifying
    @Query(value = "update user set first_access = false where username like ?1", nativeQuery = true)
    void setAccessed(String username);

}
