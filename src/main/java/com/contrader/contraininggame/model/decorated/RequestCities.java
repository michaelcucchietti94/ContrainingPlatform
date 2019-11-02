package com.contrader.contraininggame.model.decorated;

import com.contrader.contraininggame.model.Stato;
import com.contrader.contraininggame.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RequestCities {
    User user;
    Stato stato;
}