package com.contrader.contraininggame.repository;

import com.contrader.contraininggame.model.Regola;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public interface TutorialRepository extends CrudRepository<Regola, Long> {
}
