package com.example.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.services.PageService;

@Controller
@RequestMapping("/")
public class PageController {
	private PageService pageService;
	
	public PageController(
		PageService pageService
	) {
		this.pageService = pageService;
	}
	
	@GetMapping
	public String index() {
		if (pageService.hasRefreshCookie()) {
			return "redirect:/game";
		}
		
		return "index";
	}
	
	@GetMapping("game")
	public String game() {
		return "game";
	}
}