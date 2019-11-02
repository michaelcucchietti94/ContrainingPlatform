package com.contrader.contraininggame.service;

import com.contrader.contraininggame.model.ContinentPiece;
import com.contrader.contraininggame.repository.ContinentPieceRepository;
import com.contrader.contraininggame.utils.data.ContinentPieceName;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class ContinentPieceService extends DefaultService<ContinentPiece, Long> {
    private boolean emptyCache = true;

    private boolean isEmpty() {
        return ((List<ContinentPiece>)this.getAll()).size() == 0;
    }
    public void initPieces() {
        ContinentPieceRepository repo = (ContinentPieceRepository)this.repository;
        if(emptyCache && isEmpty()) {
            Arrays.stream(ContinentPieceName.values()).forEach((s) -> {
                System.out.println("Sto inserendo:\n" + s.getContinentPiece().toString() + "\n\n");
                this.insert(s.getContinentPiece());
            });
            emptyCache = false;
        }
    }

    public List<ContinentPiece> getPiecesByContinente(Long idContinente) {
        ContinentPieceRepository repo = (ContinentPieceRepository)repository;
        return repo.getStatiByContinente(idContinente);
    }

    public List<ContinentPiece> getPiecesByContinenteAndCategory(Long idContinente, Long idCategoria) {
        return ((ContinentPieceRepository)repository).getStatiByContinenteAndCategory(idContinente, idCategoria);
    }
}
