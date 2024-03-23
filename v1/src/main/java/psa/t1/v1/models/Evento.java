package psa.t1.v1.models;

import java.time.LocalDate;
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

    private String nome;
    private String descricao;
    private LocalDate data;
    private List<Ligante> participantes;
}
