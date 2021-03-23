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

    $form_fecha_01 = $_POST['form_fecha_01'];
    $fecha_registro = explode("-", $form_fecha_01);
    $prefijo_archivo = $fecha_registro[0].$fecha_registro[1].$fecha_registro[2]."_";

    $nombre_archivo = basename($_FILES["fileToUpload_01"]["name"]);
    $nombre_archivo = preg_replace('([^A-Za-z0-9._-])', '',htmlspecialchars(addslashes(stripslashes($nombre_archivo))));

    $target_file = $target_dir.$prefijo_archivo."_".$nombre_archivo;

    // Borrar archivo si es que ya existe en el servidor.
    if (file_exists($target_file)) {
        unlink($target_file);
    }   

    $uploadOk = 1;
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
    if ($uploadOk == 0) {
        echo "ERROR|Su archivo no puede ser subido.";
    } 
    else 
    {

        if (move_uploaded_file($_FILES["fileToUpload_01"]["tmp_name"], $target_file)) 
        {
                //Borrar Base Activa Actual
                $result_del_base_activa = del_base_activa($conexion);
                $split_result_delete = explode("|", $result_del_base_activa);
                
                if ( $split_result_delete[0] == "OK") 
                {

                    $file = fopen($target_file,"r");
                    $contador = 0;
                    $contador_errores = 0;
                    $arr_errores = array();
                    $errores_generales = "";
                    
                    while(!feof($file))
                    {
                        //echo "[".$contador."] ";
                        $linea = fgets($file);
                        $campos_linea = explode(chr(9),$linea);  // chr(9) es el TAB
                        if(isset($campos_linea[1]))
                        {
                            $registro = "";
                            $mensaje_error_completo = "";
                            $cod_error = "0";	
                            $txt_mensaje = "";								
                            
                            $campos_linea[0] = str_replace('"','',$campos_linea[0]); //
                            $campos_linea[1] = str_replace('"','',$campos_linea[1]); //
                            $campos_linea[2] = str_replace('"','',$campos_linea[2]); //
                            $campos_linea[3] = str_replace('"','',$campos_linea[3]); //
                            $campos_linea[4] = str_replace('"','',$campos_linea[4]); //
                            $campos_linea[5] = "18009XXX888777"; //str_replace('"','',$campos_linea[5]); //
                            $campos_linea[6] = "012020"; //str_replace('"','',$campos_linea[6]); //
                            $campos_linea[7] = str_replace('"','',$campos_linea[7]); //
                            $campos_linea[8] = str_replace('"','',$campos_linea[8]); //
                            $campos_linea[9] = str_replace('"','',$campos_linea[9]); //
                            $campos_linea[10] = str_replace('"','',$campos_linea[10]); //
                            $campos_linea[11] = str_replace('"','',$campos_linea[11]); //
                            $campos_linea[12] = str_replace('"','',$campos_linea[12]); //
                            $campos_linea[13] = str_replace('"','',$campos_linea[13]); //
                            $campos_linea[14] = str_replace('"','',$campos_linea[14]); //
                            $campos_linea[15] = str_replace('"','',$campos_linea[15]); //
                            $campos_linea[16] = str_replace('"','',$campos_linea[16]); //
                            $campos_linea[17] = str_replace('"','',$campos_linea[17]); //
                            $campos_linea[18] = str_replace('"','',$campos_linea[18]); //
                            $campos_linea[19] = str_replace('"','',$campos_linea[19]); //
                            $campos_linea[20] = str_replace('"','',$campos_linea[20]); //
                            $campos_linea[21] = str_replace('"','',$campos_linea[21]); //
                            $campos_linea[22] = str_replace('"','',$campos_linea[22]); //
                            $campos_linea[23] = str_replace('"','',$campos_linea[23]); //
                            $campos_linea[24] = str_replace('"','',$campos_linea[24]); //
                            $campos_linea[25] = str_replace('"','',$campos_linea[25]); //
                            $campos_linea[26] = str_replace('"','',$campos_linea[26]); //
                            $campos_linea[27] = str_replace('"','',$campos_linea[27]); //
                            $campos_linea[28] = str_replace('"','',$campos_linea[28]); //
                            $campos_linea[29] = str_replace('"','',$campos_linea[29]); //
                            $campos_linea[30] = str_replace('"','',$campos_linea[30]); //
                            $campos_linea[31] = str_replace('"','',$campos_linea[31]); //
                            $campos_linea[32] = str_replace('"','',$campos_linea[32]); //
                            $campos_linea[33] = str_replace('"','',$campos_linea[33]); //
                            $campos_linea[34] = str_replace('"','',$campos_linea[34]); //
                            $campos_linea[35] = str_replace('"','',$campos_linea[35]); //
                            $campos_linea[36] = str_replace('"','',$campos_linea[36]); //
                            $campos_linea[37] = str_replace('"','',$campos_linea[37]); //
                            $campos_linea[38] = str_replace('"','',$campos_linea[38]); //
                            $campos_linea[39] = str_replace('"','',$campos_linea[39]); //
                            $campos_linea[40] = str_replace('"','',$campos_linea[40]); //
                            $campos_linea[41] = str_replace('"','',$campos_linea[41]); //
                            $campos_linea[42] = str_replace('"','',$campos_linea[42]); //
                            $campos_linea[43] = str_replace('"','',$campos_linea[43]); //
                            $campos_linea[44] = str_replace('"','',$campos_linea[44]); //
                            $campos_linea[45] = str_replace('"','',$campos_linea[45]); //
                            $campos_linea[46] = str_replace('"','',$campos_linea[46]); //
                            $campos_linea[47] = str_replace('"','',$campos_linea[47]); //
                            $campos_linea[48] = str_replace('"','',$campos_linea[48]); //
                            $campos_linea[49] = str_replace('"','',$campos_linea[49]); //
                            $campos_linea[50] = str_replace('"','',$campos_linea[50]); //
                            $campos_linea[51] = str_replace('"','',$campos_linea[51]); //
                            $campos_linea[52] = str_replace('"','',$campos_linea[52]); //
                            $campos_linea[53] = str_replace('"','',$campos_linea[53]); //
                            $campos_linea[54] = str_replace('"','',$campos_linea[54]); //
                            $campos_linea[55] = str_replace('"','',$campos_linea[55]); //
                            $campos_linea[56] = str_replace('"','',$campos_linea[56]); //
                            $campos_linea[57] = str_replace('"','',$campos_linea[57]); //
                            $campos_linea[58] = str_replace('"','',$campos_linea[58]); //

                            if ( !isset($campos_linea[59]) )
                            {   
                                $linea = fgets($file);
                                $linea_para_buscar = '00'.$linea;
                                $posicion = strpos($linea_para_buscar, '"');
                                while ( $posicion < 1 ){
                                    $campos_linea[58] .= " ".preg_replace('/[^a-zA-Z0-9.,-_()|# \d ]/i', '', $linea);   
                                    $linea = fgets($file); 
                                    $linea_para_buscar = '00'.$linea;
                                    $posicion = strpos($linea_para_buscar, '"');
                                }
                                if ($posicion > 1){
                                    $campos_linea_sub = explode(chr(9),$linea);  // chr(9) es el TAB
                                    $campos_linea[58] .= " ".preg_replace('/[^a-zA-Z0-9.,-_()|# \d ]/i', '', $campos_linea_sub[0]);   
                                    $campos_linea[59] = str_replace('"','',$campos_linea_sub[1]); //  
                                    $campos_linea[60] = str_replace('"','',$campos_linea_sub[2]); //
                                    $campos_linea[61] = str_replace('"','',$campos_linea_sub[3]); //
                                    $campos_linea[62] = str_replace('"','',$campos_linea_sub[4]); //
                                    $campos_linea[63] = str_replace('"','',$campos_linea_sub[5]); //
                                    $campos_linea[64] = str_replace('"','',$campos_linea_sub[6]); //  
                                }
    
                            }
                            else{
                                    $campos_linea[59] = str_replace('"','',$campos_linea[59]); //
                                    if ( !isset($campos_linea[60] ) )
                                    {   
                                        $linea = fgets($file);
                                        $linea_para_buscar = '00'.$linea;
                                        $posicion = strpos($linea_para_buscar, '"');
                                        while ( $posicion < 1){
                                            $campos_linea[59] .= " ".preg_replace('/[^a-zA-Z0-9.,-_()|# \d ]/i', '', $linea);   
                                            $linea = fgets($file); 
                                            $linea_para_buscar = '00'.$linea;
                                            $posicion = strpos($linea_para_buscar, '"');
                                        }
                                        if ($posicion > 1){
                                            $campos_linea_sub = explode(chr(9),$linea);  // chr(9) es el TAB
                                            $campos_linea[59] .= " ".preg_replace('/[^a-zA-Z0-9.,-_()|# \d ]/i', '', $campos_linea_sub[0]);  
                                            $campos_linea[60] = str_replace('"','',$campos_linea_sub[1]); //
                                            $campos_linea[61] = str_replace('"','',$campos_linea_sub[2]); //
                                            $campos_linea[62] = str_replace('"','',$campos_linea_sub[3]); //
                                            $campos_linea[63] = str_replace('"','',$campos_linea_sub[4]); //
                                            $campos_linea[64] = str_replace('"','',$campos_linea_sub[5]); //  
                                        }                                    
                                        
                                    }
                                    else{
                                        $campos_linea[60] = str_replace('"','',$campos_linea[60]); //
                                        $campos_linea[61] = str_replace('"','',$campos_linea[61]); //
                                        $campos_linea[62] = str_replace('"','',$campos_linea[62]); //
                                        $campos_linea[63] = str_replace('"','',$campos_linea[63]); //
                                        $campos_linea[64] = str_replace('"','',$campos_linea[64]); //                                       
                                    }
       
                    
                            }       
                            
                            // INI Formatear campos fecha que vienen mm/dd/yyyy y se los requiere yyyy-mm-dd
                            if ($campos_linea[35] == "/  /"){
                                $campos_linea[35] = null;
                            }
                            else{
                                $campos_linea_35 = explode("/", $campos_linea[35]);
                                $campos_linea[35] = $campos_linea_35[2]."-".$campos_linea_35[0]."-".$campos_linea_35[1];
                            }

                            if ($campos_linea[47] == "/  /"){
                                $campos_linea[47] = null;
                            }
                            else{
                                $campos_linea_47 = explode("/", $campos_linea[47]);
                                $campos_linea[47] = $campos_linea_47[2]."-".$campos_linea_47[0]."-".$campos_linea_47[1];
                            }
                            
                            if ($campos_linea[49] == "/  /"){
                                $campos_linea[49] = null;
                            }
                            else{
                                $campos_linea_49 = explode("/", $campos_linea[49]);
                                $campos_linea[49] = $campos_linea_49[2]."-".$campos_linea_49[0]."-".$campos_linea_49[1];
                            }  
                            
                            if ($campos_linea[57] == "/  /     :  :"){
                                $campos_linea[57] = null;
                            }
                            else{
                                $campos_linea_57 = explode(" ", $campos_linea[57]);
                                $campos_linea_57_fecha = explode("/", $campos_linea_57[0]);
                                $campos_linea_57_hora = explode(":", $campos_linea_57[1]);
                                $campos_linea[57] = $campos_linea_57_fecha[2]."-".$campos_linea_57_fecha[0]."-".$campos_linea_57_fecha[1]." ".$campos_linea_57[1];
                            }  
                            
                            if ($campos_linea[62] == "/  /"){
                                $campos_linea[62] = null;
                            }
                            else{
                                $campos_linea_62 = explode("/", $campos_linea[62]);
                                $campos_linea[62] = $campos_linea_62[2]."-".$campos_linea_62[0]."-".$campos_linea_62[1];
                            }                            

                            // FIN de formateo de fechas                              

    
                            $registro = $campos_linea[0]."|".$campos_linea[1]."|".$campos_linea[2]."|".$campos_linea[3]."|".$campos_linea[4]."|".$campos_linea[5]."|".$campos_linea[6]."|".$campos_linea[7]."|".$campos_linea[8]."|".$campos_linea[9]."|".$campos_linea[10]."|".$campos_linea[11]."|".$campos_linea[12]."|".$campos_linea[13]."|".$campos_linea[14]."|".$campos_linea[15]."|".$campos_linea[16]."|".$campos_linea[17]."|".$campos_linea[18]."|".$campos_linea[19]."|".$campos_linea[20]."|".$campos_linea[21]."|".$campos_linea[22]."|".$campos_linea[23]."|".$campos_linea[24]."|".$campos_linea[25]."|".$campos_linea[26]."|".$campos_linea[27]."|".str_replace("%","",$campos_linea[28])."|".$campos_linea[29]."|".$campos_linea[30]."|".$campos_linea[31]."|".$campos_linea[32]."|".$campos_linea[33]."|".$campos_linea[34]."|".$campos_linea[35]."|".$campos_linea[36]."|".$campos_linea[37]."|".$campos_linea[38]."|".$campos_linea[39]."|";
                            $registro .= $campos_linea[40]."|".$campos_linea[41]."|".$campos_linea[42]."|".$campos_linea[43]."|".$campos_linea[44]."|".$campos_linea[45]."|".$campos_linea[46]."|".$campos_linea[47]."|".$campos_linea[48]."|".$campos_linea[49]."|".$campos_linea[50]."|".$campos_linea[51]."|".$campos_linea[52]."|".$campos_linea[53]."|".$campos_linea[54]."|".$campos_linea[55]."|".$campos_linea[56]."|".$campos_linea[57]."|=".$campos_linea[58]."|*".$campos_linea[59]."|".$campos_linea[60]."|".$campos_linea[61]."|".$campos_linea[62]."|".$campos_linea[63]."|".$campos_linea[64]."|";
                            $registro = preg_replace('/[^a-zA-Z0-9.,-_()|# \d ]/i', '', $registro);
                            $registro .= "</br>";
    
    
                            // TEMPORAL solo para ver lo que esta procesando
                            //echo $registro."</br>";
    
                            try{
                                $result_base_activa = inserta_base_activa($conexion, $campos_linea[0], $campos_linea[1], $campos_linea[2], $campos_linea[3], $campos_linea[4], $campos_linea[5],
                                        $campos_linea[6], $campos_linea[7], $campos_linea[8], $campos_linea[9], $campos_linea[10], $campos_linea[11], 
                                        $campos_linea[12], $campos_linea[13], $campos_linea[14], $campos_linea[15], $campos_linea[16], $campos_linea[17], $campos_linea[18],
                                        $campos_linea[19], $campos_linea[20], $campos_linea[21], $campos_linea[22], $campos_linea[23], $campos_linea[24], 
                                        $campos_linea[25], $campos_linea[26], $campos_linea[27], $campos_linea[28], $campos_linea[29], $campos_linea[30], $campos_linea[31], 
                                        $campos_linea[32], $campos_linea[33], $campos_linea[34], $campos_linea[35], $campos_linea[36], $campos_linea[37], 
                                        $campos_linea[38], $campos_linea[39], $campos_linea[40], $campos_linea[41], $campos_linea[42], $campos_linea[43], 
                                        $campos_linea[44], $campos_linea[45], $campos_linea[46], $campos_linea[47], $campos_linea[48], $campos_linea[49], $campos_linea[50], 
                                        $campos_linea[51], $campos_linea[52], $campos_linea[53], $campos_linea[54], $campos_linea[55], $campos_linea[56], 
                                        $campos_linea[57], $campos_linea[58], $campos_linea[59], $campos_linea[60], $campos_linea[61], $campos_linea[62],
                                        $campos_linea[63], $campos_linea[64],'GENCLI','GENPRO','GENSUBPRO','A','AUTOMATICO BASE ACTIVA','AUTOM', null, null, null, $form_fecha_01, $target_file,
                                        null, null, null, null, null, null, null, null
                                         );

                                        $split_base_activa = explode("|", $result_base_activa);
                                        if ( $split_base_activa[0] <> "OK") 
                                        {
                                            $mensaje_error_completo .= "ERROR: GEN-1 al insertar registro de Base Activa".$split_base_activa[1];
                                        }

                            }catch(Exception $e) {
                                $mensaje_error_completo .= "ERROR: GEN-2 al insertar registro de Base Activa".$txt_mensaje;								
                            }	
            
                            if ($cod_error <> "0"){
                                $mensaje_error_completo .= $txt_mensaje;
                            }
                            
                            if ( strlen($mensaje_error_completo) > 0 ) {
                                $arr_mostrar[$contador] = array(
                                    "linea"    => $contador+1,  
                                    "registro" => $registro,
                                    "error"    => $mensaje_error_completo  
                                );
                                $contador_errores = $contador_errores + 1;
                            }
                            
                            $contador = $contador + 1;
                    
    
                        }
                        else{
                            $errores_generales .=  "ERROR: Debe borrar la linea en blanco al final del archivo.</br>";
                        }
                    }	
    
                    fclose($file);	
    
                    if ($contador_errores == 0) {
                        echo "OK|$target_file [".$contador."] lineas";
                    }
                    else{
                        echo "ERROR|".json_encode($arr_mostrar);
                    }

                }

        }

    }
    sqlsrv_close($conexion);

?>