package com.contrader.contraininggame.service.training;

import com.contrader.contraininggame.model.training.TempoTesto;
import com.contrader.contraininggame.repository.training.TempoTestoRepository;
import com.contrader.contraininggame.service.DefaultService;
import com.contrader.contraininggame.utils.mappers.training.TrainingSampleMapper;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

@Service
public class TempoTestoService extends DefaultService<TempoTesto, Long> {

    private Double getNumberValue(List<Object[]> queryResult) {
        if(queryResult != null && queryResult.size() == 1) {
            Object[] objRow = queryResult.get(0);
            if(objRow != null && objRow.length == 1) {
                Object objColumn = objRow[0];
                if(objColumn instanceof BigDecimal) {
                    BigDecimal b = (BigDecimal)objColumn;
                    return b.doubleValue();
                } else if(objColumn instanceof BigInteger) {
                    BigInteger b = (BigInteger)objColumn;
                    return b.doubleValue();
                }
            }
        }
        return null;
    }

    /**
     * Esegue la somma del rapporto tra secondi e parole
     * @return
     */
    private Double getSomma() {
        TempoTestoRepository repo = (TempoTestoRepository)repository;
        List<Object[]> tempoTotaleObj = repo.getSumOfSamples();
        return getNumberValue(tempoTotaleObj);
    }

    /**
     * Ritorna il numero di righe (numero di campioni)
     * @return
     */
    private Double getRowCount() {
        TempoTestoRepository repo = (TempoTestoRepository)repository;
        List<Object[]> rowCount = repo.getNumberOfElements();
        return getNumberValue(rowCount);
    }


    public double caluclateMedia() {
        Double t = getSomma();
        if(t == null)
            return 0;


        Double n = getRowCount();
        if(n == null)
            return 0;


        return t / n;
    }

    public double calculateVarianza() {
        double media = caluclateMedia();

        if(media == 0)
            return 0;

        // Calcola i campioni al quadrato
        ArrayList<Double> quadrati = new ArrayList<>();
        TempoTestoRepository repo = (TempoTestoRepository)repository;
        List<Object[]> samples = repo.getSamples();
        // traduce in double e per ogni sample (double) ne calcola il quadrato e lo aggiunge alla lista
        samples.stream().map(new TrainingSampleMapper()).forEach((d) -> {
            quadrati.add(Math.pow(d, 2));
        });


        // calcola la varianza
        double[] quadratiEstimated = {0};
        quadrati.forEach((q) -> {
            quadratiEstimated[0] += q/quadrati.size();
        });

        quadratiEstimated[0] -= Math.pow(media, 2);

        return quadratiEstimated[0];
    }

    public double calcolaMediaPer(Long numeroParole) {
        return caluclateMedia() * (double)numeroParole;
    }

    public double calcolaVarianzaPer(Long numeroParole) {
        return calculateVarianza() * Math.pow(numeroParole, 2);
    }
}
