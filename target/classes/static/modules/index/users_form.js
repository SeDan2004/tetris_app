let users = $(".users_form"),
    addBtn = $(".add_icon"),
	usersListBox = $(".users_list_box"),
	paginationBox = $(".pagination_box"),
	[back, next] = paginationBox.find(".arrow_icon"),
	currentPagNum = 1,
	offsetCount;

back = $(back);
next = $(next);
	
function addEvent() {
  addBtn.on("click", showAuthenticationForm);
  back.on("click", selectPagBtn);
  next.on("click", selectPagBtn);
}

function displayUsers(users) {
  if (usersListBox.children().length !== 0) {
	usersListBox.html("");
  }
							   
  /*for (let i = 0; i < users.length; i++) {
	let person = $("<div class='user'>"),
	    personBox = $("<div>"),
		personImg = $("<img>"),
	    personName = $("<p>");
		
    personName.text(users[i]);
	personBox.append(personName);
	person.append(personBox);
	usersListBox.append(person);
  }*/
}

function displayPagination(usersCount) {
  offsetCount = Math.ceil(usersCount / 10);
  
  if (offsetCount > 0) {
	paginationBox.css({
	  "margin-top": "1rem",
	  "visibility": "visible"
	});
	
	back.addClass("disabled_pag");
  }
}

function hidePagination() {
  back.removeClass("disabled_pag");
  next.removeClass("disabled_pag");
	
  paginationBox.css({
	"margin-top": "0rem",
	"visibility": "hidden"
  });
}

function selectPagBtn(e) {
  let currentPagBtn = $(e.currentTarget);
  
  function toggleDisable(pag, condition) {
	if (condition) {
	  if (pag.hasClass("disabled_pag")) {
		pag.removeClass("disabled_pag");
	  }
	} else {
	  pag.addClass("disabled_pag");
	}
  }
  
  if (currentPagBtn.is(back)) {
	currentPagNum--;
  }
  
  if (currentPagBtn.is(next)) {
	currentPagNum++;
  }
  
  toggleDisable(back, currentPagNum !== 1);
  toggleDisable(next, currentPagNum !== offsetCount)
  
  getItems(currentPagNum - 1);
}

function getUsers(offset = 0) {
  
}

function showAuthenticationForm(e) {
  toggleForm(authentication, users);
}

addEvent();
getUsers();