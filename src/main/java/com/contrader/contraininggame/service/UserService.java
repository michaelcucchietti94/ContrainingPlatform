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

    public User authenticate(String username, String password) {
        UserRepository repo = (UserRepository)this.repository;

        return repo.authenticate(username, password);
    }

    public List<Ranking> getRankings() {
        UserRepository repo = (UserRepository)this.repository;
        List<Object[]> rankingObjects = repo.getRankings();

        return map(rankingObjects);
    }

    public Ranking getUserRanking(String username) {
        UserRepository repo = (UserRepository)this.repository;
        return Ranking.createFromRepoObject(repo.getUserRanking(username));
    }

    public List<Ranking> getDailyRanking() {
        UserRepository repo = (UserRepository)this.repository;
        List<Object[]> rankings = repo.getDailyRanking();
        return map(rankings);
    }
    public List<Ranking> getWeeklyRanking() {
        UserRepository repo = (UserRepository)this.repository;
        List<Object[]> rankings = repo.getWeeklyRanking();
        return map(rankings);
    }
    public List<Ranking> getLevelRanking(Integer level) {
        UserRepository repo = (UserRepository)this.repository;
        List<Object[]> rankings = repo.getLevelRanking(level);
        return map(rankings);
    }




    /* PRIVATE METHODS */
    private List<Ranking> map(List<Object[]> objects) {
        return objects.stream().map(rankingMapper).collect(Collectors.toList());
    }
}
