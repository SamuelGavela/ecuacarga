<?php
	session_start();
	unset($_SESSION['user_session']);
    unset($_SESSION['user_ecucarga']);
    unset($_SESSION['user_email']);
	unset($_SESSION['user_rol']); 
	
	if(session_destroy())
	{
		header("Location: login.php");
	}
?>
