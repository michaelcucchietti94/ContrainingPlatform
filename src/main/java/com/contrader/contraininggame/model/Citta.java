package com.contrader.contraininggame.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
public class Citta implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToOne
    @JoinColumn(name = "idStato")
    private Stato stato;

    @ManyToMany
    @JoinTable(
            name = "cittatests",
            joinColumns = {@JoinColumn(name = "idtest")},
            inverseJoinColumns = {@JoinColumn(name = "idCitta")}
    )
    private List<Test> tests;
}
