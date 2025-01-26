let checkAccessInterval = setInterval(checkAccess, 4 * 3600 * 1000);

function checkAccess() {
  let access = localStorage.getItem("access");
  
  if (access !== null) {
	$.ajax({
	  method: "POST",
	  url: "/jwt/checkAccessValid",
	  data: JSON.stringify({
		access: access
	  }),
	  success(response) {
	    access = response.access;
		
		if (access !== null) {
		  localStorage.setItem("access", access);
		}
	  }
	});
  }
}