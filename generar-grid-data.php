<?php

    require_once 'model.php';
    ini_set('display_errors', 1); ini_set('display_startup_errors', 1); error_reporting(E_ALL);

    $requestData= $_REQUEST;

	$form_cliente_01 = $_POST['form_cliente_01'];
	$form_producto_01 = $_POST['form_producto_01'];  
	$form_subproducto_01 = $_POST['form_subproducto_01'];  
    $form_proceso_01 = $_POST['form_proceso_01']; 

    $clausula_where = "";

    $conexion = conexion_bd();

    $result_consul_proceso = consulta_proceso($conexion, $form_cliente_01, $form_proceso_01);
    if (!isset($result_consul_proceso[0]['campos_en_txt'])) {
        echo "ERROR|No existe un proceso ".$form_proceso_01." configurado para el cliente ".$form_cliente_01.". </br>Comuniquese con el Administrador del Sistema.";
    }
    else
    {
        $extension = $result_consul_proceso[0]['tipo_dml'];
        $delimitador = $result_consul_proceso[0]['delimitador'];
        $clausula_where = $result_consul_proceso[0]["clausula_where"];
        $arr_result_generar_archivo= lista_generar_archivo($conexion, $form_cliente_01, $form_producto_01, $form_subproducto_01, $form_proceso_01, $clausula_where);

        $cant_reg_tot = 0;
        $data = array();
        foreach ($arr_result_generar_archivo as $row) {  // preparing an array
    
            $nestedData=array();  
            $nestedData[] = "<span><p style='text-align: center; padding:0px; margin: 0px;'>".$row["cliente"]."</p></span>";
            $nestedData[] = "<span><p style='text-align: center; padding:0px; margin: 0px;'>".$row["producto"]."</p></span>";
            $nestedData[] = "<span><p style='text-align: center; padding:0px; margin: 0px;'>".$row["subproducto"]."</p></span>";
            $nestedData[] = "<span><p style='text-align: center; padding:0px; margin: 0px;'>".$row["desc_proceso"]."</p></span>";
            $nestedData[] = "<span><p style='text-align: center; padding:0px; margin: 0px;'>".$row["fec_carga"]->format('Y-m-d')."</p></span>";
            $nestedData[] = "<span><p style='text-align: center; padding:0px; margin: 0px;'>".$row["file_base_colocacion"]."</p></span>";
            $nestedData[] = "<span><p style='text-align: center; padding:0px; margin: 0px;'>".$row["existe"]."</p></span>";
    
            $parametros_link = $row["cliente"]."|".$row["producto"]."|".$row["subproducto"]."|".$row["nom_proceso"]."|".$row["fec_carga"]->format('Y-m-d')."|".$row["file_base_colocacion"]."|".$row["estado_reg"]."|".$extension."|".$delimitador."|";
    
            if ($extension == ".xls"){
                $acciones = "<p style='text-align: center; padding:0px; margin: 0px; font-size:12px;'><a title='Descargar Excel' style='color:green;' href='javascript:descarga_general(\"".$parametros_link."\");'>&nbsp;<span class='fa fa-download'></span>&nbsp;".$extension."</a>&nbsp;</p>";
            }

            if ($extension == ".txt"){
                $acciones = "<p style='text-align: center; padding:0px; margin: 0px; font-size:12px;'><a title='Descargar archivo Plano' style='color:green;' href='javascript:descarga_general(\"".$parametros_link."\");'>&nbsp;<span class='fa fa-download'></span>&nbsp;".$extension."</a>&nbsp;</p>";
            }            
            
            $nestedData[] = $acciones;
            $data[] = $nestedData;
            $cant_reg_tot++;
        }
    
        $json_data = array(
                    "draw"            => intval( $requestData['draw'] ),   // for every request/draw by clientside , they send a number as a parameter, when they recieve a response/data they first check the draw number, so we are sending same number in draw.
                    "recordsTotal"    => intval( $cant_reg_tot ),  // total number of records
                    "recordsFiltered" => intval( $cant_reg_tot ), // total number of records after searching, if there is no searching then totalFiltered = totalData
                    "data"            => $data   // total data array
                    );
    
        echo json_encode($json_data);  // send data as json format
    }

    sqlsrv_close($conexion);

?>

