package com.contrader.contraininggame.repository;

import com.contrader.contraininggame.model.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
@Transactional
public interface UserRepository extends CrudRepository<User, Long> {

    @Query("SELECT u FROM User u where username like ?1 and password like ?2")
    User authenticate(String username, String password);
}
