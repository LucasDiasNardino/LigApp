package psa.t1.v1.controllers;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import psa.t1.v1.models.Login;

@RestController
public class LoginController {
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Login login) {
        if(login.getLogin().equals("admin") && login.getSenha().equals("admin")) {
            return ResponseEntity.ok("admin");
        }
        
        else {
            return ResponseEntity.ok("user");
        }
    }
}
