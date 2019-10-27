package com.contrader.contraininggame.model.training.data;

import com.contrader.contraininggame.model.training.TestoTraining;
import org.springframework.stereotype.Component;


public class TestoTrainingPocheParole extends TestoTraining {
    public TestoTrainingPocheParole() {
        this.setTesto("Questo testo contiene poche parole.\n" +
                "Circa una ventina o trentina, magari sono lunghe magari sono corterrime, come 'in'.\n" +
                "Attualmente siamo a circa 20, o fore poco più.");
    }
}
