package com.example.services;

import java.time.Instant;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.example.configs.security.UserDetails;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {
	@Value("${jwt.application.token}")
	private String secretKey;
	
	@Value("${jwt.access.expiration}")
	private int accessExpiration;
	
	@Value("${jwt.refresh.expiration}")
	private int refreshExpiration;
	
	@Autowired
	private ObjectMapper om;
	
	private String createToken(UserDetails details, Date expiration) throws JsonProcessingException {
		return Jwts.builder()
				   .signWith(getSecretKey())
				   .expiration(expiration)
				   .subject(om.writeValueAsString(details))
				   .compact();
	}
	
	private String createAccessToken(UserDetails details) throws JsonProcessingException {
		Instant expiration = Instant.now().plusSeconds(accessExpiration);
		return createToken(details, Date.from(expiration));
	}
	
	private String createRefreshToken(UserDetails details) throws JsonProcessingException {
		Instant expiration = Instant.now().plusSeconds(refreshExpiration);
		return createToken(details, Date.from(expiration));
	}
	
	public Map<String, String> createTokenPair(UserDetails details) throws JsonProcessingException {
		Map<String, String> tokenPair = new HashMap<String, String>();
		tokenPair.put("access", createAccessToken(details));
		tokenPair.put("refresh", createRefreshToken(details));
		return tokenPair;
	}
	
	public UserDetails verifyAndGet(String token) throws JsonMappingException, JsonProcessingException {
		String subject = Jwts.parser()
		                     .verifyWith(getSecretKey())
		                     .build()
		                     .parseSignedClaims(token)
		                     .getPayload()
		                     .getSubject();
				
		return om.readValue(subject, UserDetails.class);
	}
	
	private SecretKey getSecretKey() {
		return Keys.hmacShaKeyFor(Decoders.BASE64.decode(secretKey));
	}
}