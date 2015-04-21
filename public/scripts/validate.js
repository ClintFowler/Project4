function checkAllFields()
{
	var firstname=document.forms["registerForm"]["firstname"].value;
	var lastname=document.forms["registerForm"]["lastname"].value;
	var email=document.forms["registerForm"]["email"].value;
	var username=document.forms["registerForm"]["username"].value;
	var password=document.forms["registerForm"]["password"].value;
	
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
	var dataString = 'username=' + username + '&password=' + password + '&email=' + email + '&firstname=' + firstname + '&lastname' + lastname;
	
	if( checkEmail("registerForm","email") == false || checkAllFields() == false )
	{
		return false;
	}
	else
	{
		$.ajax({
			type: "POST",
			url: "http://localhost:8080/sql/auth",
			data: dataString,
			cache: false,
			dataType:'JSON',
			statusCode:
			{
				// ok
				200: function(){
					document.getElementById("registerMessage").innerHTML = "Thank you for registering.";
				},
				// failed to create account
				409: function(){
					document.getElementById("registerMessage").innerHTML = "Failed to create account.";
				}
			}
		});
		return true;
	}
}