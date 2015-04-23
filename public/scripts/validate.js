
function checkAllFields()
{
	var firstname=document.forms["registerForm"]["firstname"].value;
	var lastname=document.forms["registerForm"]["lastname"].value;
	var email=document.forms["registerForm"]["email"].value;
	var username=document.forms["registerForm"]["username"].value;
	var password=document.forms["registerForm"]["password"].value;
	var twitterID=document.forms["registerForm"]["twitter"].value;
	var dataString = 'username=' + username + '&password=' + password + '&first=' + firstname + '&last=' + lastname + '&twitteruser=' + twitterID +'&email='+ email;


	if (username == '' || username == ' ')
	{
		$('#ufield').css('color','red');
	}
	if (password == '' || password == ' ')
	{
		$('#pfield').css('color','red');
	}
	if (firstname == '' || firstname == ' ')
	{
		$('#ffield').css('color','red');
	}
	if (email == '' || email == ' ')
	{
		$('#efield').css('color','red');
	}
	if (lastname == '' || lastname == ' ')
	{
		$('#lfield').css('color','red');
	}
	if (username != '' && username != ' ') {
		$('#ufield').css('color', 'black');
	}
	if (password != '' && password != ' ') {
		$('#pfield').css('color', 'black');
	}
	if (firstname != '' && firstname != ' ') {
		$('#ffield').css('color', 'black');
	}
	if (lastname != '' && lastname != ' ') {
		$('#lfield').css('color', 'black');
	}
	if (email != '' && email != ' ') {
		$('#efield').css('color', 'black');
	}

	if( !firstname || !lastname || !email || !username || !password )
	{
		alert("You must fill out all fields!");
		return false;
	}



}

function checkEmail(form_id,email)
{ 
	var pattern = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/; 
	var address = document.forms[form_id].elements[email].value; 
	
	if(pattern.test(address)==false)
	{ 
		alert("Email is not valid.\nMust contain @ and .com"); 
		document.forms[form_id].elements[email].focus(); 
		return false; 
	} 
}

function validateForm()
{
	var firstname=document.forms["registerForm"]["firstname"].value;
	var lastname=document.forms["registerForm"]["lastname"].value;
	var email=document.forms["registerForm"]["email"].value;
	var username=document.forms["registerForm"]["username"].value;
	var password=document.forms["registerForm"]["password"].value;
	var twitterID=document.forms["registerForm"]["twitter"].value;
	var dataString = 'username=' + username + '&password=' + password + '&first=' + firstname + '&last=' + lastname + '&twitteruser=' + twitterID +'&email='+ email;


	if(checkAllFields() == false || checkEmail("registerForm","email") == false )
	{
		return false;
	}
	else
	{
		$.ajax({
			type: "POST",
			url: "http://localhost:8080/api/register",
			data: dataString,
			cache: false,
			dataType: 'JSON',
			statusCode:
			{
				//successfully created
				201: function(){
					alert("Successful Creation");
					window.location.href("http://localhost:8080/profiles/" + username);
				},
				//failed to create account
				409: function(){
					alert("Failed to create. User ID in use");
				},
				//server failure
				500: function(){
					alert("Ooops Something went wrong on our side. please try again later");
				}
			}

		});
		return true;
	}
}