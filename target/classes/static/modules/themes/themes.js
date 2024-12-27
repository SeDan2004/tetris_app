let lightThemeBtn = $(".sun_icon"),
    darkThemeBtn = $(".moon_icon");
	
function checkTheme() {	
  if (localStorage.getItem("isDark")) {
	body.addClass("dark");
	lightThemeBtn.on("click", changeTheme);
  } else {
	darkThemeBtn.on("click", changeTheme);
  }
}

function changeTheme(e) {
  let themeBtn = $(e.currentTarget);
  
  if (themeBtn.is(lightThemeBtn)) {
	localStorage.removeItem("isDark");
	darkThemeBtn.on("click", changeTheme);
  }
  
  if (themeBtn.is(darkThemeBtn)) {
	localStorage.setItem("isDark", true);
	lightThemeBtn.on("click", changeTheme);
  }
  
  body.toggleClass("dark");
  themeBtn.off("click", changeTheme);
}