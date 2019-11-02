package com.contrader.contraininggame.model.test;

import com.contrader.contraininggame.model.Domanda;
import com.contrader.contraininggame.model.RispostaDomanda;
import com.contrader.contraininggame.model.RispostaUtente;

import java.util.*;

public class UserTest {
    private Iterator<Domanda> domande;
    private List<RispostaUtente> risposteUtente;
    private Map<Long, List<RispostaDomanda>> risposteDomande;


    /* GETTER, SETTER & CONSTRUCTOR */
    public List<RispostaUtente> getRisposteUtente() {
        return risposteUtente;
    }
    public Iterator<Domanda> getDomande() {
        return domande;
    }
    public void setDomande(Iterator<Domanda> domande) {
        this.domande = domande;
    }
    public void setRisposteDomande(Domanda target, List<RispostaDomanda> risposte) {risposteDomande.put(target.getId(), risposte);}
    public List<RispostaDomanda> getRisposteDomanda(Domanda d) {return risposteDomande.get(d.getId());}


    public UserTest() {
        this.risposteUtente = new ArrayList<>();
        this.risposteDomande = new HashMap<>();
    }

    /* MANAGEMENT METHODS */
    public boolean isLastQuestion() {
        return (this.domande == null || !this.domande.hasNext());
    }
    public void addRisposta(RispostaUtente rispostaUtente) {
        if(rispostaUtente != null)
            this.risposteUtente.add(rispostaUtente);
    }
    public Domanda getNextQuestion() {
        if(isLastQuestion())
            return null;

        return this.domande.next();
    }
}
