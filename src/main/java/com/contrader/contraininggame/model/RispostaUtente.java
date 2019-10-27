package com.contrader.contraininggame.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@IdClass(RispostaUtenteKey.class)
public class RispostaUtente implements Serializable {
    @Id
    @ManyToOne
    @JoinColumn(name="idRisposta")
    private RispostaDomanda risposta;

    @Id
    @ManyToOne
    @JoinColumn(name="idUtente")
    private User user;


    private Long questionScore;
    private LocalDate insertdate = LocalDate.now();
    private Long secondsForAnswering;

}
