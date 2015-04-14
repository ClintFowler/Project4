<?php
/**
 * Created by PhpStorm.
 * User: Clinton
 * Date: 3/25/2015
 * Time: 7:47 PM
 */

/**
 * Create extensions to be used on web browser
 */



$app = new \Slim\Slim();

//Create HTTP End points

//Webservice Landing page.
$app->get('/', function()
{
	require_once realpath(__DIR__.DIRECTORY_SEPARATOR.'Views'.DIRECTORY_SEPARATOR.'LoginForm.html');
});

//End point to web authenticate user to our webservice.
$app->post('/auth', function()
{
    $check = new \Common\Authentication\InSqLite();
    $check->authenticate(htmlentities($_POST['username']),htmlentities($_POST['password']));
});

$app->get('/profiles/:id', function()
{
    //TODO: create profile page "will need to be dynamic, fragments?"
});

$app->get('/register', function()
{
    require_once realpath(__DIR__.DIRECTORY_SEPARATOR.'Views'.DIRECTORY_SEPARATOR.'register.html');
});




//Create API End Points

//Landing API page
$app->get('/api/', function()
{
    require_once realpath(__DIR__.DIRECTORY_SEPARATOR.'Views'.DIRECTORY_SEPARATOR.'API_Directions.html');
});

//Gain access to use API
$app->get('/api/access', function()
{
   //TODO: code to gain access to api sites.
});

//Authentication point for our webservice
$app->post('/api/auth',  function() use($app)
{
    $postusername=' ';
    $postpassword=' ';
    $postauthkey='access987654321';
    if(json_decode($body = $app->request->getBody()) != null)
    {
        $postusername = $body['username'];
        $postpassword = $body['password'];
    }
    else
    {
        if($app->request->params('username'))
        {
            $postusername = $app->request->params('username');
        }
        if($app->request->params('password'))
        {
            $postpassword = $app->request->params('password');
        }
        if($app->request->params('accesskey'))
        {
            $postauthkey = $app->request->params('accesskey');
        }
    }

    $test = new \Common\Authentication\InSqLite();
    $response = 401;
    if($test->verifyAccess($postauthkey))
    {
        $response = $test->authenticate($postusername,$postpassword);
    }
    if($response == 200)
    {
        $app->response->setStatus(200);
        return json_encode($app->response->header("Profile: HTTP://localhost:8080/profiles/".$_POST['username'], 200));
    }
    if($response == 401)
    {
        $app->response->setStatus(401);
        return json_encode($app->response->header("Need to register?: http://localhost:8080/register", 401));
    }
    $app->response->setStatus(500);
    return json_encode($app->response->header("OOPS Something on our side failed", 500));
});

//registration service
$app->post('/api/register', function()
{
    $register = new \Common\Authentication\InSqLite();
});

//Authentication point for twitter.... Needed or embedded function?
$app->post('/api/twitter', function() use($app)
{
    //TODO: code to access twitter.
});


$app->run();