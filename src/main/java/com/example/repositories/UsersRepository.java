package com.example.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.entities.User;

@Repository
public interface UsersRepository extends JpaRepository<User, Long> {
	@Query("select u.id from User u where u.login = ?1")
	public Long getIdByLogin(String login);
	
	public User findByLogin(String login);
}