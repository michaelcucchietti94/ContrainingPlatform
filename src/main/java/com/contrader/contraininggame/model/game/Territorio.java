package com.contrader.contraininggame.model.game;

import com.contrader.contraininggame.model.Categoria;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Territorio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name="idCategory")
    private Categoria category;

    private Integer armate = 0;

    @Override
    public boolean equals(Object o) {
        if(o == null)
            return false;
        if(!(o instanceof Territorio))
            return false;

        Territorio other = (Territorio)o;

        return this.getId().equals(other.getId());
    }
}
