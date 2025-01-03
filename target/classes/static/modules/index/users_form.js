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
  usersListBox.hide("");
}

function displayUsers(users) {							   
  for (let i = 0; i < users.length; i++) {
	let person = $("<div class='user'>"),
	    personBox = $("<div>"),
		personImg = $("<img>"),
	    personName = $("<p>");
		
    personName.text(users[i]);
	personBox.append(personName);
	person.append(personBox);
	usersListBox.append(person);
  }
}

function displayPagination(totalUsersCount) {
  pagBtnsCount = Math.ceil(totalUsersCount / 10);
  
  if (pagBtnsCount > 0) {
	paginationBox.css({
	  "margin-top": "1rem",
	  "visibility": "visible"
	});
	
	back.addClass("disabled_pag");
  }
}

function getUsers() {
  let offset = (currentPagNum - 1) * 10;
  
  /*$.ajax({
	method: "GET",
	url: "/user/list",
	contentType: "application/json",
	data: JSON.stringify({
	  offset: offset
	}),
	success(response) {
	  let {"users": users, "totalCount": totalUsersCount} = response;
	  
	  if (usersListBox.children().length > 0) {
		clearUsersList();
	  }
	  
	  displayUsers(users);
	  displayPagination(totalUsersCount);
	}
  })*/
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
// getUsers();