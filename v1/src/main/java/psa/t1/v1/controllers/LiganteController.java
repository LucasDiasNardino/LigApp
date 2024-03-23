package psa.t1.v1.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import psa.t1.v1.models.Ligante;
import psa.t1.v1.repository.LiganteRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/ligante")
public class LiganteController {

    @Autowired
    private LiganteRepository liganteRepository;


    @PostMapping("/cadastrar")
    public ResponseEntity<Ligante> login(@RequestBody Ligante payload) {

        // Gerar o login do ligante
        if (payload.getNome() != null){
            payload.gerarLogin();

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
    
}
