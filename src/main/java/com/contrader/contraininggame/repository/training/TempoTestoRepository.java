package com.contrader.contraininggame.repository.training;

import com.contrader.contraininggame.model.training.TempoTesto;
import com.contrader.contraininggame.model.training.TestoTraining;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public interface TempoTestoRepository extends CrudRepository<TempoTesto, Long> {

    @Query(value = "SELECT sum(t.seconds/t.parole) as parolesecondo from tempo_testo t", nativeQuery = true)
    List<Object[]> getSumOfSamples();

    @Query(value = "SELECT count(*) from tempo_testo", nativeQuery = true)
    List<Object[]> getNumberOfElements();

    @Query(value = "SELECT (seconds/parole) from tempo_testo", nativeQuery = true)
    List<Object[]> getSamples();
}
