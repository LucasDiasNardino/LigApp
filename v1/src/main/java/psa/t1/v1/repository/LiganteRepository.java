package psa.t1.v1.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import psa.t1.v1.models.Ligante;

public interface LiganteRepository extends MongoRepository<Ligante, String>{

    Ligante findByLogin(String login);
    
}
