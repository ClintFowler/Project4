<?php
/**
 * Created by PhpStorm.
 * User: Clinton
 * Date: 3/17/2015
 * Time: 6:44 PM
 */

namespace Common\Authentication;

use PDO;

class InSqLite implements IAuthentication
{

    protected $dbh;
    protected $responsecode;

    public function __construct()
    {
        $this->responsecode = 401;
        try
        {
            $this->dbh = new PDO("sqlite:../src/Data/sqliteDB");
        }
        catch(PDOException $e)
        {
            $this->responsecode = 500;
        }
    }
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
        //$dbh='';
        $this->responsecode = 401;

        $query ="Select username, password from users";
        $results = $this->dbh->query($query);
        while($row = $results->fetch(PDO::FETCH_ASSOC))
        {
            if($row["username"]=== $username && $row["password"] === $password)
            {
                $this->responsecode = 200;
                //echo 'Login Successful for '.$username;
            }
        }
        $results->closeCursor();
        //echo 'Login Failed!';
        return $this->responsecode;
    }


    public function registerUser($user, $pass, $first, $last, $twitter, $email)
    {
        $this->responsecode = 201;

        $query = $this->dbh->prepare("insert into users(username,password,fname,lname,twitteruser,email)values(?,?,?,?,?,?)");
        $testing = $query->execute(array($user,$pass,$first,$last,$twitter,$email));
        if($testing)
        {
            $this->responsecode = 201;
        }
        else
        {
            $this->responsecode = 409;
        }
        $query->closeCursor();
        return $this->responsecode;
    }

    public function getProfile($user)
    {
        $query = "select * from users where username='".$user."'";
        $search = $this->dbh->query($query);
        $row = $search->fetch(PDO::FETCH_ASSOC);
        $search->closeCursor();
        return $row;
    }

    /**
     * Function verify access
     *
     * @param string $keyCheck
     * @return Boolean
     *
     * @access public
     */
    public function verifyAccess($keyCheck)
    {
        $query = "Select * from accesskeys where key =\"".$keyCheck."\"";
        $results = $this->dbh->query($query);
        $check = $results->fetch(PDO::FETCH_ASSOC);
        if($check['key'] == $keyCheck)
        {
            $results->closeCursor();
            return true;
        }
        $results->closeCursor();
        return false;
    }

}