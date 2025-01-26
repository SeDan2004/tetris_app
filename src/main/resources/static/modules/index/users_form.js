let users = $(".users_form"),
    addUserBtn = $(".add_icon"),
	usersListBox = $(".users_list_box"),
	paginationBox = $(".pagination_box"),
	[back, next] = paginationBox.find(".arrow_icon"),
	currentPagNum = 1,
	pagBtnsCount;

back = $(back);
next = $(next);

function addEvent() {
  addUserBtn.on("click", showAuthenticationForm);
  back.on("click", prevUsers);
  next.on("click", nextUsers);
}

function clearUsersList() {
  usersListBox.html("");
}

function displayUsers(users) {
  let userBox,
      userInnerBox,
	  imgSrc;
	
  function appendSvgInUserInnerBox() {
	let userSvg = getUserIconSvg(),
		userSvgBox = $("<div>");
		  
    userSvgBox.append(userSvg);
    userSvgBox.addClass("user_svg_box");
		    
    userInnerBox.append(userSvgBox);
  }
  
  function appendImgInUserInnerBox() {
	let userImg = $("<img>");
	
	userImg.attr("src", "/users_images" + imgSrc);
    userInnerBox.append(userImg);
  }
								   
  users.forEach((user) => {
	let userId = user.id,
	    login = user.login,
		userLogin = $("<p>");
	
	imgSrc = user.imgSrc;
		
	userBox = $("<div>");
	userInnerBox = $("<div>");		
	
	if (imgSrc === null) {
	  appendSvgInUserInnerBox();
	} else {
	  appendImgInUserInnerBox();
	}
			
	userLogin.text(login);
	
	userInnerBox.append(userLogin);
	
	userBox.append(userInnerBox);
	userBox.addClass("user");
	
	usersListBox.append(userBox);
	
	userBox.attr("id", userId);
	userBox.on("click", showAuthenticationForm);
  })
}

function displayPagination(totalUsersCount) {
  pagBtnsCount = Math.ceil(totalUsersCount / 10);
  
  if (pagBtnsCount > 1) {
	paginationBox.css({
	  "margin-top": "1rem",
	  "visibility": "visible"
	});
	
	back.addClass("disabled_pag");
  }
}

function getUserIconSvg() {
  let svg;
	
  $.ajax({
	async: false,
	method: "GET",
	url: "/icons/user.svg",
	success(docSvg) {
	  svg = docSvg.querySelector("svg");
	}
  })
  
  return svg;
}

function getUsers() {
  let offset = currentPagNum - 1;
  
  $.ajax({
	method: "GET",
	url: `/user/list/${offset}`,
	contentType: "application/json",
	success(response) {
	  let users = response.list,
	      totalUsersCount = response.totalCount;
	    
	  if (usersListBox.children().length > 0) {
		clearUsersList();
	  }
	  
	  displayUsers(users);
	  
	  if (paginationBox.css("visibility") === "hidden") {
	    displayPagination(totalUsersCount);
	  }
	}
  })
}

function hidePagination() {
  back.removeClass("disabled_pag");
  next.removeClass("disabled_pag");
	
  paginationBox.css({
	"margin-top": "0rem",
	"visibility": "hidden"
  });
}

function nextUsers(e) {
  currentPagNum++;
  getUsers();
  togglePagBtnDisable(back, currentPagNum !== 1);
  togglePagBtnDisable(next, currentPagNum !== pagBtnsCount);
}

function prevUsers(e) {
  currentPagNum--;
  getUsers();
  togglePagBtnDisable(back, currentPagNum !== 1);
  togglePagBtnDisable(next, currentPagNum !== pagBtnsCount);
}

function showAuthenticationForm(e) {
  let currentBtn = $(e.currentTarget);
  
  if (currentBtn.is(addUserBtn)) {
    showRegForm();
  }
  
  if (currentBtn.hasClass("user")) {
	let userImg = currentBtn.find("img").clone();
	
	
	selectedUserId = +currentBtn.attr("id");
	
	showAuthForm();
	
	if (userImg.length) {
	  setUserImgAfterShowAuthenticationForm(userImg);
	}
  }
  
  users.animate({"opacity": 0}, {
    duration: 500,
	complete: function() {
	  users.hide();
	  authentication.css("display", "flex")
	  authentication.animate({"opacity": 1}, 500);
	}
  })
}

function togglePagBtnDisable(pag, condition) {
  if (condition) {
    if (pag.hasClass("disabled_pag")) {
	  pag.removeClass("disabled_pag");
	}
  } else {
    pag.addClass("disabled_pag");
  }
}

addEvent();
getUsers();