package com.contrader.contraininggame.utils.data;

import com.contrader.contraininggame.model.states.americhe.*;
import com.contrader.contraininggame.model.states.europa.*;
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

}
