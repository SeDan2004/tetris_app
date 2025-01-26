package com.example.responses;

import lombok.Data;

@Data
public class ScoreAndImageResponse {
	private final Integer score;
	private final String imgUrl;
}