package psa.t1.v1.controllers;


import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import psa.t1.v1.models.Evento;
import psa.t1.v1.models.Ligante;
import psa.t1.v1.repository.EventoRepository;
import psa.t1.v1.repository.LiganteRepository;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/ligante")
public class LiganteController {

    @Autowired
    private LiganteRepository liganteRepository;

    @Autowired
    private EventoRepository eventoRepository;


    @PostMapping("/cadastrar")
    public ResponseEntity<Ligante> cadastrar(@RequestBody Ligante payload) {


        // verifica se já existe um ligante com a mesma matricula
        Ligante ligante = liganteRepository.findByMatricula(payload.getMatricula());
        if (ligante != null){
            return ResponseEntity.badRequest().build();
        }
        

        // Gerar o login do ligante
        if (payload.getNome() != null){
            payload.gerarLogin();
            payload.definirDataAtual();
            // Salvar o ligante no banco de dados
            liganteRepository.save(payload);

        }

        else {
            return ResponseEntity.badRequest().build();
        }


        return ResponseEntity.ok(payload);
    }

    //Listar todos os ligantes
    @GetMapping("/listar")
    public ResponseEntity<?> listarLigantes() {
        return ResponseEntity.ok(liganteRepository.findAll());
    }   

    @PostMapping("/confirmarPresenca/{idEvento}")
    public String confirmarPresenca(@RequestBody Ligante payload, @PathVariable String idEvento) {
        /*
         * payload = login ligante + matricula
         * 
         * ex:
         * 
         *  lucas.nardino
         *  123456
         */


        
        // Buscar o evento no banco de dados
        @SuppressWarnings("null")
        Evento evento = eventoRepository.findById(idEvento).get();

        //valida dados do ligante
        Ligante ligante = liganteRepository.findByLogin(payload.getLogin());
        if (ligante == null){
            return "Ligante não encontrado";
        }

        if (ligante.getMatricula().equals(payload.getMatricula()) || ligante.getMatricula().equals(payload.getMatricula())){
            evento.getParticipantes().add(ligante);
            eventoRepository.save(evento);
            return "Presença confirmada";
        }

        return "Login ou senha inválida";
    }
 
    
    @SuppressWarnings("null")
    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<?> deletarLigante(@PathVariable String id) {
        liganteRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
