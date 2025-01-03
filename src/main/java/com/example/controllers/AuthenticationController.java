package com.example.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.requests.AuthRequest;
import com.example.requests.RegRequest;
import com.example.responses.AuthResponse;
import com.example.responses.RegResponse;
import com.example.services.AuthenticationService;
import com.example.services.ValidationService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/authentication")
public class AuthenticationController {
	private ValidationService validationService;
	private AuthenticationService authenticationService;
	
	public AuthenticationController(
		ValidationService validationService,	
	    AuthenticationService authenticationService
	) {
		this.validationService = validationService;
		this.authenticationService = authenticationService;
	}
	
	@PostMapping("/reg")
	public ResponseEntity<RegResponse> reg(
	    @Valid @RequestBody RegRequest request, 
	    Errors errors
	) throws Exception {
		RegResponse regResponse;
		
		validationService.hasInvalidFields(errors);
	    regResponse = authenticationService.reg(request);
	    
	    return new ResponseEntity<RegResponse>(regResponse, HttpStatus.OK);
	}
	
	@PostMapping("/auth")
	public ResponseEntity<AuthResponse> auth(
		@Valid @RequestBody AuthRequest request,
		Errors errors
	) throws Exception {
		AuthResponse authResponse;
		
		validationService.hasInvalidFields(errors);
		authResponse = authenticationService.auth(request);
		
		return new ResponseEntity<AuthResponse>(authResponse, HttpStatus.OK);
	}
}