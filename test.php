<?php

    ini_set('display_errors', 1); ini_set('display_startup_errors', 1); error_reporting(E_ALL);

    /*$serverName = "LAPTOP-M9UGM1SI\SQLEXPRESS"; 
    $connectionInfo = array( "Database"=>"db_ecuasisec", "UID"=>"usrvri", "PWD"=>"pioyoko2");
    $conn = sqlsrv_connect( $serverName, $connectionInfo);
    
    if( $conn ) {
         echo "Conexión establecida.<br />";
    }else{
         echo "Conexión no se pudo establecer.<br />";
         die( print_r( sqlsrv_errors(), true));
    }

    $sql = "SELECT cod_plan, cod_subplan, nombre_subplan FROM [db_ecuasisec].[dbo].[ea_nov_subplanes] WHERE estado = 'A' ORDER BY orden";
    $result = sqlsrv_query($conn, $sql);
    if($result === false) {
        die(print_r(sqlsrv_errors(), true));
    }
    #Fetching Data by array
    while($row = sqlsrv_fetch_array($result, SQLSRV_FETCH_ASSOC)) {
        print_r($row);echo "</br>";
    }*/

    require_once 'cryp.php';
    require_once 'model.php';
    $conexion = conexion_bd();

 
    /*   
    $array_result = lista_planes($conexion);
    print_r($array_result);
    echo "</br></br>";

    echo "</br></br>";
    $nombre_archivo = 'uploads/20210114_4_39_MENS__02-12-2020TRIMESTRAL.XLSX';
    $cod_plan = 10;
    $cod_subplan = 28;
    $frecuencia = 'ANUA';
    $fec_archivo = "2021-01-06";
    $cant_reg = 1280;
    $cant_reg_err = 3;
    $observacion = 'ninguna';
    $usr_carga = 'VRI';
    $array_result = insert_cab_archivo($conexion, $nombre_archivo, $cod_plan, $cod_subplan, $frecuencia, $cant_reg, $cant_reg_err, $observacion, $usr_carga);


    $result_existe_cab = existe_cab_archivo($conexion, $fec_archivo, $cod_plan, $cod_subplan, $frecuencia);
    if ($result_existe_cab->existe > 0){ echo "ERROR|YA EXISTE"; } else { echo "OK|NUEVO"; } 
    */

    /*echo "</br></br>LISTADO DE CABECERAS</br>";
    $arr_result_lista_cab = lista_cab_archivo($conexion);
    print_r($arr_result_lista_cab);  
     
    $cant_reg_tot = 0;
    $data = array();
    foreach ($arr_result_lista_cab as $row) {  // preparing an array
   
        //[cod_carga] => 1 [archivo_cargado] => 20210106_10_28_MENS__02-12-2020MENSUAL.xls [fec_archivo] => DateTime Object ( [date] => 2021-01-06 00:00:00.000000 [timezone_type] => 3 [timezone] => Europe/Berlin ) [cod_plan] => 10 [cod_subplan] => 28 [frecuencia] => MENS [cant_registros_carga] => 1716 [cant_registros_error] => 0 [estado_carga] => P [observacion] => Costo $2.99 [fec_carga] => DateTime Object ( [date] => 2021-01-25 13:05:26.460000 [timezone_type] => 3 [timezone] => Europe/Berlin ) [usr_carga] => cliente        

    	$nestedData=array();
    	$nestedData[] = "<span>".$row["cod_carga"]."</span>";
        $nestedData[] = "<span>".$row["archivo_cargado"]."</span>";
        $nestedData[] = "<span>".$row["cod_plan"]."</span>";
        $nestedData[] = "<span>".$row["cod_subplan"]."</span>";
        $nestedData[] = "<span>".$row["frecuencia"]."</span>";
    	$nestedData[] = "<span>".$row["fec_archivo"]->format('Y-m-d')."</span>";

    	$cant_reg_tot = count($arr_result_lista_cab);
        $cadena = encriptar($row["cod_carga"]."|".$row["archivo_cargado"]."|".$row["usr_carga"]."|".$row["cod_plan"]."|".$row["cod_subplan"]."|".$row["frecuencia"]."|".$row["cant_registros_carga"]."|0");

    	$nestedData[] = "<a href='javascript:editar(\"".$cadena."\");'>Eliminar</a>";
    	$data[] = $nestedData;
    }
    echo "</br></br></br>";
    var_dump($data);

    echo "</br></br></br>";
    $array_result = get_desc_plan($conexion, 2);
    print_r($array_result);
    echo $array_result->nombre_plan;
    */

    $linea_excel = 98;
    $c_cod_plan = 9;
    $c_cod_subplan = 19;
    $c_no_certificado = "1935802";
    $c_identificacion = "1754209698";
    $c_nro_cuota = 34;


    $existe_det_nova = existe_det_archivo_nova($conexion, $c_cod_plan, $c_cod_subplan, $c_no_certificado, $c_identificacion, $c_nro_cuota);
    var_dump($existe_det_nova);

    if(isset($existe_det_nova[0]["cod_carga"])){
        if ( $existe_det_nova[0]["cod_carga"] > 0 ){
            echo "</br><strong>LINEA DE EXCEL:</strong> ".$linea_excel;
            echo "</br> Registro YA EXISTENTE con Estado: ".$existe_det_nova[0]["estado_registro"];
            echo "</br> Id proceso Carga: ".$existe_det_nova[0]["cod_carga"];
            echo "</br> Fecha de Archivo: ".$existe_det_nova[0]["fec_archivo"]->format('Y-m-d');
            echo "</br> Línea en el Archivo: ".$existe_det_nova[0]["cod_registro"];
        }
    }

?>
