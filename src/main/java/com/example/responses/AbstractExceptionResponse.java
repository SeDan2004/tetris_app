package com.example.responses;

import java.util.Date;

import org.springframework.http.HttpStatus;

import lombok.Data;

@Data
public abstract class AbstractExceptionResponse {
	private final String msg;
	private final Date date;
	private final HttpStatus httpStatus;
}