package com.example.repositories;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.dtos.UsersScoresDTO;
import com.example.entities.UsersScores;

@Repository
public interface UsersScoresRepository extends JpaRepository<UsersScores, Long> {
	@Query("select us.score from UsersScores us where us.userId = ?1")
	public Integer getByUserId(Long userId);
	
	@Query("select us from UsersScores us order by us.score desc")
	public List<UsersScoresDTO> getUsersScores(Pageable pageable);
}