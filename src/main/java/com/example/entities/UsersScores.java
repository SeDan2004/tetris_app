package com.example.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "users_scores")
@NoArgsConstructor(access=AccessLevel.PRIVATE, force=true)
public class UsersScores {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	@Getter
	@Column(name = "user_id")
	private Long userId;
	
	@Getter
	@Setter
	@Column(name = "score")
	private Integer score;
	
	@OneToOne
	@JoinColumn(name = "id", referencedColumnName = "user_id")
	private User user;
	
	public UsersScores(Long userId, Integer score) {
		this.userId = userId;
		this.score = score;
	}
}