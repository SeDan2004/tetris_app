package com.example.services;

import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.configs.security.Role;
import com.example.configs.security.UserDetails;
import com.example.entities.User;
import com.example.entities.UsersRoles;
import com.example.exceptions.InvalidPasswordException;
import com.example.exceptions.UserExistException;
import com.example.repositories.UsersRepository;
import com.example.repositories.UsersRolesRepository;
import com.example.requests.AuthRequest;
import com.example.requests.RegRequest;
import com.example.responses.AuthResponse;
import com.example.responses.RegResponse;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Service
public class AuthenticationService {
	@Value("${jwt.refresh.expiration}")
	private int refreshExpiration;
	
	private Long id;
	private String login;
	private String password;
	
	private User user;
	private UserDetails details;
	private Map<String, String> tokenPair;
	
	private JwtService jwtService;
	private ImgService imgService;
	
	private UsersRepository usersRepository;
	private UsersRolesRepository usersRolesRepository;
	
	private PasswordEncoder passwordEncoder;
	private HttpServletRequest servletRequest;
	private HttpServletResponse servletResponse;
	
	public AuthenticationService(
	    JwtService jwtService,
	    ImgService imgService,
	    
	    UsersRepository userRepository,
	    UsersRolesRepository usersRolesRepository,
	    
	    PasswordEncoder passwordEncoder,
	    HttpServletRequest servletRequest,
	    HttpServletResponse servletResponse
	) {
	    this.jwtService = jwtService;
	    this.imgService = imgService;
	    
	    this.usersRepository = userRepository;
	    this.usersRolesRepository = usersRolesRepository;
	    
	    this.passwordEncoder = passwordEncoder;
	    this.servletRequest = servletRequest;
	    this.servletResponse = servletResponse;
	}
	
	public RegResponse reg(RegRequest request) throws Exception {
		UsersRoles usersRoles;
		
		login = request.getLogin();
		password = request.getPassword();
		
		password = passwordEncoder.encode(password);
		
		id = usersRepository.getIdByLogin(login);
		
		if (id != null) {
			throw new UserExistException("Пользователь уже существует!");
		}
					
		user = new User(login, password);
		user = usersRepository.save(user);
			
		id = user.getId();
			
		usersRoles = new UsersRoles(id, Role.USER.getName());
		usersRolesRepository.save(usersRoles);
			
        details = new UserDetails(id);
        tokenPair = jwtService.createTokenPair(details);
            
        jwtService.addRefreshCookie(tokenPair.get("refresh"));
            
        return new RegResponse(tokenPair.get("access"));
	}
	
	public AuthResponse auth(AuthRequest request) throws Exception {
		String hashPassword;
		
		id = request.getId();
		login = request.getLogin();
		password = request.getPassword();
		user = usersRepository.findById(id).orElse(null);
		
		hashPassword = user.getPassword();
		
		if (!passwordEncoder.matches(password, hashPassword)) {
			throw new InvalidPasswordException("Указан неверный пароль!");
		}
		
		details = new UserDetails(id);
		tokenPair = jwtService.createTokenPair(details);
		
		jwtService.addRefreshCookie(tokenPair.get("refresh"));
		
		return new AuthResponse(tokenPair.get("access"));
	}
}