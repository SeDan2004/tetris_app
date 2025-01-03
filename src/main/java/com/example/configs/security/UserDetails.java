package com.example.configs.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Data
@NoArgsConstructor(access=AccessLevel.PRIVATE, force=true)
@RequiredArgsConstructor
public class UserDetails {
	private final Long id;
	
	public static UserDetails getUserDetails() {
		UserDetails details;
		Authentication authentication;
		
		authentication = SecurityContextHolder.getContext()
				                              .getAuthentication();
		
		details = null;
		
		if (authentication instanceof JwtAuthentication jwtAuthentication) {
			details = (UserDetails) jwtAuthentication.getDetails();
		}
		
		return details;
	}
	
	public static UserDetails getUserDetailsOrThrow() throws Exception {
		UserDetails details;
		
		details = getUserDetails();
		
		if (details != null) {
			return details;
		} else {
			throw new Exception("Невозможно извлечь UserDetails!");
		}
	}
}