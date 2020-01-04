package com.itsinstanceof.rcb.repositories;

import com.itsinstanceof.rcb.entities.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
}
