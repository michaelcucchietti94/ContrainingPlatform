package com.contrader.contraininggame.controller.gamemapsubcontrollers;

import com.contrader.contraininggame.controller.AbstractController;
import com.contrader.contraininggame.controller.DBInitializable;
import com.contrader.contraininggame.model.ContinentPiece;
import com.contrader.contraininggame.service.ContinentPieceService;
import org.springframework.stereotype.Component;

import java.util.List;

/* TESTING PROPOSE
@RestController
@RequestMapping("/continentpieces")
@CrossOrigin(origins = "http://localhost:4200")*/
@Component
public class ContinentPieceController extends AbstractController<ContinentPiece, Long> implements DBInitializable {
    @Override
    public Iterable<ContinentPiece> getAll() {
        initializeData();
        return super.getAll();
    }

    @Override
    public void update(ContinentPiece m) {
        // do nothing
    }

    @Override
    public void insert(ContinentPiece m) {
        // do nothing
    }

    @Override
    public void delete(Long id) {
        // do nothing
    }

    @Override
    public ContinentPiece read(Long key) {
        initializeData();
        return super.read(key);
    }

    /* METODI SPECIFICI */
    public List<ContinentPiece> getByContinente(Long id) {
        ContinentPieceService sService = (ContinentPieceService)service;
        return sService.getPiecesByContinente(id);

    }

    public List<ContinentPiece> getByContinenteAndCategory(Long idContinente, Long idCategoria) {
        return ((ContinentPieceService)service).getPiecesByContinenteAndCategory(idContinente, idCategoria);
    }


    /* INITIALIZATION */
    public void initializeData() {
        ContinentPieceService s = (ContinentPieceService)this.service;
        s.initPieces();
    }
}
