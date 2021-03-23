<?php
session_start();

    if(!isset($_SESSION['user_ecucarga']))
    {
        header("Location: login.php");
    }
    ini_set('display_errors', 1); ini_set('display_startup_errors', 1); error_reporting(E_ALL);
    
    require_once 'model.php';
    $conexion = conexion_bd();

    $cant_columnas_nova = 13; // cuantas columnas deben tener los archivos NOVA
    $usuario_sistema = $_SESSION['user_ecucarga'];

    function getcolumnrange($min,$max){
        $pointer=strtoupper($min);
        $output=array();
        while(positionalcomparison($pointer,strtoupper($max))<=0){
        array_push($output,$pointer);
        $pointer++;
        }
        return $output;
    }

    function positionalcomparison($a,$b){
    $a1=stringtointvalue($a); $b1=stringtointvalue($b);
    if($a1>$b1)return 1;
    else if($a1<$b1)return -1;
    else return 0;
    }

    function stringtointvalue($str){
    $amount=0;
    $strarra=array_reverse(str_split($str));

    for($i=0;$i<strlen($str);$i++){
        $amount+=(ord($strarra[$i])-64)*pow(26,$i);
    }
    return $amount;
    }
    
    $target_dir = "uploads/";

    $form_planes_01 = $_POST['form_planes_01'];
    $form_sub_planes_01 = $_POST['form_sub_planes_01'];
    $form_fecha_01 = $_POST['form_fecha_01'];

    $result_desc_plan = get_desc_plan_nova($conexion, $form_planes_01);
    $desc_plan = $result_desc_plan->nombre_plan;

    $result_desc_subplan = get_desc_sub_plan_nova($conexion, $form_planes_01, $form_sub_planes_01);
    $desc_subplan = $result_desc_subplan->nombre_subplan;

    $fecha_registro = explode("-", $form_fecha_01);

    $prefijo_archivo = $fecha_registro[0].$fecha_registro[1].$fecha_registro[2]."_".$form_planes_01."_".$form_sub_planes_01."_";

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
    if ($_FILES["fileToUpload_01"]["size"] > 50000000) {
        echo "ERROR|El archivo tiene un tamano excesivo.";
        $uploadOk = 0;
    }
    // Allow certain file formats
    if($imageFileType != "xls" && $imageFileType != "xlsx") {
        echo "ERROR|Solo se permite adjuntar archivos Excel .XLS, .XLSX ";
        $uploadOk = 0;
    }
    // Check if $uploadOk is set to 0 by an error
    if ($uploadOk == 0) {
        echo "ERROR|Su archivo no puede ser subido.";
    // if everything is ok, try to upload file
    } 
    else 
    {
        // consulto si ya existe un archivo cargado para ese PLAN, SUBPLAN, FECHA, FRECUENCIA. Si ya existe el usuario debe borrarlo primero
        $result_existe_cab = existe_cab_archivo_nova($conexion, $form_fecha_01, $form_planes_01, $form_sub_planes_01);
        if ($result_existe_cab->existe > 0){ 
            echo 'ERROR|Ya existe un archivo cargado para el PLAN ('.$desc_plan.'), SUB-PLAN ('.$desc_subplan.'), FECHA ('.$form_fecha_01.'). Debe eliminar el archivo primero. ';
        }
        else
        {
            if (move_uploaded_file($_FILES["fileToUpload_01"]["tmp_name"], $target_file)) 
            {
                require_once 'PHPExcel/Classes/PHPExcel.php';
                $inputFileType = PHPExcel_IOFactory::identify($target_file);
                $objReader = PHPExcel_IOFactory::createReader($inputFileType);
                $objPHPExcel = $objReader->load($target_file);
                $sheet = $objPHPExcel->getSheet(0); 
                //SGA - CANTIDAD DE REGISTROS DEL EXCEL
                $highestRow = $sheet->getHighestRow(); 
                $highestColumn = $sheet->getHighestColumn();  
                $arr_universo_col_excel = getcolumnrange('A','JZ');
                $cant_col_archivo = array_search($highestColumn,$arr_universo_col_excel);

                $cant_fil_archivo = $highestRow - 2;
                $cant_col_archivo++;
                $error_validacion_basica = true;

                $array_valor_plan = valor_sub_planes_nova($conexion, $form_planes_01, $form_sub_planes_01);
                $observacion = "Costo $".$array_valor_plan->valor;

                if ($cant_columnas_nova <> $cant_col_archivo){
                    echo 'ERROR|Los archivos excel de NOVA deben tener '.$cant_columnas_nova.' columnas. Este archivo tiene: '.$cant_col_archivo;
                    $error_validacion_basica = false;
                }

                $error_valor = false; $cont_error_valor = 0; $ultimo_valor_diferente = 0;
                //SGA - RECORRE LA DATA
                for ($row = 2; $row <= ($highestRow-1); $row++){
                    if ( $array_valor_plan->valor <> $sheet->getCell("G".$row)->getValue() ){ 
                        $error_valor = true;     
                        $cont_error_valor++;
                        $ultimo_valor_diferente = $sheet->getCell("G".$row)->getValue();
                    }
                }

                if ( $error_valor ){ 
                    echo 'ERROR|El valor de este plan debe ser $'.$array_valor_plan->valor.', pero tiene '.$cont_error_valor.' filas con un valor Erroneo. Valor erroneo encontrado en el archivo: $'.$ultimo_valor_diferente;
                    $error_validacion_basica = false;
                }

                if ($error_validacion_basica){

                    $error_cabecera = false;
                    $desc_error_cabecera = "";
                    $error_detalle = false; 
                    $error_detalle_duplicado = false; 
                    $desc_error_detalle = "</br>Error al Insertar Detalle:</br>";

                    $result_insert_cab = insert_cab_archivo_nova($conexion, $prefijo_archivo."_".$nombre_archivo, $form_fecha_01, $form_planes_01, $form_sub_planes_01, $cant_fil_archivo, 0, $observacion, $usuario_sistema);
                   
                    if ( $result_insert_cab == 0 ){
                        $error_cabecera = true;
                        $desc_error_cabecera = "Error al Inserta la Cabecera del archivo [".$prefijo_archivo."_".$nombre_archivo."|".$form_fecha_01."|".$form_planes_01."|".$form_sub_planes_01."|".$cant_fil_archivo."|0|".$observacion."|".$usuario_sistema."]";
                    }
                   
                    if (!$error_cabecera){
                        $cont_filas_detalle = 0;
                        //var_dump("result_insert_cab: ".$result_insert_cab);  
                        for ($row = 2; $row <= ($highestRow-1); $row++)
                        {
                            $cont_filas_detalle++;
                            

                            $c_cod_carga = $result_insert_cab;
                            $c_cod_registro = $cont_filas_detalle;
                            $c_no_proceso = preg_replace('/[^0-9]+/', '', $sheet->getCell("A".$row)->getValue());
                            $c_no_certificado = preg_replace('/[^0-9]+/', '', $sheet->getCell("B".$row)->getValue());
                            $c_asegurado = utf8_decode($sheet->getCell("C".$row)->getValue());
                            $c_identificacion = preg_replace('/[^0-9]+/', '', $sheet->getCell("D".$row)->getValue());
                            $c_estado = utf8_decode($sheet->getCell("E".$row)->getValue());
                            $c_nro_cuota = preg_replace('/[^0-9]+/', '', $sheet->getCell("F".$row)->getValue() );
                            $c_prima_neta = str_replace(",",".",preg_replace('/[^0-9.,]+/', '', $sheet->getCell("G".$row)->getValue() ));
                            $c_limite = str_replace(",",".",preg_replace('/[^0-9.,]+/', '', $sheet->getCell("H".$row)->getValue() ));
                            $c_nro_total_cuotas = preg_replace('/[^0-9]+/', '', $sheet->getCell("I".$row)->getValue());
                            $c_observaciones = utf8_decode($sheet->getCell("J".$row)->getValue());
                            $c_tipo_cuenta = utf8_decode($sheet->getCell("K".$row)->getValue());
                            $c_excluir = utf8_decode($sheet->getCell("L".$row)->getValue());
                            $c_motivo_excluir = utf8_decode($sheet->getCell("M".$row)->getValue());
                            $c_fec_archivo = $form_fecha_01;
                            $c_cod_plan = $form_planes_01;
                            $c_nombre_plan = $desc_plan;
                            $c_cod_subplan = $form_sub_planes_01;
                            $c_nombre_subplan = $desc_subplan;
                            $c_estado_registro = 'P';
                            $c_observacion_registro = 'Pendiente de grabar';
                            $c_usr_modificacion = $usuario_sistema;
                            
                            //echo "</br></br>".$c_cod_carga.",".$c_cod_registro.",".$c_no_proceso.",".$c_no_certificado.",".$c_asegurado.",".$c_identificacion.",".$c_estado.",".$c_nro_cuota.",".$c_prima_neta.",".$c_limite.",".$c_nro_total_cuotas.",".$c_observaciones.",".$c_tipo_cuenta.",".$c_excluir.",".$c_motivo_excluir.",".$c_fec_archivo.",".$c_cod_plan.",".$c_nombre_plan.",".$c_cod_subplan.",".$c_nombre_subplan.",".$c_estado_registro.",".$c_observacion_registro.",".$c_usr_modificacion."</br></br>";
                            
                            $existe_det_nova = existe_det_archivo_nova($conexion, $c_cod_plan, $c_cod_subplan, $c_no_certificado, $c_identificacion, $c_nro_cuota);
                            if(isset($existe_det_nova[0]["cod_carga"])){
                                if ( $existe_det_nova[0]["cod_carga"] > 0 ){
                                    $error_detalle_duplicado = true; 
                                    $error_detalle = true; 
                                    $linea_excel = $cont_filas_detalle + 1;
                                    $desc_error_detalle .= "<strong>ERROR DUPLICADO: </strong> Linea de Excel # ".$linea_excel.", Registro YA EXISTE con Estado: ".$existe_det_nova[0]["estado_registro"]." , Id proceso Carga: ".$existe_det_nova[0]["cod_carga"]." , Fecha de Archivo: ".$existe_det_nova[0]["fec_archivo"]->format('Y-m-d')." , Línea en el Archivo: ".$existe_det_nova[0]["cod_registro"]." </br>";
        
                                }
                            }

                        if ( !$error_detalle_duplicado ){
                                $result_insert_det_nova = insert_det_archivo_nova($conexion, $c_cod_carga, $c_cod_registro, $c_no_proceso, $c_no_certificado, $c_asegurado, $c_identificacion, $c_estado, $c_nro_cuota, $c_prima_neta, $c_limite, $c_nro_total_cuotas, $c_observaciones, $c_tipo_cuenta, $c_excluir, $c_motivo_excluir, $c_fec_archivo, $c_cod_plan, $c_nombre_plan, $c_cod_subplan, $c_nombre_subplan, $c_estado_registro, $c_observacion_registro, $c_usr_modificacion);
                                $arr_result_insert_det_nova = explode("|",$result_insert_det_nova);
                                if ($arr_result_insert_det_nova[0] <> "OK"){
                                    $error_detalle = true; 
                                    $linea_excel = $cont_filas_detalle + 1;
                                    $desc_error_detalle .= "<strong>ERROR: </strong> Linea de Excel # ".$linea_excel.", Error Tecnico [".$arr_result_insert_det_nova[1] ."] </br>";
                                }
                            }
    
                        }
                    }
 

                    if ( $error_cabecera || $error_detalle) {
                        echo "ERROR|CAB=[".$desc_error_cabecera."] DET=[".$desc_error_detalle."]";
                        if ( isset($c_cod_carga) ){
                            $res_del_cab_nova_error = del_cab_archivo_nova($conexion, $c_cod_carga);
                            $res_del_det_nova_error = del_det_archivo_nova($conexion, $c_cod_carga);
                        }
                        unlink($target_file);
                    }
                    else{
                        echo "OK|".$prefijo_archivo."_".$nombre_archivo."|";
                    }                    
                    

                }
                else{
                    unlink($target_file); // borro el archivo subido porque no cumple el formato
                }

            } else 
            {
                echo 'ERROR|Se produjo un error al cargar el archivo.  ['.$target_file.'] ';
            }

        }

    }
    sqlsrv_close($conexion);

?>