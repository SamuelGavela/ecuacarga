<?php
session_start();

    if(!isset($_SESSION['user_ecucarga']))
    {
        header("Location: login.php");
    }
    ini_set('display_errors', 1); ini_set('display_startup_errors', 1); error_reporting(E_ALL);
    
    require_once 'model.php';
    $conexion = conexion_bd();

    $usuario_sistema = $_SESSION['user_ecucarga'];

    $target_dir = "uploads/";
    $uploadOk = 1;

    $form_cliente_01 = $_POST['form_cliente_01'];
    $form_producto_01 = $_POST['form_producto_01'];
    $form_subproducto_01 = $_POST['form_subproducto_01'];
    $form_proceso_01 = $_POST['form_proceso_01'];
    $form_fecha_01 = $_POST['form_fecha_01'];

    
    $result_consul_proceso = consulta_proceso($conexion, $form_cliente_01, $form_proceso_01);
    if (!isset($result_consul_proceso[0]['campos_en_txt'])) {
        echo "ERROR|No existe un proceso ".$form_proceso_01." configurado para el cliente ".$form_cliente_01.". </br>Comuniquese con el Administrador del Sistema.";
        $uploadOk = 0;
    }

    $fecha_registro = explode("-", $form_fecha_01);
    $prefijo_archivo = $fecha_registro[0].$fecha_registro[1].$fecha_registro[2]."_".$form_cliente_01;

    $nombre_archivo = basename($_FILES["fileToUpload_01"]["name"]);
    $nombre_archivo = preg_replace('([^A-Za-z0-9._-])', '',htmlspecialchars(addslashes(stripslashes($nombre_archivo))));

    $target_file = $target_dir.$prefijo_archivo."_".$nombre_archivo;

    // Borrar archivo si es que ya existe en el servidor.
    if (file_exists($target_file)) {
        unlink($target_file);
    }   

    
    $imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);

    // Check if file already exists
    if (file_exists($target_file)) {
        echo "ERROR|El archivo ya existe o ya ha sido subido.";
        $uploadOk = 0;
    }

    // Check file size
    if ($_FILES["fileToUpload_01"]["size"] > 500000000) {
        echo "ERROR|El archivo tiene un tamano excesivo, solo se permiten 500 MB.";
        $uploadOk = 0;
    }
    
    // Allow certain file formats
    if($imageFileType != "txt" && $imageFileType != "TXT") {
        echo "ERROR|Solo se permite adjuntar archivos TXT ";
        $uploadOk = 0;
    }
    // Check if $uploadOk is set to 0 by an error
    if ($uploadOk == 1) 
    {
        if (move_uploaded_file($_FILES["fileToUpload_01"]["tmp_name"], $target_file)) 
        {
                $resultado_continuar = "OK";
                if ( $result_consul_proceso[0]['tipo_dml'] == "INSERT" )
                {   //Borrar Base Activa Colocacion
                    $result_del_base_colocacion = del_base_colocacion($conexion, $form_cliente_01, $form_producto_01, $form_subproducto_01);
                    $split_result_colocacion = explode("|", $result_del_base_colocacion);
                    $resultado_continuar = $split_result_colocacion[0];
                }

                if ( $resultado_continuar == "OK") 
                {

                    $file = fopen($target_file,"r");
                    $contador = 0;
                    $contador_alterno = 0;
                    $contador_nuevos = 0;
                    $contador_repetidos = 0;
                    $contador_actualizados = 0;
                    $contador_errores = 0;
                    $arr_errores = array();
                    $errores_generales = "";

                    //aqui debo hacer la consulta para el PROCESO_01, 02, 03, etc de cuantos campos tiene el TXT
                    $campos_config_en_txt = $result_consul_proceso[0]['campos_en_txt'];
                    $estado_actual = $result_consul_proceso[0]['estado_actual'];

                    while(!feof($file))
                    {
                        $error_al_mapear = 0;
                        $linea = fgets($file);
                        $campos_linea = explode(chr(9),$linea);  // chr(9) es el TAB
                        $canti_lineas_en_archivo_cargado = count($campos_linea);
                        $contador_alterno++;

                        if ( $canti_lineas_en_archivo_cargado == $campos_config_en_txt )
                        {
                            
                            if(isset($campos_linea[1]))
                            {
                                $registro = "";
                                $mensaje_error_completo = "";
                                $cod_error = "0";	
                                $txt_mensaje = "";				

                                $c_tipide = null;
                                $c_cedula = null;
                                $c_nombre = null;
                                $c_apellido = null;
                                $c_cuenta = null;
                                $c_tarjeta = null;
                                $c_fecvigen = null;
                                $c_tiptar = null;
                                $c_clase = null;
                                $c_telefono1 = null;
                                $c_telefono2 = null;
                                $c_telefono3 = null;
                                $c_telefono4 = null;
                                $c_telefono5 = null;
                                $c_telefono6 = null;
                                $c_telefono7 = null;
                                $c_direccion = null;
                                $c_provincia = null;
                                $c_ciudad = null;
                                $c_prefijo = null;
                                $c_direccion2 = null;
                                $c_ciudad2 = null;
                                $c_prefijo2 = null;
                                $c_estado_cli = null;
                                $c_visa = null;
                                $c_master = null;
                                $c_super = null;
                                $c_austro = null;
                                $c_seguro = null;
                                $c_estado = null;
                                $c_tipresp = null;
                                $c_codresp = null;
                                $c_detresp = null;
                                $c_telfnuevo = null;
                                $c_detalle = null;
                                $c_fecha = null;
                                $c_hora = null;
                                $c_operador = null;
                                $c_codoper = null;
                                $c_activa = null;
                                $c_archivo = null;
                                $c_archivo1 = null;
                                $c_archivo2 = null;
                                $c_enviada = null;
                                $c_edadanio = null;
                                $c_edad = null;
                                $c_numllama = null;
                                $c_fecreges = null;
                                $c_h_cliente = null;
                                $c_fechcarga = null;
                                $c_telcon = null;
                                $c_email = null;
                                $c_celnuevo = null;
                                $c_tipcliente = null;
                                $c_titulo = null;
                                $c_env_asi = null;
                                $c_gestion = null;
                                $c_fechllama = null;
                                $c_conversa = null;
                                $c_comentario = null;
                                $c_ama_send = null;
                                $c_ama_status = null;
                                $c_fecest = null;
                                $c_horaest = null;
                                $c_usmod = null;
                                

                                for ($posicion = 0; $posicion < $campos_config_en_txt; $posicion++) 
                                {

                                    $nombre_campo = consulta_nombre_campo($conexion, $form_proceso_01, $form_cliente_01, $form_producto_01, $form_subproducto_01, $posicion);
                                    $valor_campo = str_replace('"','',$campos_linea[$posicion]);

                                    // Solo para hacer Trace de lo que se esta pasando a la funcion
                                    //echo "consulta_nombre_campo - ".$form_proceso_01."-".$form_cliente_01."-".$form_producto_01."-".$form_subproducto_01."-".$posicion."==".$nombre_campo->nom_campo." ::=".$valor_campo."</br>";
                                    
                                    if(isset($nombre_campo->nom_campo))
                                    {
                                        switch ($nombre_campo->nom_campo) {
                                            case 'tipide': $c_tipide = $valor_campo; break;
                                            case 'cedula': $c_cedula = $valor_campo; break;
                                            case 'nombre': $c_nombre = $valor_campo; break;
                                            case 'apellido': $c_apellido = $valor_campo; break;
                                            case 'cuenta': $c_cuenta = $valor_campo; break;
                                            case 'tarjeta': $c_tarjeta = $valor_campo; break;
                                            case 'fecvigen':    
                                                    $fec_vigen_tc_tmp = $valor_campo; 
                                                    if (strpos($valor_campo," ") > 0) {
                                                        $split_fec_vigen_tc_tmp = explode(" ", $fec_vigen_tc_tmp);
                                                        $rest_split_vigencia_mes = preg_replace('/[^a-zA-Z0-9.,-_()|#\d]/i', '', $split_fec_vigen_tc_tmp[0]);
                                                        $rest_split_vigencia_anio = preg_replace('/[^a-zA-Z0-9.,-_()|#\d]/i', '', $split_fec_vigen_tc_tmp[1]);

                                                        $c_fecvigen = $rest_split_vigencia_anio.str_pad($rest_split_vigencia_mes,2,"0",STR_PAD_LEFT);
                                                    }
                                                    else{
                                                        $c_fecvigen = $valor_campo; 
                                                    }
                                                    break;
                                            case 'tiptar': $c_tiptar = $valor_campo; break;
                                            case 'clase': $c_clase = $valor_campo; break;
                                            case 'telefono1': $c_telefono1 = $valor_campo; break;
                                            case 'telefono2': $c_telefono2 = $valor_campo; break;
                                            case 'telefono3': $c_telefono3 = $valor_campo; break;
                                            case 'telefono4': $c_telefono4 = $valor_campo; break;
                                            case 'telefono5': $c_telefono5 = $valor_campo; break;
                                            case 'telefono6': $c_telefono6 = $valor_campo; break;
                                            case 'telefono7': $c_telefono7 = $valor_campo; break;
                                            case 'direccion': $c_direccion = $valor_campo; break;
                                            case 'provincia': $c_provincia = $valor_campo; break;
                                            case 'ciudad': $c_ciudad = $valor_campo; break;
                                            case 'prefijo': $c_prefijo = $valor_campo; break;
                                            case 'direccion2': $c_direccion2 = $valor_campo; break;
                                            case 'ciudad2': $c_ciudad2 = $valor_campo; break;
                                            case 'prefijo2': $c_prefijo2 = $valor_campo; break;
                                            case 'estado_cli': $c_estado_cli = $valor_campo; break;
                                            case 'visa': $c_visa = $valor_campo; break;
                                            case 'master': $c_master = $valor_campo; break;
                                            case 'super': $c_super = $valor_campo; break;
                                            case 'austro': $c_austro = $valor_campo; break;
                                            case 'seguro': $c_seguro = $valor_campo; break;
                                            case 'estado': $c_estado = $valor_campo; break;
                                            case 'tipresp': $c_tipresp = $valor_campo; break;
                                            case 'codresp': $c_codresp = $valor_campo; break;
                                            case 'detresp': $c_detresp = $valor_campo; break;
                                            case 'telfnuevo': $c_telfnuevo = $valor_campo; break;
                                            case 'detalle': $c_detalle = $valor_campo; break;
                                            case 'fecha': $c_fecha = $valor_campo; break;
                                            case 'hora': $c_hora = $valor_campo; break;
                                            case 'operador': $c_operador = $valor_campo; break;
                                            case 'codoper': $c_codoper = $valor_campo; break;
                                            case 'activa': $c_activa = $valor_campo; break;
                                            case 'archivo': $c_archivo = $valor_campo; break;
                                            case 'archivo1': $c_archivo1 = $valor_campo; break;
                                            case 'archivo2': $c_archivo2 = $valor_campo; break;
                                            case 'enviada': $c_enviada = $valor_campo; break;
                                            case 'edadanio': $c_edadanio = $valor_campo; break;
                                            case 'edad': $c_edad = $valor_campo; break;
                                            case 'numllama': $c_numllama = $valor_campo; break;
                                            case 'fecreges': $c_fecreges = $valor_campo; break;
                                            case 'h_cliente': $c_h_cliente = $valor_campo; break;
                                            case 'fechcarga': $c_fechcarga = $valor_campo; break;
                                            case 'telcon': $c_telcon = $valor_campo; break;
                                            case 'email': $c_email = $valor_campo; break;
                                            case 'celnuevo': $c_celnuevo = $valor_campo; break;
                                            case 'tipcliente': $c_tipcliente = $valor_campo; break;
                                            case 'titulo': $c_titulo = $valor_campo; break;
                                            case 'env_asi': $c_env_asi = $valor_campo; break;
                                            case 'gestion': $c_gestion = $valor_campo; break;
                                            case 'fechllama': $c_fechllama = $valor_campo; break;
                                            case 'conversa': $c_conversa = $valor_campo; break;
                                            case 'comentario': $c_comentario = $valor_campo; break;
                                            case 'ama_send': $c_ama_send = $valor_campo; break;
                                            case 'ama_status': $c_ama_status = $valor_campo; break;
                                            case 'fecest': $c_fecest = $valor_campo; break;
                                            case 'horaest': $c_horaest = $valor_campo; break;
                                            case 'usmod': $c_usmod = $valor_campo; break;
                                        }  
                                    }
                                    else{
                                        $error_al_mapear++;
                                    }
                            
        
                                }

                                $registro = $c_cedula."|".$c_nombre."|".$c_tarjeta."|".$c_fecvigen."|".$c_telefono3."|".$c_ciudad."|".$c_tiptar."|";
                                $registro = preg_replace('/[^a-zA-Z0-9.,-_()|# \d ]/i', '', $registro);
                                $registro .= "</br>";

                                // TEMPORAL solo para ver lo que esta procesando
                                //echo $registro;
                                
                                if ( $error_al_mapear == 0) // solo inserto si no ha tenido error al Mapear
                                {
                                    try
                                    {
                                        // aquí consulto si el registro ya existe o no en la base para solo insertar los nuevos
                                        $resulta_existe_base_colocacion = cons_existe_base_colocacion($conexion, $c_cedula, $form_cliente_01, $form_producto_01, $form_subproducto_01); 

                                        if ($resulta_existe_base_colocacion->existe > 0){ // el registro ya existe
                                            $contador_repetidos++;

                                            if ( $result_consul_proceso[0]['tipo_dml'] == "UPDATE" )
                                            {   
                                                try
                                                {
                                                    
                                                    // si es respuesta de telemarketing, toca mapear el tipresp con el codresp
                                                    if ( ($form_cliente_01 == "BGR") && ($form_proceso_01 == "PROCESO_03") ) {
                                                        $fx_tipresp = get_tipresp($conexion, $c_codresp);
                                                        $c_tipresp = $fx_tipresp->tipresp;
                                                        //echo "TIPRES = [".$c_tipresp."] [".$c_codresp."]</br>";
                                                    }

                                                    $result_update_carga = actualiza_base_activa($conexion, $c_tipide, $c_cedula, $c_nombre, $c_apellido, $c_cuenta, $c_tarjeta, $c_fecvigen, $c_tiptar, $c_clase, 
                                                    $c_telefono1, $c_telefono2, $c_telefono3, $c_telefono4, $c_telefono5, $c_telefono6, $c_telefono7, $c_direccion, $c_provincia, $c_ciudad, $c_prefijo, 
                                                    $c_direccion2, $c_ciudad2, $c_prefijo2, $c_estado_cli, $c_visa, $c_master, $c_super, $c_austro, $c_seguro, $c_estado, $c_tipresp, $c_codresp, 
                                                    $c_detresp, $c_telfnuevo, $c_detalle, $c_fecha, $c_hora, $c_operador, $c_codoper, $c_activa, $c_archivo, $c_archivo1, $c_archivo2, $c_enviada, 
                                                    $c_edadanio, $c_edad, $c_numllama, $c_fecreges, $c_h_cliente, $c_fechcarga, $c_telcon, $c_email, $c_celnuevo, $c_tipcliente, $c_titulo, $c_env_asi, 
                                                    $c_gestion, $c_fechllama, $c_conversa, $c_comentario, $c_ama_send, $c_ama_status, $c_fecest, $c_horaest, $c_usmod, $form_cliente_01, $form_producto_01, 
                                                    $form_subproducto_01, $result_consul_proceso[0]['estado_proximo'], $result_consul_proceso[0]['desc_proceso'], $usuario_sistema, null, null, null, $form_fecha_01, 
                                                    $target_file, null, null, null, null, null, null, null, null); 
                                                    //$file_base_colocacion, $fileout_telemarketing, $filein_telemarketing, $fileout_banco_info, $filein_banco_info, $fileout_debitos, $filein_debitos, $fileout_factura, $filein_factura
                                                    
                                                    $split_update_carga= explode("|", $result_update_carga);
                                                    if ( $split_update_carga[0] <> "OK") 
                                                    {   
                                                        $errores_generales .= "ERROR: GEN-1 al actualizar registros".$split_update_carga[1];
                                                    }
                                                    else{
                                                        $contador_actualizados++;
                                                    }
                                                    
        
                                                }catch(Exception $e) {
                                                    
                                                    $errores_generales .= "ERROR: GEN-2 al actualizar registros";								
                                                }
                                            }


                                        }
                                        else { 
                                            
                                            if ( $result_consul_proceso[0]['tipo_dml'] == "INSERT" )
                                            {   
                                                try
                                                {
                                                    $result_base_activa = inserta_base_activa($conexion, $c_tipide, $c_cedula, $c_nombre, $c_apellido, $c_cuenta, $c_tarjeta, $c_fecvigen, $c_tiptar, $c_clase, 
                                                    $c_telefono1, $c_telefono2, $c_telefono3, $c_telefono4, $c_telefono5, $c_telefono6, $c_telefono7, $c_direccion, $c_provincia, $c_ciudad, $c_prefijo, 
                                                    $c_direccion2, $c_ciudad2, $c_prefijo2, $c_estado_cli, $c_visa, $c_master, $c_super, $c_austro, $c_seguro, $c_estado, $c_tipresp, $c_codresp, 
                                                    $c_detresp, $c_telfnuevo, $c_detalle, $c_fecha, $c_hora, $c_operador, $c_codoper, $c_activa, $c_archivo, $c_archivo1, $c_archivo2, $c_enviada, 
                                                    $c_edadanio, $c_edad, $c_numllama, $c_fecreges, $c_h_cliente, $c_fechcarga, $c_telcon, $c_email, $c_celnuevo, $c_tipcliente, $c_titulo, $c_env_asi, 
                                                    $c_gestion, $c_fechllama, $c_conversa, $c_comentario, $c_ama_send, $c_ama_status, $c_fecest, $c_horaest, $c_usmod, $form_cliente_01, $form_producto_01, 
                                                    $form_subproducto_01, $result_consul_proceso[0]['estado_actual'], $result_consul_proceso[0]['desc_proceso'], $usuario_sistema, null, null, null, $form_fecha_01, $target_file, null, null, null, null, 
                                                    null, null, null, null); 
        
                                                    $split_base_activa = explode("|", $result_base_activa);
                                                    if ( $split_base_activa[0] <> "OK") 
                                                    {
                                                        $errores_generales .= "ERROR: GEN-1 al insertar registros".$split_base_activa[1];
                                                    }
                                                    else{
                                                        $contador_nuevos++;
                                                    }
        
                                                }catch(Exception $e) {
                                                    $errores_generales .= "ERROR: GEN-2 al insertar registros";								
                                                }	
                                            }

                                        }
                                        

                                    }catch(Exception $e2) {
                                        $errores_generales .= "ERROR: GEN-3 al consultar registros".$txt_mensaje;								
                                    }    
                                }  
                
                                if ($cod_error <> "0"){
                                    $errores_generales .= $txt_mensaje;
                                }
                                
                                if ( strlen($errores_generales) > 0 ) {
                                    $arr_mostrar[$contador] = array(
                                        "linea"    => $contador+1,  
                                        "registro" => $registro,
                                        "error"    => $errores_generales  
                                    );
                                    $contador_errores = $contador_errores + 1;
                                }
                                
                                $contador = $contador + 1;
                        
        
                            }
                            else{
                                $errores_generales .=  "ERROR: Debe borrar la linea en blanco al final del archivo.</br>";
                            }

                        }
                        else{ // el archivo no tiene las cantidad de columnas que requiere el proceso.
                            $contador_errores = -1;
                            $errores_generales .=  "</br>ERROR: Linea [".$contador_alterno."] - El error NO tiene las cantidad de COLUMNAS del archivo . DEBE TENER COLUMNAS = ".$campos_config_en_txt." cols, PERO TIENE = ".$canti_lineas_en_archivo_cargado." cols.";
                        }

                    }	
    
                    fclose($file);	
    
                    
                    if ( $result_consul_proceso[0]['tipo_dml'] == "INSERT" )
                    {
                        if ($contador_errores == 0) {
                            $txt_resultado = "<strong>Total de Registros Gestionados: </strong>".$contador_repetidos."</br><strong>Total de Registros Nuevos:  </strong>".$contador_nuevos;
                            echo "OK|".$target_file."|".$contador."|".$txt_resultado."|";
                        }
                        else{
                            echo "ERROR|".$target_file."|".$contador."|".$errores_generales;
                        }
                    }
                    
                    if ( $result_consul_proceso[0]['tipo_dml'] == "UPDATE" )
                    {
                        if ($contador_errores == 0) {
                            $txt_resultado = "<strong>Total de Registros que Coinciden: </strong>".$contador_repetidos."</br><strong>Total de Registros Actualizados: </strong>".$contador_actualizados."</br><strong>TECNICO:</strong></br>".$errores_generales;
                            echo "OK|".$target_file."|".$contador."|".$txt_resultado."|";
                        }
                        else{
                            if ($contador_errores <> 0) {
                                $txt_resultado = "</br><strong>Resultado de la Carga: </strong>ERROR AL CARGAR</br><strong>Archivo Generado: </strong>".$target_file."</br><strong>Total de Registros que Coinciden: </strong>".$contador_repetidos."</br><strong>Total de Registros Actualizados: </strong>".$contador_actualizados."</br><strong>Detalles de errores: </strong>".$errores_generales;
                                echo "ERROR|".$target_file."|".$contador."|".$txt_resultado;
                            }
                        }
                    }    


                }

        }

    }
    sqlsrv_close($conexion);

?>