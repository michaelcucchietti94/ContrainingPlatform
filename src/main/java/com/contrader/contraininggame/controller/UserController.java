package com.contrader.contraininggame.controller;

import com.contrader.contraininggame.model.LoginCredentials;
import com.contrader.contraininggame.model.User;
import com.contrader.contraininggame.service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController extends AbstractController<User, Long> {

    @PostMapping("/login")
    public User login(@RequestBody LoginCredentials loginCredentials) {
        UserService uService = (UserService)service;
        return uService.authenticate(loginCredentials.getUsername(), loginCredentials.getPassword());
    }
}
