function myFunction() {

	var username = $("#username").val();
	var password = $("#password").val();
	var dataString = 'username=' + username + '&password=' + password;

	if (username == '' || password == '')
	{
		alert("Please Fill All Fields");
	}
	else
	{
		$.ajax({
			type: "POST",
			url: "http://localhost:8080/api/auth",
			data: dataString,
			cache: false,
			dataType:'JSON',
			statusCode:
			{
				// ok
				200: function(){
					//alert('access granted');
					//document.getElementById("message").innerHTML = "access granted";
					//$("#registerlink").hide();
					window.location.replace("http://localhost:8080/profiles/" + username);
				},
				// unauthorized
				401: function(){
					//alert('access denied')
					document.getElementById("message").innerHTML = "access denied";
					$("#registerlink").show();
				}
			}
		});
	}
}