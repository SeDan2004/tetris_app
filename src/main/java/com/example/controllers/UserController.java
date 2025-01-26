package com.example.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.list_queries.UserListQuery;
import com.example.responses.UserListResponse;
import com.example.services.UserService;

@RestController
@RequestMapping("/user")
public class UserController {
	private UserService userService;
	private UserListQuery userListQuery;
	
	public UserController(
		UserService userService,
		UserListQuery userListQuery
	) {
		this.userService = userService;
		this.userListQuery = userListQuery;
	}
	
	@GetMapping("/list/{offset}")
	public ResponseEntity<UserListResponse> list(
	    @PathVariable("offset") int offset
	) {
		UserListResponse userListResponse;
		userListResponse = userListQuery.getList(offset);
		return new ResponseEntity<UserListResponse>(userListResponse, HttpStatus.OK);
	}
}