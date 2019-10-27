package com.contrader.contraininggame.model.training.data;

import com.contrader.contraininggame.model.training.TestoTraining;
import org.springframework.stereotype.Component;

public class TestoTrainingMedieParole extends TestoTraining {
    public TestoTrainingMedieParole() {
        this.setTesto("Questo testo contiene un numero discreto di parole.\n" +
                "Circa un centinaio o poco più, magari sono lunghe magari sono molto corte, come 'in', oppure 'precipitevolissimevolmente'.\n" +
                "Attualmente siamo a circa 20, o fore poco più, ma noi vogliamo continuare ancora un po'.\n" +
                "In realtà non sapreo come continuare, ma ci provo lo stesso. Cominciamo nel riproporre un noiosissimo e atrocemente noto\n" +
                "scioglilingua: sopra la panca la capra campa, sotto la panca la capra crepa. O ancora:\n" +
                "Apelle figlio di apollo fece una palla di pelle di pollo, tutti i pesci vennero a galla per vedere la palla di pelle di pollo\n" +
                "fatta da apelle figlio di apollo. Non temere lettore, abbiamo quasi terminato." +
                "Una freddura al volo: cosa succede se tagli un CD? lo DVD? ... ok basta");
    }
}
