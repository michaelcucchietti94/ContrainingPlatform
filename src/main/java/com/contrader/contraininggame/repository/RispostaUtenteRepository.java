package com.contrader.contraininggame.repository;

import com.contrader.contraininggame.model.RispostaUtente;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public interface RispostaUtenteRepository extends CrudRepository<RispostaUtente, Long> {
}
