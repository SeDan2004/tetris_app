package com.example;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Encoders;

public class ApplicationTokenCreator {	
	static String createApplicationToken() {
	    return Encoders.BASE64.encode(Jwts.SIG.HS256.key().build().getEncoded());
	}
	
	public static void main(String[] args) {
		System.out.println(createApplicationToken());
	}
}