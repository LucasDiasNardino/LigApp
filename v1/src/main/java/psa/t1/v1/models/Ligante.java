package psa.t1.v1.models;

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
@Document(collection = "ligantes")
public class Ligante {

    @Id
    private String id;

    private String nome;
    private String matricula;

    private String login;

    public String stripNome(String nome){
        // Dividir o nome completo em partes separadas
        String[] partesNome = nome.split(" ");

        // Obter o primeiro nome e o último nome
        String primeiroNome = partesNome[0];
        String ultimoNome = partesNome[partesNome.length - 1];

        // Formatar o nome conforme desejado
        String nomeFormatado = primeiroNome.toLowerCase() + "." + ultimoNome.toLowerCase();

        return nomeFormatado;
    }

    public void gerarLogin(){
        // Gerar o login do ligante
        String login = stripNome(this.nome);

        // Definir o login do ligante
        this.login = login;
    }
    
}
