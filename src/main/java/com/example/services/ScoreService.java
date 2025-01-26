package com.example.services;

import static com.example.configs.security.UserDetails.getUserDetailsOrThrow;

import org.springframework.stereotype.Service;

import com.example.configs.security.UserDetails;
import com.example.entities.UsersScores;
import com.example.repositories.UsersRepository;
import com.example.repositories.UsersScoresRepository;
import com.example.requests.SaveScoreRequest;
import com.example.responses.ScoreAndImageResponse;

@Service
public class ScoreService {
	private UsersRepository usersRepository;
	private UsersScoresRepository usersScoresRepository;
	
	public ScoreService(
		UsersRepository usersRepository,
		UsersScoresRepository usersScoresRepository
	) {
		this.usersRepository = usersRepository;
		this.usersScoresRepository = usersScoresRepository;
	}
	
	public ScoreAndImageResponse getScoreAndImage() 
	    throws Exception {
		    Long userId;
			String imgUrl;
			Integer score;
			UserDetails details;
			ScoreAndImageResponse response;
				
			details = getUserDetailsOrThrow();
			userId = details.getId();
			score = usersScoresRepository.getByUserId(userId);
			imgUrl = usersRepository.findById(userId).get().getImgSrc();
				
			return new ScoreAndImageResponse(score, imgUrl);
	}
			
	public void saveScore(SaveScoreRequest request) 
	    throws Exception {
			Long userId;
			Integer score;
			UserDetails details;
			UsersScores usersScores;
				
			details = getUserDetailsOrThrow();
				
			userId = details.getId();
			score = request.getScore();
			usersScores = usersScoresRepository.findById(userId).orElse(null);
				
			if (usersScores != null) {
		        usersScores.setScore(score);
			} else {
				usersScores = new UsersScores(userId, score);
			}
				
			usersScoresRepository.save(usersScores);
    }
}