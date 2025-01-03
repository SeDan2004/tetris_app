package com.example.requests;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor(access=AccessLevel.PRIVATE, force=true)
public class RegRequest {
	@NotBlank(message="Введено пустое поле с логином.")
	private final String login;
	
	@Size(min=8, message="Пароль должен состоять не менее чем из 8 символов.")
	private final String password;
}