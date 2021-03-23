<?php

	session_start();
	unset($_SESSION['user_session']);
	
    // Conexion a la Base de datos
	$ini_array = parse_ini_file("configuracion.php");
	$string=$ini_array['string'];
	$base = $ini_array['base'];
	$user = $ini_array['user'];
	$pass = $ini_array['pass'];
    $enviar_mail = $ini_array['enviar_mail'];
    
    $conexion = new mysqli($string,$user,$pass,$base,3306);
    if (mysqli_connect_errno()) {
    	printf("La conexión con el servidor de base de datos falló: %s\n", mysqli_connect_error());
    	exit();
    }    
    
    $proceder = "OK";
    $txt_contrasena_actual = preg_replace('([^A-Za-z0-9._#*])', '',htmlspecialchars(addslashes(stripslashes($_POST["txt_contrasena_actual"]))));
    $txt_nueva_contrasena = preg_replace('([^A-Za-z0-9._#*])', '',htmlspecialchars(addslashes(stripslashes($_POST["txt_nueva_contrasena"]))));
    $txt_repetir_contrasena = preg_replace('([^A-Za-z0-9._#*])', '',htmlspecialchars(addslashes(stripslashes($_POST["txt_repetir_contrasena"]))));
    $txt_nombre_usuario = preg_replace('([^A-Za-z0-9.#])', '',htmlspecialchars(addslashes(stripslashes($_POST["txt_nombre_usuario"]))));
    $txt_usuario_email = preg_replace('([^A-Za-z0-9.#@])', '',htmlspecialchars(addslashes(stripslashes($_POST["txt_usuario_email"]))));
    
    $nombre_usuario = "";
    $user_id = 0;
    $sql_email_usuario= sprintf("SELECT user_id, user_name FROM tbl_users WHERE user_id = '".$_POST["txt_user_session"]."' ");
	$result_email_usuario = $conexion->query($sql_email_usuario);
	while($row_email_usuario = $result_email_usuario->fetch_array())
	{                                                  
        $nombre_usuario = $row_email_usuario['user_name'];
        $user_id = $row_email_usuario['user_id'];
    }      

    $msj_error = "";
    $clave_actual_base = "";
    
    if ( $txt_nueva_contrasena <> $txt_repetir_contrasena){
       $proceder = "ERROR";
       $msj_error = "La Nueva Contrasena y el campo Repetir Contrasena no son iguales"; 
    }
    
    $sql_contrasena= sprintf("SELECT user_password FROM tbl_users WHERE user_id = '".$user_id."' ");
	$result_contrasena = $conexion->query($sql_contrasena);
	while($row_contrasena = $result_contrasena->fetch_array())
	{                                                  
        $clave_actual_base = $row_contrasena['user_password'];
    }  
    
    if ( $clave_actual_base <> md5($txt_contrasena_actual)){
       $proceder = "ERROR";
       $msj_error = "La Contrasena Actual ingresada no coincide con la actual registrada en el sistema.";         
    }
    
    $txt_nueva_contrasena_md5 = md5($txt_nueva_contrasena);
    
    if (!preg_match("/^[0-9a-zA-Z*#._]{7,15}$/", $txt_nueva_contrasena)) { 
      $proceder = "ERROR";
       $msj_error = "La Nueva Contrasena tiene caracteres no permitidos. Deben ser minimo 8 carateres y solo deben ser numeros, letras o simbolos *#._";         
    } 
    
    
    if ( $proceder == "OK"){ 
        $sql_update_ciudad = "UPDATE tbl_users SET user_password = '".$txt_nueva_contrasena_md5."', user_email = '".$txt_usuario_email."' WHERE user_id = '".$user_id."' ";
        $conexion->query($sql_update_ciudad);        
        echo " ";
    }
    else{
        echo $msj_error;
    }

    $conexion->close();
    
?>