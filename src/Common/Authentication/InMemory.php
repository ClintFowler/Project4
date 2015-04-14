<?php
/**
 * Created by PhpStorm.
 * User: Clinton
 * Date: 3/17/2015
 * Time: 6:39 PM
 */

namespace Common\Authentication;


class InMemory implements IAuthentication
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
    public function authenticate($username, $password)
    {
        if($username === "Clint" && $password === "LetMeIn123")
        {
            echo 'Login successful for '. $username;
            return;
        }
        echo 'Login Failed!';
    }

}