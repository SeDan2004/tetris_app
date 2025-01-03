package com.example.requests;

import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Data
@NoArgsConstructor(access=AccessLevel.PRIVATE, force=true)
@RequiredArgsConstructor
public class AuthRequest {
	@NotNull(message = "Введено пустое поле с логином")
	private final String login;
	
	@NotNull(message = "Введено пустое поле с паролем")
	private final String password;
}