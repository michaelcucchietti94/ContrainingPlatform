package com.contrader.contraininggame.controller.training;

import com.contrader.contraininggame.model.training.TempoTesto;
import com.contrader.contraininggame.model.training.TestoTraining;
import com.contrader.contraininggame.service.training.TempoTestoService;
import com.contrader.contraininggame.service.training.TestoTrainingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/training")
@CrossOrigin(origins = "http://localhost:4200")
public class TrainingController {
    @Autowired
    private TestoTrainingService testiService;
    @Autowired
    private TempoTestoService tempiService;


    @GetMapping("/getTexts")
    public Iterable<TestoTraining> getAllTexts() {
        testiService.initTesti();
        return testiService.getAll();
    }

    @PostMapping("/setTiming")
    public void setTempoForText(@RequestBody TempoTesto timing) {
        tempiService.insert(timing);
    }


    @GetMapping("/getMedia_{numeroParole}")
    public Double getMedia(@PathVariable("numeroParole") Long numeroParole) {
        double media = Math.round(tempiService.calcolaMediaPer(numeroParole)*100)/100.0;
        return media;
    }

    @GetMapping("/getScarto_{numeroParole}")
    public Double getScarto(@PathVariable("numeroParole") Long numeroParole) {
        double varianza = tempiService.calcolaVarianzaPer(numeroParole);
        return Math.round(Math.pow(varianza, 0.5)*100)/100.0;
    }




}
