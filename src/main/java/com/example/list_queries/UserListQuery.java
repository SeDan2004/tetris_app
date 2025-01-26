package com.example.list_queries;

import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.example.repositories.UsersRepository;
import com.example.responses.UserListResponse;

@Service
public class UserListQuery {
	private int limit = 10;
	
	private UsersRepository usersRepository;
	
	public UserListQuery(
		UsersRepository usersRepository
	) {
		this.usersRepository = usersRepository;
	}
	
	public UserListResponse getList(int offset) {
		return new UserListResponse(
	        usersRepository.getUsers(PageRequest.of(offset, limit)),
	        usersRepository.count()
	    );
	}
}