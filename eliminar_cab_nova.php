<?php
    require_once 'model.php';
    require_once 'cryp.php';

    $trama_original = $_POST['p_trama'];
    $trama_desencritada = desencriptar($trama_original);
    $trama_cabeceras = explode("|",$trama_desencritada);

    $cod_carga = $trama_cabeceras[0];
    $archivo_cargado = $trama_cabeceras[1];

    $conexion = conexion_bd();
    $arr_result_del_cab = del_cab_archivo_nova($conexion, $cod_carga);
    $arr_result_del_det = del_det_archivo_nova($conexion, $cod_carga);
    
    sqlsrv_close($conexion);
    
    unlink("uploads/".$archivo_cargado);

    return "OK|Archivo Borrado";

?>