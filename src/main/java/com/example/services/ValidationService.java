package com.example.services;

import org.springframework.stereotype.Service;
import org.springframework.validation.Errors;

import com.example.exceptions.InvalidFieldsException;

@Service
public class ValidationService {
	public void hasInvalidFields(Errors errors) throws Exception {
		if (errors.hasErrors()) {
			String errorMsg = errors.getFieldError()
					                .getDefaultMessage();
			
			throw new InvalidFieldsException(errorMsg);
		}
	}
}