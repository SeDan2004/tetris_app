package com.example.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.requests.AccessRequest;
import com.example.responses.AccessResponse;
import com.example.services.JwtService;

@RestController
@RequestMapping("/jwt")
public class JwtController {
	private JwtService jwtService;
	
	public JwtController(
	    JwtService jwtService		
	) {
		this.jwtService = jwtService;
	}
	
	@PostMapping("/checkAccessValid")
	public ResponseEntity<AccessResponse> checkAccessValid(
	    @RequestBody AccessRequest accessRequest
	) throws Exception {
		return new ResponseEntity<AccessResponse>(jwtService.accessIsValid(accessRequest), HttpStatus.OK);
	}
}