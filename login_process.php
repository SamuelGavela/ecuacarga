<?php
	session_start();
    require_once 'model.php';
	//require_once 'api_rest_ldap.php';

    date_default_timezone_set('America/Guayaquil');
    $dt = new DateTime();
    $fecha_hoy = $dt->format('Y-m-d H:i:s');     
    
	if(isset($_POST['btn-login']))
	{

		$user_name = strtoupper(trim($_POST['user_email']));
		$user_password = trim($_POST['password']);

		//$login_user = validar_ldap($user_name, $user_password);
        $login_user = 1;   //temporal hasta tener LDAP en Ecuasistencia Directorio Activo

        $conexion = conexion_bd();
        $array_result = validar_login($conexion, $user_name, $user_password);
		sqlsrv_close($conexion);

        if ( (isset($array_result->cod_usuario)) && ($login_user) ){
			$_SESSION['user_session'] = $user_name;
            $_SESSION['user_ecucarga'] = $user_name;
            $_SESSION['user_email'] = $array_result->email;
            $_SESSION['user_rol'] = $array_result->rol;
            echo "ok"; 
            // LOG         
            $nombre_archivo_log = "log_login_usuarios.txt";
            if($archivo = fopen($nombre_archivo_log, "a")){
                fwrite($archivo,"(FEC:[".$fecha_hoy."] , SESEJEC:[".$_SESSION['user_ecucarga']."], USR_EMAIL:[".$user_name."]) - [ Login Exitoso ] \n");
                fclose($archivo);
            }              
        }
        else{
            // LOG  
        	unset($_SESSION['user_session']);
            unset($_SESSION['user_ecucarga']);
            unset($_SESSION['user_email']);          
            unset($_SESSION['user_rol']);     
            session_destroy();       
            $nombre_archivo_log = "log_login_usuarios.txt";
            if($archivo = fopen($nombre_archivo_log, "a")){
                fwrite($archivo,"(FEC:[".$fecha_hoy."] , USR_EMAIL:[".$user_name."]) - [ Error - Usuario o Clave no existe. ] \n");
                fclose($archivo);
            }             
            echo "Usuario o Clave no existe. ";
        }

	}

?>
