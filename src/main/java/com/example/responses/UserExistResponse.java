package com.example.responses;

import java.util.Date;

import org.springframework.http.HttpStatus;

public class UserExistResponse extends AbstractExceptionResponse {
	public UserExistResponse(
	    String msg, 
	    Date date, 
	    HttpStatus httpStatus
	) {
		super(msg, date, httpStatus);
	}
}