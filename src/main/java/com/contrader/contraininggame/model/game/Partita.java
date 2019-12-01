package com.contrader.contraininggame.model.game;

import com.mysql.cj.x.protobuf.MysqlxCrud;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


public class Partita {
    private List<Squadra> squadre = new ArrayList<>();

    public Partita() {
        Squadra rossa = new Squadra("Rossi");
        Squadra gialla = new Squadra("Gialli");
        Squadra verde = new Squadra("Verdi");
        Squadra blu = new Squadra("Blu");

        rossa.setColor(150, 39, 39);
        gialla.setColor(202, 202, 53);
        verde.setColor(53, 202, 53);
        blu .setColor(53, 128, 202);

        this.squadre.add(rossa);
        this.squadre.add(gialla);
        this.squadre.add(verde);
        this.squadre.add(blu);


    }

    public Squadra getTeam(Partecipante p) {
        for(Squadra s : squadre) {
            if(s.isAlly(p))
                return s;
        }
        return null;
    }
    public Squadra register(Giocatore p) {
        Squadra team = getTeam(p);
        if(team != null)
            return team;

        List<Squadra> available = this.squadre.stream().filter(s -> s.getTeam().size() < 3).collect(Collectors.toList());
        Squadra min = null;
        for(Squadra s : available) {
            if(min == null)
                min = s;
            else if(min.getTeam().size() > s.getTeam().size())
                min = s;
        }

        if(min == null)
            return null;

        min.getTeam().add(p);
        return min;
    }
    public List<Territorio> getTerritoriOf(Partecipante p) {
        return getTeam(p).getTerritori();
    }
    public List<Territorio> getTerritoriOf(String nominativo) {
        Partecipante p = new Giocatore(nominativo);
        return getTerritoriOf(p);
    }
    public List<Partecipante> getPartecipanti() {
        return new ArrayList<>(squadre);
    }
    public void conquistaTerritorio(Partecipante p, Territorio t) {
        getTeam(p).conquista(t);
    }
    public void perdiTerritorio(Partecipante p, Territorio t) {
        getTeam(p).perdi(t);
    }
    public List<Squadra> getGameRanking() {
        List<Squadra> result = new ArrayList<>(squadre);

        result.sort(Comparator.comparingInt(s -> s.getTerritori().size()));
        return result;
    }
    public List<Squadra> getInternalTeamsRanking() {
        List<Squadra> result = new ArrayList<>(squadre);
        result.forEach(s -> {
            s.getTeam().sort(Comparator.comparingInt(Giocatore::getScore));
        });
        return result;
    }
    public Partecipante ownerOf(Territorio t) {
        for(Squadra s : squadre) {
            if(s.getTerritori().contains(t))
                return s;
        }

        return null;
    }
    public Territorio getTerritorioReferenceOf(Partecipante p, Territorio t) {
        List<Territorio> filtered = getTeam(p).getTerritori().stream().filter((terr) -> t.getId().equals(terr.getId())).collect(Collectors.toList());
        if(filtered.size() == 0)
            return null;

        return filtered.get(0);
    }
    public Partecipante enemiesOf(Partecipante p) {
        Squadra s = new Squadra("Enemies");
        this.squadre.stream()
                .filter(squadra -> !p.isAlly(squadra))
                .forEach(squadra -> s.getTerritori().addAll(squadra.getTerritori()));
        return s;
    }



}
