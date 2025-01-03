package com.example.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.entities.UsersRoles;

@Repository
public interface UsersRolesRepository extends JpaRepository<UsersRoles, Long> {
	@Query("select ur.role from UsersRoles ur where ur.userId = ?1")
	public List<String> getUserRoles(Long id);
}