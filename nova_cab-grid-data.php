<?php

    require_once 'model.php';
    require_once 'cryp.php';
    ini_set('display_errors', 1); ini_set('display_startup_errors', 1); error_reporting(E_ALL);

    $requestData= $_REQUEST;

    $conexion = conexion_bd();
    $arr_result_lista_cab = lista_cab_nova($conexion);

    $cant_reg_tot = 0;
    $data = array();
    foreach ($arr_result_lista_cab as $row) {  // preparing an array

        $array_valor_plan = valor_sub_planes_nova($conexion, $row["cod_plan"], $row["cod_subplan"]);
        $total_valor_archivo = $row["cant_registros_carga"] * $array_valor_plan->valor;
        $array_desc_plan = get_desc_plan_nova($conexion, $row["cod_plan"]);
        $array_desc_subplan =get_desc_sub_plan_nova($conexion, $row["cod_plan"], $row["cod_subplan"]);

    	$nestedData=array();

        $cadena = encriptar($row["cod_carga"]."|".$row["archivo_cargado"]."|0");
        $accion_grabar = "<p style='text-align: center; padding:0px; margin: 0px; font-size:15px;'><a title='Grabar' style='color:green;' href='javascript:actualizar_nova_pend_activo(\"".$cadena."\");'>&nbsp;<span class='fa fa-floppy-o'></span></a>&nbsp;</p>";
        $accion_borrar = "<p style='text-align: center; padding:0px; margin: 0px; font-size:15px;'><a title='Eliminar' style='color:red;' href='javascript:eliminar_nova(\"".$cadena."\");'>&nbsp;<span class='fa fa-trash-o'></span></a>&nbsp;</p>";
        $accion_detalle = "<p style='text-align: center; padding:0px; margin: 0px; font-size:15px;'><a title='Ver Detalle' style='color:blue;' href='javascript:ver_detalle_nova(\"".$cadena."\");'>&nbsp;<span class='fa fa-table'></span></a>&nbsp;</p>";

        $nestedData[] = $accion_borrar;
    	$nestedData[] = "<span><p style='text-align: center; padding:0px; margin: 0px;'>".$row["cod_carga"]."</p></span>";
        $nestedData[] = "<span><p style='text-align: center; padding:0px; margin: 0px;'>".$row["archivo_cargado"]."</p></span>";
        $nestedData[] = "<span><p style='text-align: center; padding:0px; margin: 0px;'>".$array_desc_plan->nombre_plan."</p></span>";
        $nestedData[] = "<span><p style='text-align: center; padding:0px; margin: 0px;'>".$array_desc_subplan->nombre_subplan."</p></span>";
        $nestedData[] = "<span><p style='text-align: center; padding:0px; margin: 0px;'>".$row["fec_archivo"]->format('Y-m-d')."</p></span>";
        $nestedData[] = "<span><p style='text-align: center; padding:0px; margin: 0px;'>".$row["cant_registros_carga"]."</p></span>";
        $nestedData[] = "<span style='text-align: right; color:blue;'><p style='text-align: right; padding:0px; margin: 0px;'>$ ".$total_valor_archivo ."&nbsp;&nbsp;&nbsp;&nbsp;</p></span>";
        $nestedData[] = "<span><p style='text-align: center; padding:0px; margin: 0px;'>".$row["usr_carga"]."</p></span>";
        $nestedData[] = $accion_detalle; //"<p style='text-align: center; padding:0px; margin: 0px;'><a href='javascript:verdetalle(\"".$row["cod_carga"]."\");'>Ver Detalle</a></p>";
    	$nestedData[] = $accion_grabar; 

        $data[] = $nestedData;
        $cant_reg_tot = count($arr_result_lista_cab);
    }

    $json_data = array(
    			"draw"            => intval( $requestData['draw'] ),   // for every request/draw by clientside , they send a number as a parameter, when they recieve a response/data they first check the draw number, so we are sending same number in draw.
    			"recordsTotal"    => intval( $cant_reg_tot ),  // total number of records
    			"recordsFiltered" => intval( $cant_reg_tot ), // total number of records after searching, if there is no searching then totalFiltered = totalData
    			"data"            => $data   // total data array
    			);

    echo json_encode($json_data);  // send data as json format

    sqlsrv_close($conexion);

?>

