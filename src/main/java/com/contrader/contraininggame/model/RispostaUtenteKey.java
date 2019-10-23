package com.contrader.contraininggame.model;


import lombok.EqualsAndHashCode;

import java.io.Serializable;

@EqualsAndHashCode
public class RispostaUtenteKey implements Serializable {
    private RispostaDomanda risposta;
    private User user;
}
