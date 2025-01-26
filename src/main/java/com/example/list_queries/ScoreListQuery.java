package com.example.list_queries;

import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.example.repositories.UsersScoresRepository;
import com.example.responses.UsersScoresListResponse;

@Service
public class ScoreListQuery {
	private int limit = 10;
	
	private UsersScoresRepository usersScoresRepository;
	
	public ScoreListQuery(
		UsersScoresRepository usersScoresRepository
	) {
		this.usersScoresRepository = usersScoresRepository;
	}
	
	public UsersScoresListResponse getUsersRecords(int offset) {
	    return new UsersScoresListResponse(
	    	usersScoresRepository.getUsersScores(PageRequest.of(offset, limit)),
	    	usersScoresRepository.count()
	    );
	}
}