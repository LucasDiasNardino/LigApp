package psa.t1.v1.models;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Id;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "eventos")
public class Evento {
    
    @Id
    private String id;

    private String titulo;
    private String descricao;
    private LocalDate data;
    private List<Ligante> participantes;

    public void definirDataAtual() {
        this.data = LocalDate.now();
    }

    public void inicializarListaParticipantes() {
        this.participantes = new ArrayList<>();
    }
}
