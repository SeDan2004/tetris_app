package com.example.services;

import static com.example.configs.security.UserDetails.getUserDetailsOrThrow;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import javax.imageio.ImageIO;

import org.springframework.stereotype.Service;

import com.example.configs.security.UserDetails;
import com.example.entities.User;
import com.example.repositories.UsersRepository;

@Service
public class ImgService {
	private UsersRepository usersRepository;
	
	private String projectSrc;
	private String usersImagesSrc;
	
	public ImgService(
	    UsersRepository usersRepository
	) {
	    this.usersRepository = usersRepository;
	}
	
	{
		projectSrc = System.getProperty("user.dir");
		usersImagesSrc = "/src/main/resources/static/users_images";
	}
	
	public void saveUserImg(InputStream imageStream) throws Exception {
		Path usersImagesPath;
		BufferedImage buffImage;
		File imgFile;
		Long imgNum;
		String imgFilename;
		Long userId;
		UserDetails details;
		User user;
		
		usersImagesPath = Paths.get(projectSrc + usersImagesSrc);
		imgNum = Files.list(usersImagesPath).count() + 1;
		imgFilename = "/img" + imgNum + ".jpg";
		
		buffImage = ImageIO.read(imageStream);
		imgFile = new File(projectSrc + usersImagesSrc + imgFilename);
		
		ImageIO.write(buffImage, "jpg", imgFile);
		
		details = getUserDetailsOrThrow();
		userId = details.getId();
		
		user = usersRepository.findById(userId).get();
		user.setImgSrc(imgFilename);
		
		usersRepository.save(user);
	}
}