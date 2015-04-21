/**
 * Created by Clinton on 4/20/2015.
 */

function register(){

    var user = $("#username").val();
    var pass = $("#password").val();
    var first = $("#firstname").val();
    var last = $("#lastname").val();
    var twitterID = $("#twitter").val();
    var dataString = 'username=' + user + '&password=' + pass + '&first=' + first + '&last=' + last + '&twitteruser=' + twitterID;

    //highlight any blank fields
    if (user == '' || user == ' ')
    {
        $('#ufield').css('color','red');
    }
    if (pass == '' || pass == ' ')
    {
        $('#pfield').css('color','red');
    }
    if (first == '' || first == ' ')
    {
        $('#ffield').css('color','red');
    }
    if (last == '' || last == ' ')
    {
        $('#lfield').css('color','red');
    }
    //alert which fields need to be filled in
    if (user == '' || user == ' ')
    {
        alert("please provide a username (case sensitive)");
        return;
    }
    $('#ufield').css('color','black');
    if (pass == '' || pass == ' ')
    {
        alert("please provide a password (case sensitive)");
        return;
    }
    $('#pfield').css('color','black');
    if (first == '' || first == ' ')
    {
        alert("please provide your first name");
        return;
    }
    $('#ffield').css('color','black');
    if (last == '' || last == ' ')
    {
        alert("please provide your last name");
        return;
    }
    $('#lfield').css('color','black');

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
                window.location.replace("http://localhost:8080/profiles/" + user);
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

}