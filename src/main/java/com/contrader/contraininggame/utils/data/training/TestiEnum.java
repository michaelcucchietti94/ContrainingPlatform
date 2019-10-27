package com.contrader.contraininggame.utils.data.training;

import com.contrader.contraininggame.model.training.TestoTraining;

public enum TestiEnum {
    CORTO(Testi.corto.clona()),
    MEDIO(Testi.medio.clona()),
    LUNGO(Testi.lungo.clona());

    private TestoTraining testo;

    private TestiEnum(TestoTraining c) {
        this.testo = c;
    }
    public TestoTraining getTesto() {
        return testo;
    }
}
