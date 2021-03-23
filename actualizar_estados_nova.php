<?php
    require_once 'model.php';
    require_once 'cryp.php';

    $trama_original = $_POST['p_trama'];
    $trama_desencritada = desencriptar($trama_original);
    $trama_cabeceras = explode("|",$trama_desencritada);

    $cod_carga = $trama_cabeceras[0];
    $archivo_cargado = $trama_cabeceras[1];
    $estado_actual = $_POST['p_estado_actual'];
    $estado_nuevo = $_POST['p_estado_nuevo'];
    $observacion = $_POST['p_observacion'];
    $usuario = $_POST['p_usuario'];
    
    $conexion = conexion_bd();
    $arr_result_act_estado_cab = actualizar_estado_cab_archivo_nova($conexion, $cod_carga, $estado_actual, $estado_nuevo, $usuario);
    $arr_result_act_estado_det = actualizar_estado_det_archivo_nova($conexion, $cod_carga, $estado_actual, $estado_nuevo, $observacion, $usuario);
    
    sqlsrv_close($conexion);
    
    unlink("uploads/".$archivo_cargado);

    return "OK|Archivo Borrado";

?>