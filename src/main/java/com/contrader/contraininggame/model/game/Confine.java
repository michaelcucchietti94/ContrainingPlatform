package com.contrader.contraininggame.model.game;

import com.sun.xml.bind.v2.model.core.ID;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Confine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name="idTerritorio1")
    private Territorio territorio1;

    @ManyToOne
    @JoinColumn(name="idTerritorio2")
    private Territorio territorio2;


}
