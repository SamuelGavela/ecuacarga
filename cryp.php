<?php
	//ini_set('display_errors', 1); ini_set('display_startup_errors', 1); error_reporting(E_ALL);
	
    function encriptar($mensaje)
    {
    	$ini_array = parse_ini_file("configuracion.php");
    	$clave = $ini_array['key'];  
		
		$textoEncriptado = '';
		settype($mensaje, "string");
		$i = strlen($mensaje) - 1;
		$j = strlen($clave);
		if (strlen($mensaje) <= 0) {
			return 'ERROR';
		}
		do{
			$textoEncriptado .= ($mensaje[$i] ^ $clave[$i % $j]);
		} while ($i--);
			
		$textoEncriptado = base64_encode(base64_encode(strrev($textoEncriptado)));
		//$textoEncriptado = str_replace("+", "[[",$textoEncriptado);
		//$textoEncriptado = str_replace("&", "]]",$textoEncriptado); 
		//$textoEncriptado = str_replace("?", "**",$textoEncriptado);  			
		return $textoEncriptado;
	}

     
    function desencriptar($mensaje)
    {
    	$ini_array = parse_ini_file("configuracion.php");
    	$clave = $ini_array['key']; 
		
        //$mensaje = str_replace("[[","+",$mensaje);
        //$mensaje = str_replace("]]","&",$mensaje);
        //$mensaje = str_replace("**","?",$mensaje); 
		
		$textoPlano = '';
		settype($mensaje, "string");
		$mensaje = base64_decode(base64_decode($mensaje));

		$i = strlen($mensaje) - 1;
		$j = strlen($clave);
		if (strlen($mensaje) <= 0){
			return 'ERROR';
		}
		do{
			$textoPlano .= ($mensaje[$i] ^ $clave[$i % $j]);
		} while ($i--);
		$textoPlano = strrev($textoPlano);
        
        return $textoPlano;  
    }	

    
?>