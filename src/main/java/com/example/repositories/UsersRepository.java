package com.example.repositories;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.dtos.UsersDTO;
import com.example.entities.User;

@Repository
public interface UsersRepository extends JpaRepository<User, Long> {
	@Query("select u.id from User u where u.login = ?1")
	public Long getIdByLogin(String login);
	
	public User findByLogin(String login);
	
	@Query("select u from User u")
	public List<UsersDTO> getUsers(Pageable pageable);
}