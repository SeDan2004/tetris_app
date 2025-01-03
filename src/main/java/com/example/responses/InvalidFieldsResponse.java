package com.example.responses;

import java.util.Date;

import org.springframework.http.HttpStatus;

public class InvalidFieldsResponse extends AbstractExceptionResponse {
	public InvalidFieldsResponse(
	    String msg, 
	    Date date, 
	    HttpStatus httpStatus
	) {
		super(msg, date, httpStatus);
	}
}