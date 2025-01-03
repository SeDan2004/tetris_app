package com.example;

import java.util.Date;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.example.exceptions.InvalidFieldsException;
import com.example.exceptions.InvalidPasswordException;
import com.example.exceptions.UserExistException;
import com.example.responses.InvalidFieldsResponse;
import com.example.responses.InvalidPasswordResponse;
import com.example.responses.UserExistResponse;

@RestControllerAdvice
public class GlobalAdvice {	
	@ExceptionHandler(InvalidFieldsException.class)
	public ResponseEntity<InvalidFieldsResponse> invalidFieldsException(Exception ex) {
	    InvalidFieldsResponse response = new InvalidFieldsResponse(
	    	ex.getMessage(),
	    	new Date(),
	    	HttpStatus.BAD_REQUEST
	    );
		
		return new ResponseEntity<InvalidFieldsResponse>(response, HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(UserExistException.class)
	public ResponseEntity<UserExistResponse> userExistException(Exception ex) {
		UserExistResponse response = new UserExistResponse(
			ex.getMessage(),
			new Date(),
			HttpStatus.BAD_REQUEST
		);
		
		return new ResponseEntity<UserExistResponse>(response, HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(InvalidPasswordException.class)
	public ResponseEntity<InvalidPasswordResponse> invalidPasswordException(Exception ex) {
	    InvalidPasswordResponse response = new InvalidPasswordResponse(
	    	ex.getMessage(),
	    	new Date(),
	    	HttpStatus.BAD_REQUEST
	    );
		
		return new ResponseEntity<InvalidPasswordResponse>(response, HttpStatus.BAD_REQUEST);
	}
}