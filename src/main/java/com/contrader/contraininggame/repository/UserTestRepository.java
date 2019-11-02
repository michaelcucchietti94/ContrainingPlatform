package com.contrader.contraininggame.repository;

import com.contrader.contraininggame.model.test.UserTest;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class UserTestRepository implements IUserTestRepository{
    private Map<String, UserTest> usermap = new HashMap<>();

    public UserTest getTest(String username) {
        return usermap.get(username);
    }

    public void addTest(String username) {
        if(usermap.containsKey(username))
            return;

        usermap.put(username, new UserTest());
    }

    public void removeTest(String username) {
        if(!usermap.containsKey(username))
            return;

        usermap.remove(username);
    }
}
