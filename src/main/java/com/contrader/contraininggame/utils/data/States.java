package com.contrader.contraininggame.utils.data;

import com.contrader.contraininggame.model.states.africa.*;
import com.contrader.contraininggame.model.states.americhe.*;
import com.contrader.contraininggame.model.states.asia.*;
import com.contrader.contraininggame.model.states.europa.*;
import com.contrader.contraininggame.model.states.oceania.Australia;
import com.contrader.contraininggame.model.states.oceania.NuovaZelanda;
import com.contrader.contraininggame.model.states.oceania.Polinesia;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
class States {
    /* AMERICHE */
    static Argentina argentina = new Argentina();
    static Brasile brasile = new Brasile();
    static Canada canada = new Canada();
    static Colombia colombia = new Colombia();
    static Cuba cuba = new Cuba();
    static Guatemala guatemala = new Guatemala();
    static Messico messico = new Messico();
    static Nicaragua nicaragua = new Nicaragua();
    static Peru peru = new Peru();
    static USA usa = new USA();
    /* AMERICHE */

    /* EUROPA */
    static Danimarca danimarca = new Danimarca();
    static Francia francia = new Francia();
    static Germania germania = new Germania();
    static Grecia grecia = new Grecia();
    static Islanda islanda = new Islanda();
    static Italia italia = new Italia();
    static RegnoUnito regnoUnito = new RegnoUnito();
    static Spagna spagna = new Spagna();
    static Svezia svezia = new Svezia();
    static Ucraina ucraina = new Ucraina();
    /* EUROPA */

    /* ASIA */
    static Cina cina = new Cina();
    static Filippine filippine = new Filippine();
    static Giappone giappone = new Giappone();
    static India india = new India();
    static Iran iran = new Iran();
    static Iraq iraq = new Iraq();
    static Libano libano = new Libano();
    static Malesia malesia = new Malesia();
    static Pakistan pakistan = new Pakistan();
    static Russia russia = new Russia();
    /* ASIA */

    /* AFRICA */
    static Algeria algeria = new Algeria();
    static Egitto egitto = new Egitto();
    static Etiopia etiopia = new Etiopia();
    static Madagascar madagascar = new Madagascar();
    static Marocco marocco = new Marocco();
    static Nigeria nigeria = new Nigeria();
    static RepubblicaDelCongo repubblicaDelCongo = new RepubblicaDelCongo();
    static SudAfrica sudAfrica = new SudAfrica();
    static Sudan sudan = new Sudan();
    static Tanzania tanzania = new Tanzania();
    /* AFRICA */

    /* OCEANIA */
    static Australia australia = new Australia();
    static NuovaZelanda nuovaZelanda = new NuovaZelanda();
    static Polinesia polinesia = new Polinesia();
    /* OCEANIA */
}
