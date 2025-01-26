package com.example.responses;

import java.util.List;

import com.example.dtos.UsersDTO;

public class UserListResponse extends GridResponse<UsersDTO> {

	public UserListResponse(
	    List<UsersDTO> list, 
	    Long totalCount
	) {
		super(list, totalCount);
	}
	
}