package com.contrader.contraininggame.repository.training;

import com.contrader.contraininggame.model.training.TestoTraining;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public interface TestoTrainingRepository extends CrudRepository<TestoTraining, Long> {
}
