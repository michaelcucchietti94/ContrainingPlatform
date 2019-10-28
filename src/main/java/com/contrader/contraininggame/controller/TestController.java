package com.contrader.contraininggame.controller;

import com.contrader.contraininggame.model.Test;
import com.contrader.contraininggame.service.TestService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
@CrossOrigin(origins = "http://localhost:4200")
public class TestController extends AbstractController<Test, Long> {

    Integer getRemainingTest(String username, Integer livello, Long idCategoria) {
        return ((TestService)service).getRemainingTestFor(username, livello, idCategoria);
    }
}
