let page,
    activePag,
    pageCount,
	personsRecords,
    pagination,
	paginationChild,
	selectPageBtns,
	recordHoldersList,
	backToMenu;

page = 1;
personsRecords = $(".persons_records");
pagination = $(".pagination");
paginationChild = pagination.children();
selectPageBtns = pagination.find("div:not(.back, .next)");
recordHoldersList = $(".record_holders_list");
backToMenu = personsRecords.find(".back_to_menu");

getUsersRecords();

function backToMenuFromPersonsRecords(e) {
  personsRecords.animate({"opacity": 0}, {
	duration: 500,
	complete: function() {
	  personsRecords.hide();
	  menu.css("display", "flex");
	  menu.animate({"opacity": 1});
	}
  })
}

function getUsersRecords() {
  $.ajax({
    method: "GET",
	url: `/score/users_records${page - 1}`,
	contentType: "application/json",
	success(response) {
	  displayUsersRecords(response.list);
	  pageCountInit(response.totalCount);
	  displayPagination();
	}
  });
}

function displayUsersRecords(list) {
  if (recordHoldersList.text() !== "") {
	recordHoldersList.text("");
  }
  
  for (let i = 0; i < list.length; i++) {
	let login, imgSrc,
	    recordHolderDiv,
	    recordHolderInfo, recordHolderImg, recordHolderP,
		scoreDiv, scoreP,
        {"score": score, "user": recordHolder} = list[i];
		
	login = recordHolder.login;
	imgSrc = recordHolder.imgSrc;
	
	recordHolderDiv = $("<div>");
	recordHolderDiv.addClass("record_holder");
	
	recordHolderInfo = $("<div>");
	recordHolderP = $("<p>");
	
	if (imgSrc !== null) {
	  recordHolderImg = $("<img>");
	  recordHolderImg.attr("src", `users_images${imgSrc}`);
	  recordHolderInfo.append(recordHolderImg);
	} else {
	  recordHolderP.css("margin-left", "0.6rem");
	}
	
	recordHolderP.text(login);
	recordHolderInfo.append(recordHolderP);
	
	scoreDiv = $("<div>");
	scoreP = $("<p>");
	
	scoreP.text(score);
	scoreDiv.append(scoreP);
	
	recordHolderDiv.append(recordHolderInfo);
	recordHolderDiv.append(scoreDiv);
	
	recordHoldersList.append(recordHolderDiv);
  } 
}

function displayPagination() {
  let pagBtnsCountPerUnit = selectPageBtns.length;
	
  if (pageCount > 1) {
	let pageIndex, firstPage, lastPage;
    
	if (getComputedStyle(pagination[0]).visibility === "hidden") {
	  pagination.css("visibility", "visible");
	}
	
	pageIndex = page % pagBtnsCountPerUnit || pagBtnsCountPerUnit;
	firstPage = page - (pageIndex - 1);
	lastPage = page + (pagBtnsCountPerUnit - pageIndex);
	
	if (lastPage > pageCount) {
	  lastPage = pageCount;
	}
	
	selectPageBtns.each((_, pagBtn) => {	  
	  if (firstPage > lastPage) return;
		
	  if (firstPage === page) {
		activePag = pagBtn;
	    pagBtn.classList.add("active");
	  }
		
	  pagBtn.style.display = "flex";
	  pagBtn.querySelector("p").innerText = firstPage; 
	  firstPage++; 
	});
  }
}

function redisplayPagination() {
  selectPageBtns.each((_, pag) => {
    pag.querySelector("p").innerText = "";
	pag.style.display = "none";
	pag.classList.remove("active");
  });
  
  displayPagination();
}

function pageCountInit(totalCount) {
  pageCount = Math.ceil(totalCount / 10);
}

function addEvent() {
  backToMenu.on("click", backToMenuFromPersonsRecords);
	
  paginationChild.each((_, pagBtn) => {
	pagBtn.addEventListener("click", pagBtnClickEventHandler);
  });
}

function back() {
  let next,
      back,
      prevSibling;
  
  next = paginationChild[paginationChild.length - 1];
  back = paginationChild[0];
  prevSibling = activePag.previousElementSibling;
	  
  if (next.classList.contains("disabled_pag")) {
	next.classList.remove("disabled_pag");
  }
  
  page--;
  
  if (!prevSibling.classList.contains("back")) {
    prevSibling.classList.add("active");
	activePag.classList.remove("active");
	activePag = prevSibling;
  } else {
	redisplayPagination();
  }
  
  if (page === 1) {
    back.classList.add("disabled_pag");
  }
}

function next() {
  let back,
      next,
      nextSibling;
  
  back = paginationChild[0];
  next = paginationChild[paginationChild.length - 1];
  nextSibling = activePag.nextElementSibling;
	  
  if (back.classList.contains("disabled_pag")) {
    back.classList.remove("disabled_pag");
  }
  
  page++;
  
  if (!nextSibling.classList.contains("next")) {
    nextSibling.classList.add("active");
	activePag.classList.remove("active");
	activePag = nextSibling;
  } else {
    redisplayPagination();
  }
  
  if (page === pageCount) {
	next.classList.add("disabled_pag");
  }
}

function selectPage(pagBtn) {
  let back, next;
  
  function checkDisabledPag(pag, condition) {
	if (condition) {
	  pag.classList.remove("disabled_pag");
	} else {
	  pag.classList.add("disabled_pag");
	}
  }
  
  back = paginationChild[0];
  next = paginationChild[paginationChild.length - 1];
	
  page = +pagBtn.querySelector("p").innerText;
  pagBtn.classList.add("active");
  activePag.classList.remove("active");
  activePag = pagBtn;
  
  checkDisabledPag(back, page > 1);
  checkDisabledPag(next, page < pageCount);
}

function pagBtnClickEventHandler(e) {
  let pagBtn = e.currentTarget;
  
  if (pagBtn.innerText === "Назад") back();
  if (pagBtn.innerText === "Далее") next();
  if (isFinite(pagBtn.innerText)) selectPage(pagBtn);
  
  getUsersRecords();
}

addEvent();