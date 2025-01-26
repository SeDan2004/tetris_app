let menu,
    photo,
    photoArea,
	scoreSpan,
	newGameBtn,
	personsRecordsBtn;
	
menu = $(".menu");
photo = $(".photo");
photoArea = photo.find(".photo_area");
scoreSpan = $(".score");

newGameBtn = $(".new_game");
personsRecordsBtn = $(".persons_records_btn");

function addEvent() {
  newGameBtn.on("click", showTetris);
  personsRecordsBtn.on("click", showPersonsRecords);
}

function showTetris(e) {
  menu.animate({"opacity": 0}, {
    duration: 500,
    complete: function() {
	  menu.hide();
	  tetris.css("display", "flex");
	  tetris.animate({"opacity": 1});
	}
  })
}

function showPersonsRecords(e) {
  menu.animate({"opacity": 0}, {
	duration: 500,
	complete: function() {
	  menu.hide();
	  personsRecords.css("display", "flex");
	  personsRecords.animate({"opacity": 1});
	}
  })
}

function showUserImage(imgUrl) {
  let img = $("<img>");
	
  if (imgUrl !== null) {
	photo.css("visibility", "visible");
	img.prop("src", `/users_images${imgUrl}`);
	photoArea.append(img);
  }
}

function getScoreAndImage() {
  $.ajax({
    method: "GET",
	url: "/score/score_and_image",
	contentType: "application/json",
	success(response) {
	  userScore = response.score !== null ? response.score : 0;
	  imgUrl = response.imgUrl;
	  scoreSpan.text(userScore);
	  showUserImage(imgUrl);
	}
  })
}

getScoreAndImage();
addEvent();