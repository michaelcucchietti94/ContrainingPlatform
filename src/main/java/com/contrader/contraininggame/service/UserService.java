package com.contrader.contraininggame.service;

import com.contrader.contraininggame.model.Ranking;
import com.contrader.contraininggame.model.User;
import com.contrader.contraininggame.repository.UserRepository;
import com.contrader.contraininggame.utils.mappers.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService extends DefaultService<User, Long> {

     @Autowired
     private Mapper<Object[], Ranking> rankingMapper;

    /**
     * Permette di autenticare un utente. Tramite la combinazione username e password.
     * @param username nome utente da autenticare
     * @param password password utente da autenticare
     * @return User se l'autenticazione va a buon fine, altrimenti null
     */
    public User authenticate(String username, String password) {
        UserRepository repo = (UserRepository)this.repository;

        return repo.authenticate(username, password);
    }

    /**
     * Ottiene una classifica totale dei punti accumulati sin dal principio da parte di tutti gli utenti
     * @return una lista di ranks (username + score)
     */
    public List<Ranking> getRankings() {
        UserRepository repo = (UserRepository)this.repository;
        List<Object[]> rankingObjects = repo.getRankings();

        return map(rankingObjects);
    }

    /**
     * Ottiene il punteggio totale di un utente
     * @param username username dell'utente da cui leggere lo score
     * @return oggetto Ranking relativo all'utente specificato, o null se l'utente non esiste
     */
    public Ranking getUserRanking(String username) {
        UserRepository repo = (UserRepository)this.repository;
        return Ranking.createFromRepoObject(repo.getUserRanking(username));
    }

    /**
     * Ottiene una lista ordinata discendente di Ranking giornalieri
     * @return Lista di ranking ordinata
     */
    public List<Ranking> getDailyRanking() {
        UserRepository repo = (UserRepository)this.repository;
        List<Object[]> rankings = repo.getDailyRanking();
        return map(rankings);
    }

    /**
     * Ottiene una lista ordinata discendente di Ranking settimanali
     * @return Lista di ranking ordinata
     */
    public List<Ranking> getWeeklyRanking() {
        UserRepository repo = (UserRepository)this.repository;
        List<Object[]> rankings = repo.getWeeklyRanking();
        return map(rankings);
    }

    /**
     * Ottiene una lista ordinata discendente di Ranking per livello
     * @return Lista di ranking ordinata
     */
    public List<Ranking> getLevelRanking(Integer level) {
        UserRepository repo = (UserRepository)this.repository;
        List<Object[]> rankings = repo.getLevelRanking(level);
        return map(rankings);
    }

    /**
     * Ottiene una lista di utenti filtrati per livello
     * @param livello livello degli utenti da recuperare
     * @return lista di utenti
     */
    public List<User> getUsersByLevel(Long livello) {
        UserRepository repo = (UserRepository)this.repository;
        return repo.getUserByLevel(livello);
    }



    /* PRIVATE METHODS */
    private List<Ranking> map(List<Object[]> objects) {
        return objects.stream().map(rankingMapper).collect(Collectors.toList());
    }
}
