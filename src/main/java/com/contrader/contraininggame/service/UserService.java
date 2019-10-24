package com.contrader.contraininggame.service;

import com.contrader.contraininggame.model.User;
import com.contrader.contraininggame.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService extends DefaultService<User, Long> {

    public User authenticate(String username, String password) {
        UserRepository repo = (UserRepository)this.repository;

        return repo.authenticate(username, password);
    }


}
