package com.contrader.contraininggame.service;

import com.contrader.contraininggame.model.User;
import com.contrader.contraininggame.model.decorated.TerritorioDecorated;
import com.contrader.contraininggame.model.game.Giocatore;
import com.contrader.contraininggame.model.game.Partecipante;
import com.contrader.contraininggame.model.game.Squadra;
import com.contrader.contraininggame.model.game.Territorio;
import com.contrader.contraininggame.repository.PartitaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PartitaService {
    @Autowired
    private PartitaRepository repository;
    @Autowired
    private TerritorioService territorioService;
    private Giocatore current;
    private boolean started = false;


    private void assegnaTerritoriIniziali() {
        List<Long> ids = new ArrayList<>();


        this.repository.getPartita().getPartecipanti().forEach(s -> {
            long rand;
            do {
                rand = (long) (Math.random() * 42);
            } while(ids.contains(rand));

            ids.add(rand);
        });

        int initialSize = ids.size();

        while(ids.size() > 0) {
            Partecipante p = this.repository.getPartita().getPartecipanti().get(initialSize - ids.size());
            Territorio t = this.territorioService.getById(ids.remove(0));
            t.setArmate(1);
            this.repository.getPartita().conquistaTerritorio(p, t);
        }
    }

    public void startGame(User user) {
        if(started) {
           return;
        }

        started = true;
        this.current = repository.createGiocatore(user);
        this.repository.getPartita().register(this.current);
        assegnaTerritoriIniziali();

    }

    public List<TerritorioDecorated> getConfinanti() {
        List<Territorio> conquistati = this.repository.getPartita().getTerritoriOf(this.current);
        List<TerritorioDecorated> conquistabili =  new ArrayList<>();
        conquistati.forEach(t -> {
            List<Territorio> confini = this.territorioService.getTerritoriConfinanti(t.getId());
            confini.forEach(c -> {
                TerritorioDecorated tt = TerritorioDecorated.createFromTerritorio(c);
                Partecipante owner = this.repository.getPartita().ownerOf(c);
                if(owner == null) {
                    tt.setOwner("NESSUNO");
                } else {
                    tt.setOwner(owner.getNominativo());
                }
                conquistabili.add(tt);
            });
        });

        return conquistabili;
    }

    public List<TerritorioDecorated> getConquistati() {
        List<Territorio> conquers = this.repository.getPartita().getTerritoriOf(this.current);
        List<TerritorioDecorated> results = new ArrayList<>();
        conquers.forEach(t -> {
            TerritorioDecorated tt = TerritorioDecorated.createFromTerritorio(t);
            tt.setOwner(this.repository.getPartita().getTeam(this.current).getNominativo());
            results.add(tt);
        });
        return results;
    }
    public List<Partecipante> getPartecipanti() {
        return this.repository.getPartita().getPartecipanti();
    }
    public List<Territorio> getTerritoriOf(String nominativo) {
        return this.repository.getPartita().getTerritoriOf(nominativo);
    }
    public List<Squadra> getMatchRanking() {
        return repository.getPartita().getGameRanking();
    }
    public List<Squadra> getSquadreRanking() {
        return this.repository.getPartita().getInternalTeamsRanking();
    }
    public void muovi(Long destId, Long sourceId, int armate, int livello) {
        Territorio source = territorioService.getById(sourceId);
        Territorio dest = territorioService.getById(destId);

        Territorio sourceReference = this.repository.getPartita().getTerritorioReferenceOf(this.current, source);
        if(sourceReference == null)
            return;

        // Sposta le armate a prescindere
        if(sourceReference.getArmate() <= armate)
            armate = sourceReference.getArmate() - 1;
        sourceReference.setArmate(sourceReference.getArmate()-armate);

        // Se il territorio di destinazione non appartiene a nessuno è neutro
        if(this.repository.getPartita().ownerOf(dest) == null)
            assegna(dest, armate, livello);
        else
            attacca(dest, armate, livello);

    }
    public void rinforza(Long territorioId, int livello) {
        Territorio t = territorioService.getById(territorioId);

        Territorio reference = this.repository.getPartita().getTerritorioReferenceOf(this.current, t);
        if(reference == null)
            return;

        livello = Math.min(3, livello);
        livello = Math.max(1, livello);
        if(livello == 1) {
            reference.setArmate(reference.getArmate() + 1);
        } else if(livello == 2) {
            reference.setArmate(reference.getArmate() + 5);
        } else {
            reference.setArmate(reference.getArmate() + 10);
        }
    }

    private double generaArmateLv1() {
        return Math.random();
    }
    private double generaArmateLv2() {
        return Math.random()*0.8 + 0.4;
    }
    private double generaArmateLv3() {
        return Math.random()*0.7 + 0.7;
    }
    private double generateArmate(int livello) {
        livello = Math.max(livello, 1);
        livello = Math.min(livello, 3);
        if(livello == 1) return generaArmateLv1();
        else if(livello == 2) return generaArmateLv2();
        else return generaArmateLv3();
    }
    private int calcolaEffettive(int armate, int livello) {
        double effettive = 0;
        for(int i = 0; i < armate; i++) {
            effettive += generateArmate(livello);
        }

        return (int)effettive;
    }


    private void assegna(Territorio dest, int armate, int livello) {
        if(armate == 0)
            return;

        dest.setArmate(calcolaEffettive(armate, livello));
        this.repository.getPartita().conquistaTerritorio(this.current, dest);
    }
    private void attacca(Territorio dest, int armate, int livello) {
        Partecipante defenser = this.repository.getPartita().ownerOf(dest);

        Territorio destRef = this.repository.getPartita().getTerritorioReferenceOf(
                defenser,
                dest
        );
        if(destRef == null)
            return;

        int defense = calcolaEffettive(destRef.getArmate(), 2);
        int attack = calcolaEffettive(armate, livello);
        int result = defense - attack;

        destRef.setArmate(Math.abs(result));
        if(result == 0) {
            this.repository.getPartita().perdiTerritorio(defenser, destRef);
        } else if(result < 0){
            this.repository.getPartita().perdiTerritorio(defenser, destRef);
            this.repository.getPartita().conquistaTerritorio(this.current, destRef);
        }

    }




}
