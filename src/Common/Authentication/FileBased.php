<?php
/**
 * Created by PhpStorm.
 * User: Clinton
 * Date: 3/17/2015
 * Time: 6:38 PM
 */

namespace Common\Authentication;


class FileBased implements IAuthentication
{
    /**
     * Function authenticate
     *
     * @param string $username
     * @param string $password
     * @return mixed
     *
     * @access public
     */

    protected $user = " ";
    protected $userpass = " ";

    public function authenticate($username, $password)
    {
        $this->user = $username;
        $this->userpass = $password;
        $loginfile = fopen("../src/Data/testLogin.txt","r") or die("File not Found");
        while(!feof($loginfile))
        {
            $test = explode(",",fgets($loginfile));
            foreach($test as $check)
            {
                if (!strcmp($check, $this->getformattedcreds())) {
                    fclose($loginfile);
                    echo 'Login Passed for '.$this->user;
                    return;
                }
            }
        }
        fclose($loginfile);
        echo 'Login Failed';
        return;

    }

    private function getformattedcreds()
    {
        return $this->user.':'.$this->userpass;
    }

}