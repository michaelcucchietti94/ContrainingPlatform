package com.contrader.contraininggame.repository;

import com.contrader.contraininggame.model.test.UserTest;

public interface IUserTestRepository {
    void addTest(String username);
    UserTest getTest(String username);
    void removeTest(String username);
}
