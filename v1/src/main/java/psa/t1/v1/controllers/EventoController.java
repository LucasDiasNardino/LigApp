package psa.t1.v1.controllers;

import org.springframework.web.bind.annotation.RestController;

import psa.t1.v1.models.Evento;
import psa.t1.v1.repository.EventoRepository;
import psa.t1.v1.repository.LiganteRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
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
    public ResponseEntity<Evento> postMethodName(@RequestBody Evento payload) {
        
        //define localDate atual para o evento
        payload.setData(java.time.LocalDate.now());

        // adicionar evento no banco de dados
        eventoRepository.save(payload);

        return ResponseEntity.ok(payload);
    }
    

    @RequestMapping(value = "/listar")
    public ResponseEntity<?> listarEventos() {
        return ResponseEntity.ok(eventoRepository.findAll());
    }
}
