package com.contrader.contraininggame.service;

import com.contrader.contraininggame.model.Ranking;
import com.contrader.contraininggame.model.User;
import com.contrader.contraininggame.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService extends DefaultService<User, Long> {

    public User authenticate(String username, String password) {
        UserRepository repo = (UserRepository)this.repository;

        return repo.authenticate(username, password);
    }

    public List<Ranking> getRankings() {
        UserRepository repo = (UserRepository)this.repository;
        List<Object[]> rankingObjects = repo.getRankings();

        List<Ranking> results = new ArrayList<>();

        rankingObjects.forEach((o) -> {
            Ranking r = Ranking.createFromRepoObject(o);
            if(r != null)
                results.add(r);
        });

        return results;
    }

    /*public Ranking getUserRanking(String username) {
        UserRepository repo = (UserRepository)this.repository;

        return Ranking.createFromRepoObject(repo.getUserRanking(username));
    }*/

}
