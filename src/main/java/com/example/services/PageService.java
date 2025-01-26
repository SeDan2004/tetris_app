package com.example.services;

import java.util.stream.Stream;

import org.springframework.stereotype.Service;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Service
public class PageService {
	private HttpServletRequest servletRequest;
	private HttpServletResponse servletResponse;
	
	public PageService(
		HttpServletRequest servletRequest,
		HttpServletResponse servletResponse
	) {
		this.servletRequest = servletRequest;
		this.servletResponse = servletResponse;
	}
	
	public boolean hasRefreshCookie() {
		if (servletRequest.getCookies() != null) {
		    return Stream.of(servletRequest.getCookies())
		            .anyMatch(cookie -> cookie.getName().equals("refresh"));
		}
		
		return false;
	}
}