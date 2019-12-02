package com.contrader.contraininggame.model.training;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class TestoTraining {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    @Column(length = 3000)
    private String testo;

    public TestoTraining clona() {
        return new TestoTraining(Id, testo);
    }
}
