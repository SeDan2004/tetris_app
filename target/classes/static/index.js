let body = $("body");

function toggleForm(form, replacedForm) {
  replacedForm.animate({opacity: 0}, {
	duration: 500,
	complete: function() {
	  replacedForm.hide();
	  form.show();
	  form.animate({opacity: 1}, 500);
	}
  });
}
		
checkTheme();