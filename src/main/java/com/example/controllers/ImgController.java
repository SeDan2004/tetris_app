package com.example.controllers;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.services.ImgService;

@RestController
@RequestMapping("/img")
public class ImgController {
	private ImgService imgService;
	
	public ImgController(
	    ImgService imgService
	) {
		this.imgService = imgService;
	}
	
	@PostMapping("/uploadImage")
	public void upload(@RequestParam("image") MultipartFile file) throws Exception {
	    imgService.saveUserImg(file.getInputStream());
	}
}