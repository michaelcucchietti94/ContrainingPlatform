package com.contrader.contraininggame.utils.data;

import com.contrader.contraininggame.model.continentpieces.africa.*;
import com.contrader.contraininggame.model.continentpieces.americhe.*;
import com.contrader.contraininggame.model.continentpieces.asia.*;
import com.contrader.contraininggame.model.continentpieces.europa.*;
import com.contrader.contraininggame.model.continentpieces.oceania.Oceania;
import org.springframework.stereotype.Component;

@Component
class ContinentPieces {
    /* AMERICHE */
    static AmericaNord americaNord = new AmericaNord();
    static AmericaSud americaSud = new AmericaSud();
    /* AMERICHE */

    /* EUROPA */
    static EuropaCentro europaCentro = new EuropaCentro();
    static EuropaEst europaEst = new EuropaEst();
    static EuropaNord europaNord = new EuropaNord();
    static EuropaOvest europaOvest = new EuropaOvest();
    static EuropaSud europaSud = new EuropaSud();
    /* EUROPA */

    /* ASIA */
    static AsiaEst asiaEst = new AsiaEst();
    static AsiaOvest asiaOvest = new AsiaOvest();
    static AsiaSud asiaSud = new AsiaSud();
    static AsiaNord asiaNord = new AsiaNord();
    /* ASIA */

    /* AFRICA */
    static AfricaNord africaNord = new AfricaNord();
    static AfricaEst africaEst = new AfricaEst();
    static AfricaNO africaNO = new AfricaNO();
    static AfricaSO africaSO = new AfricaSO();
    static AfricaSud africaSud = new AfricaSud();
    /* AFRICA */

    /* OCEANIA */
    static Oceania oceania = new Oceania();
    /* OCEANIA */
}
