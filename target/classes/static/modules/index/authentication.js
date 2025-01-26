let authentication = $(".authentication_form"),
    selectPhotoArea = $(".select_photo_area"),
    selectPhotoInp = selectPhotoArea.find("input"),
	deletePhotoBtn = $(".delete_photo"),
    reg = $(".reg"),
	regInfFields = reg.find(".reg_inf_fields input"),
	auth = $(".auth"),
	authInfFields = auth.find(".auth_inf_fields input"),
	backToUsersBtn = $(".back"),
	acceptAuthenticationBtn = $(".accept"),
	imgSrc,
	imgData = new FormData(),
	selectedUserId;

function addEvent() {
  selectPhotoInp.on("change", selectPhoto);
  deletePhotoBtn.on("click", deleteSelectedPhoto);
  backToUsersBtn.on("click", backToUsers);
  acceptAuthenticationBtn.on("click", acceptAuthenticationForm);
}

function acceptReg() {
  let login = regInfFields[0].value.trim(),
      password = regInfFields[1].value.trim(),
	  repeatPassword = regInfFields[2].value.trim();
	  
  if (password !== repeatPassword) {
    alert("Пароли не совпадают!");
	return;
  }
  
  $.ajax({
	method: "POST",
	url: "/authentication/reg",
	contentType: "application/json",
	data: JSON.stringify({
	  login: login,
	  password: password
	}),
	success(response) {
	  let access = response.access;
	  
	  localStorage.setItem("access", access);
	  
	  if (imgData.has("image")) {
		$.ajax({
		  method: "POST",
		  url: "/img/uploadImage",
		  data: imgData,
		  enctype: "multipart/form-data",
		  contentType: false,
		  processData: false
		})
	  }
	  
	  location.href = "/game";
	},
	error(response) {
	  alert(response.responseJSON.msg);
	}
  })
}

function acceptAuth() {
  let login = authInfFields[0].value.trim(),
      password = authInfFields[1].value.trim();
	  
  $.ajax({
	method: "POST",
	url: "/authentication/auth",
	contentType: "application/json",
	data: JSON.stringify({
	  id: selectedUserId,
	  login: login,
	  password: password
	}),
	success(response) {
	  let access = response.access;
	  
	  localStorage.setItem("access", access);
	  
	  location.href = "/game";
	},
	error(response) {
	  alert(response.responseJSON.msg);
	}
  })
}

function acceptAuthenticationForm(e) {
  if (reg.css("display") === "flex") acceptReg();
  if (auth.css("display") === "flex") acceptAuth();
}

function backToUsers(e) {
  if (selectPhotoArea.has("img").length > 0) {
	deletePhotoBtn.click();
  }
	
  checkAuthenticationInfFields();
  
  authentication.animate({"opacity": 0}, {
	duration: 500,
	complete: function() {
	  authentication.hide();
	  users.css({"display": "flex"});
	  users.animate({"opacity": 1}, 500);
	  
	  if (reg.css("display") === "flex") {
		reg.css("display", "none");
	  }
	  
	  if (auth.css("display") === "flex") {
		let photoBox = auth.find(".photo_box"),
		    photoBoxImg = photoBox.find("img");
		
		auth.css("display", "none");
		
		photoBoxImg.remove();
		photoBox.css("visibility", "hidden");
	  }
	}
  })
}

function checkAuthenticationInfFields() {
  let notEmptyFields;
	
  if (reg.css("display") === "flex") {
	notEmptyFields = regInfFields.filter((_, inp) => inp.value !== "");
  }
  
  if (auth.css("display") === "flex") {
	notEmptyFields = authInfFields.filter((_, inp) => inp.value !== "");
  }
  
  clearAuthenticationInfFields(notEmptyFields);
}

function clearAuthenticationInfFields(fields) {
  fields.each((_, field) => field.value = "");
}

function deleteSelectedPhoto(e) {
  selectPhotoArea.find("img").remove();
  selectPhotoArea.removeClass("selected_photo");
  deletePhotoBtn.css({"visibility": "hidden"});
}

function setPhoto(e) {
  let photo = $("<img>");
  
  imgSrc = e.currentTarget.result;
  photo.attr("src", imgSrc);
  deletePhotoBtn.css({"visibility": "visible"});
  
  if (selectPhotoArea.hasClass("selected_photo")) {
	let lastPhoto = selectPhotoArea.find("img");
	lastPhoto.remove();
	selectPhotoArea.prepend(photo);
  } else {
    selectPhotoArea.prepend(photo);
    selectPhotoArea.addClass("selected_photo");
  }
}

function setUserImgAfterShowAuthenticationForm(userImg) {
  let photoBox = auth.find(".photo_box");

  photoBox.append(userImg);
  photoBox.css("visibility", "visible");
}

function selectPhoto(e) {
  let fileImg = $(e.currentTarget).prop("files")[0],
      reader = $(new FileReader());
	  	  	  
  reader.on("load", setPhoto);  
  reader[0].readAsDataURL(fileImg);
  imgData.append("image", fileImg);
  
  e.currentTarget.value = "";
}

function showRegForm() {
  reg.css("display", "flex");
}

function showAuthForm() {
  auth.css("display", "flex");
}

addEvent();