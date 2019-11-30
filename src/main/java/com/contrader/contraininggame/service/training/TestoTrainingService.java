package com.contrader.contraininggame.service.training;

import com.contrader.contraininggame.model.training.TestoTraining;
import com.contrader.contraininggame.repository.training.TestoTrainingRepository;
import com.contrader.contraininggame.service.DefaultService;
import com.contrader.contraininggame.utils.data.training.TestiEnum;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class TestoTrainingService extends DefaultService<TestoTraining, Long> {
    private boolean emptyCache = true;

    private boolean isEmpty() {
        return ((List<TestoTraining>)this.getAll()).size() == 0;
    }
    public void initTesti() {

        TestoTrainingRepository repo = (TestoTrainingRepository)this.repository;
        if(emptyCache && isEmpty()) {
            Arrays.stream(TestiEnum.values()).forEach((t) -> {
                this.insert(t.getTesto());
            });
            emptyCache = false;
        }
    }
}
