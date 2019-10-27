package com.contrader.contraininggame.utils.data.training;

import com.contrader.contraininggame.model.training.TestoTraining;
import com.contrader.contraininggame.model.training.data.TestoTrainingLungoParole;
import com.contrader.contraininggame.model.training.data.TestoTrainingMedieParole;
import com.contrader.contraininggame.model.training.data.TestoTrainingPocheParole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class Testi {
    static TestoTraining corto = new TestoTrainingPocheParole();

    static TestoTraining medio = new TestoTrainingMedieParole();

    static TestoTraining lungo = new TestoTrainingLungoParole();
}
