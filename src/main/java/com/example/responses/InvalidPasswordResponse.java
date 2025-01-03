package com.example.responses;

import java.util.Date;

import org.springframework.http.HttpStatus;

public class InvalidPasswordResponse extends AbstractExceptionResponse {
	public InvalidPasswordResponse(
		String msg,
		Date date,
		HttpStatus httpStatus
	) {
		super(msg, date, httpStatus);
	}
}