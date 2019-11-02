package com.contrader.contraininggame.utils.data;

import com.contrader.contraininggame.model.ContinentPiece;

public enum ContinentPieceName {
    AFRICA_NORD(ContinentPieces.africaNord.clona()),
    AFRICA_SUD(ContinentPieces.africaSud.clona()),
    AFRICA_EST(ContinentPieces.africaEst.clona()),
    AFRICA_NORD_OVEST(ContinentPieces.africaNO.clona()),
    AFRICA_SUD_OVEST(ContinentPieces.africaSO.clona()),
    AMERICA_NORD(ContinentPieces.americaNord.clona()),
    AMERICA_SUD(ContinentPieces.americaSud.clona()),
    ASIA_EST(ContinentPieces.asiaEst.clona()),
    ASIA_OVEST(ContinentPieces.asiaOvest.clona()),
    ASIA_NORD(ContinentPieces.asiaNord.clona()),
    ASIA_SUD(ContinentPieces.asiaSud.clona()),
    EUROPA_CENTRO(ContinentPieces.europaCentro.clona()),
    EUROPA_SUD(ContinentPieces.europaSud.clona()),
    EUROPA_NORD(ContinentPieces.europaNord.clona()),
    EUROPA_EST(ContinentPieces.europaEst.clona()),
    EUROPA_OVEST(ContinentPieces.europaOvest.clona()),
    OCEANIA(ContinentPieces.oceania.clona());



    private ContinentPiece continentPiece;
    private ContinentPieceName(ContinentPiece cp) {
        this.continentPiece = cp;
    }

    public ContinentPiece getContinentPiece() {
        return continentPiece;
    }
}
