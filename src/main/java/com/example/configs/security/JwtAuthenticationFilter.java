package com.example.configs.security;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.HandlerExceptionResolver;

import com.example.repositories.UsersRolesRepository;
import com.example.services.JwtService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
	@Autowired
	@Qualifier("handlerExceptionResolver")
	public HandlerExceptionResolver resolver;

	@Autowired
	private JwtService jwtService;
	
	@Autowired
	private UsersRolesRepository usersRolesRepository;
	
	private String getRefreshToken(HttpServletRequest request) {
		return Stream.of(request.getCookies())
				     .filter(cookie -> cookie.getName().equals("refresh"))
				     .map(cookie -> cookie.getValue())
				     .findFirst()
				     .orElse(null);
	}
	
	private List<SimpleGrantedAuthority> getAndConvertUserRoles(Long id) {
		return usersRolesRepository.getUserRoles(id)
		        .stream()
				.map(role -> new SimpleGrantedAuthority(role))
				.collect(Collectors.toList());
	}
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
	    try {
	    	String refresh = getRefreshToken(request);
	    		    	
	    	if (refresh != null) {
	    		Long id;
	    		List<SimpleGrantedAuthority> authorities;
	    		UserDetails details;
	    		JwtAuthentication jwtAuthentication;
	    		
	    		details = jwtService.verifyAndGet(refresh);
	    		id = details.getId();
	    		authorities = getAndConvertUserRoles(id);
	    		jwtAuthentication = new JwtAuthentication(details, authorities);
	    			    		
	    		SecurityContextHolder.getContext().setAuthentication(jwtAuthentication);
	    	}
	    	
	    } catch (Exception ex) {
	    	ex.printStackTrace();
	    	resolver.resolveException(request, response, null, ex);
	    }
	    
	    filterChain.doFilter(request, response);
	}
}