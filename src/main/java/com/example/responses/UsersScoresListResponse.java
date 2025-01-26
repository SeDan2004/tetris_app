package com.example.responses;

import java.util.List;

import com.example.dtos.UsersScoresDTO;

public class UsersScoresListResponse extends GridResponse<UsersScoresDTO> {
	public UsersScoresListResponse(
		List<UsersScoresDTO> list,
		Long totalCount
	) {
		super(list, totalCount);
	}
}