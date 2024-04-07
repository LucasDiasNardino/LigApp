package psa.t1.v1.controllers;

import org.springframework.web.bind.annotation.RestController;

import psa.t1.v1.models.Evento;
import psa.t1.v1.models.Ligante;
import psa.t1.v1.repository.EventoRepository;
import psa.t1.v1.repository.LiganteRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/evento")
public class EventoController {

    @Autowired
    private EventoRepository eventoRepository;

    @Autowired
    private LiganteRepository liganteRepository;

    @PostMapping("/cadastrar")
    public ResponseEntity<Evento> cadastrarEvento(@RequestBody Evento payload) {
        
        payload.definirDataAtual();
        payload.inicializarListaParticipantes();

        // adicionar evento no banco de dados
        eventoRepository.save(payload);

        return ResponseEntity.ok(payload);
    }
    

    @GetMapping(value = "/listar")
    public ResponseEntity<Iterable<Evento>> listarEvento(){
        Iterable<Evento> eventos = eventoRepository.findAll();
        return ResponseEntity.ok(eventos);
    }    

    
    //listar participantes de evento específico
    @GetMapping(value = "/listarParticipantes/{idEvento}")
    public ResponseEntity<List<Ligante>> listarParticipantes(@RequestParam String idEvento){
        Evento evento = eventoRepository.findById(idEvento).get();
        return ResponseEntity.ok(evento.getParticipantes());
    }
    
}
