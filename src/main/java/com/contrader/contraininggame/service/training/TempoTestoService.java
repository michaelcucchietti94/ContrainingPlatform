package com.contrader.contraininggame.service.training;

import com.contrader.contraininggame.model.training.TempoTesto;
import com.contrader.contraininggame.repository.training.TempoTestoRepository;
import com.contrader.contraininggame.service.DefaultService;
import com.contrader.contraininggame.utils.datastructures.SyncQueue;
import com.contrader.contraininggame.utils.mappers.training.TrainingSampleMapper;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

@Service
public class TempoTestoService extends DefaultService<TempoTesto, Long> {

    private SyncQueue<TempoTesto> queue = new SyncQueue<>();
    private Thread dataManager = null;
    private double media = 0;
    private double varianza = 0;
    private double count = 0;
    
    /* GETTER & SETTER */
    private synchronized double getMedia() {
        return media;
    }
    private synchronized void setMedia(double media) {
        this.media = media;
    }
    private synchronized double getVarianza() {
        return varianza;
    }
    private synchronized void setVarianza(double varianza) {
        this.varianza = varianza;
    }
    private synchronized double getCount() {
        return count;
    }
    private synchronized void setCount(double count) {
        this.count = count;
    }

    /* METODI PRIVATI PER IL CALCOLO DEI VALORI */
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
        double number = getNumberValue(rowCount);
        setCount((long)number);
        return number;
    }
    private void updateMedia() {
        Double t = getSomma();
        if(t == null)
            return;


        Double n = getRowCount();
        if(n == null)
            return;

        this.setMedia(t/n);
    }
    private void updateVarianza() {
        double media = getMedia();

        if(media == 0)
            return;

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

        this.setVarianza(quadratiEstimated[0]);
    }

    /* METODI PRIVATI PER LA GESTIONE DEI DATI */
    private void initializeThread() {
        this.dataManager = new Thread(() -> {
            while(true) {
                double size = (double)queue.queueSize();
                if(size >= 100 || getCount() == 0 || size/getCount() >= 0.1) {
                    // se il numero di elementi in coda è maggiore di 100 oppure è maggiore del 10% del numero totale
                    // di elementi esistenti
                    // ALLORA svuota la coda e aggiorna i valori

                    while(queue.queueSize() > 0) {
                        this.insert(queue.get());
                    }

                    // Ora la coda è vuota, quindi aggiorna i valori
                    try {
                        updateMedia();
                        updateVarianza();
                    } catch(Exception e) {
                        // do nothing
                    }
                }

                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    // Do nothing
                }
            }
        });
    }

    /* COSTRUTTORE */
    public TempoTestoService() {
        initializeThread();
        this.dataManager.start();
    }

    /* METODI PUBBLICI PER L'USO FINALE */
    public double calcolaMediaPer(Long numeroParole) {
        if(getMedia() == 0)
            updateMedia();

        return getMedia() * (double)numeroParole;
    }
    public double calcolaVarianzaPer(Long numeroParole) {
        if(getVarianza() == 0)
            updateVarianza();

        return getVarianza() * Math.pow(numeroParole, 2);
    }
    public void addToQueue(long parole, long seconds) {

        this.insert(parole, seconds);
    }


    /* CRUD */
    @Override
    public synchronized TempoTesto insert(TempoTesto dto) {
        return super.insert(dto);
    }
    private synchronized void insert(long parole, long seconds) {
        TempoTesto t = new TempoTesto();
        t.setSeconds(seconds);
        t.setParole(parole);
        this.insert(t);
    }
}
