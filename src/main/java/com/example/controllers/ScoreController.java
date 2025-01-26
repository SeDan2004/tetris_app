package com.example.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.list_queries.ScoreListQuery;
import com.example.requests.SaveScoreRequest;
import com.example.responses.ScoreAndImageResponse;
import com.example.responses.UsersScoresListResponse;
import com.example.services.ScoreService;

@RestController
@RequestMapping("/score")
public class ScoreController {
	private ScoreService scoreService;
	private ScoreListQuery scoreListQuery;
	
	public ScoreController(
	    ScoreService scoreService,
	    ScoreListQuery scoreListQuery
	) {
		this.scoreService = scoreService;
		this.scoreListQuery = scoreListQuery;
	}
	
	@GetMapping("/users_records{offset}")
	public ResponseEntity<UsersScoresListResponse> usersRecords(
	    @PathVariable("offset") int offset		
	) throws Exception {
		UsersScoresListResponse response;
		response = scoreListQuery.getUsersRecords(offset);
		return new ResponseEntity<UsersScoresListResponse>(response, HttpStatus.OK);
	}
	
	@GetMapping("/score_and_image")
	public ResponseEntity<ScoreAndImageResponse> scoreAndImage() 
	  throws Exception {
		ScoreAndImageResponse scoreAndImageResponse;
		scoreAndImageResponse = scoreService.getScoreAndImage();
		return new ResponseEntity<ScoreAndImageResponse>(scoreAndImageResponse, HttpStatus.OK);
	}
	
	@PostMapping("/save_score")
	public void saveScore(
	    @RequestBody SaveScoreRequest request
	) throws Exception {
		scoreService.saveScore(request);
	}
}