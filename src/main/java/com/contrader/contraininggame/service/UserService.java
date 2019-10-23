package com.contrader.contraininggame.service;

import com.contrader.contraininggame.exceptions.AlreadyLoggedInException;
import com.contrader.contraininggame.model.User;
import com.contrader.contraininggame.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService extends DefaultService<User, Long> {
    private User loggedUser;

    public boolean authenticate(String username, String password) throws AlreadyLoggedInException {
        if(loggedUser != null)
            throw new AlreadyLoggedInException();

        UserRepository repo = (UserRepository)this.repository;

        User user = repo.authenticate(username, password);
        if(user == null)
            return false;

        this.loggedUser = user;
        return true;
    }

}
