let users = $(".users_form"),
    addBtn = $(".add_icon");

function showAuthenticationForm(e) {
  toggleForm(authentication, users);
}

function addEvent() {
  addBtn.on("click", showAuthenticationForm);
}

addEvent();