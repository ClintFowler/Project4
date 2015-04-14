<?php
/**
 * Created by PhpStorm.
 * User: Clinton
 * Date: 3/17/2015
 * Time: 6:43 PM
 */

namespace Common\Authentication;

use PDO;

class InMySQL implements IAuthentication
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
        $dbh='';
        try
        {
            $dbh = new PDO("mysql:host=localhost:3306;dbname=Website",'root','');
        }
        catch(PDOException $e)
        {
            echo $e->getMessage();
        }
        $query ="Select username, password from users";
        $results = $dbh->query($query);
        while($row = $results->fetch(PDO::FETCH_ASSOC))
        {
            if($row["username"]=== $username && $row["password"] === $password)
            {
                $results->closeCursor();
                echo 'Login Successful for '.$username;
                return;
            }
        }
        $results->closeCursor();
        echo 'Login Failed!';
    }

}