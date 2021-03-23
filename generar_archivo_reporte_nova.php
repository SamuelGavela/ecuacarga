<?php
    ini_set('display_errors', 1); ini_set('display_startup_errors', 1); error_reporting(E_ALL);
    
    require_once 'model.php';
    $conexion = conexion_bd();

    $fec_desde = $_POST["fecha_desde"];
    $fec_hasta = $_POST["fecha_hasta"];
    $tipo_rep = $_POST["tipo_reporte"];

    /*$fec_desde = "2021-03-01";
    $fec_hasta = "2021-03-15";
    $tipo_rep = "SUMAR";*/
    
    $ancho_columnas = 50;
    $titulo_archivo = "NOVA_CANTIDAD_REGISTROS-(".$fec_desde."__".$fec_hasta.")";
    if ( $tipo_rep == "SUMAR" ) {
        $ancho_columnas = 80;
        $titulo_archivo = "NOVA_SUMA_VALOR_DEBITOS-(".$fec_desde."__".$fec_hasta.")";
    }

    $cont_columnas = 1;
    $arr_totales = array();
    $arr_planes_subplanes = array ();

    $array_result_planes = lista_planes_nova($conexion);
    for ($c_i = 0; $c_i < count($array_result_planes); $c_i++) 
    { 
        $cod_plan = $array_result_planes[$c_i]['cod_plan'];
        $desc_plan = $array_result_planes[$c_i]['nombre_plan'];

        $array_result_subplanes = lista_sub_planes_nova($conexion, $cod_plan);
        for ($c_j = 0; $c_j < count($array_result_subplanes); $c_j++) 
        {   $cont_columnas++;
            $cod_subplan = $array_result_subplanes[$c_j]['cod_subplan'];
            $desc_subplan = $array_result_subplanes[$c_j]['nombre_subplan'];
            $arr_subplan = array("cod_plan"=>$cod_plan, "desc_plan"=>$desc_plan, "cod_subplan"=>$cod_subplan, "desc_subplan"=>$desc_subplan );
            $arr_planes_subplanes[] = $arr_subplan;
            $arr_totales[] = 0;
        }         
    }  

    function getDatesFromRange($start, $end, $format = 'Y-m-d') { 
        $array = array(); 
        $interval = new DateInterval('P1D'); 
        $realEnd = new DateTime($end); 
        $realEnd->add($interval); 
        $period = new DatePeriod(new DateTime($start), $interval, $realEnd); 
        foreach($period as $date) {                  
            $array[] = $date->format($format);  
        } 
        return $array; 
    } 

    $arr_rango_fechas = getDatesFromRange($fec_desde, $fec_hasta); 

    $mensaje = "<html>";
    $mensaje .= "<body>";
    $mensaje .= "<table border='1'>";
    $mensaje .= "<tr><td colspan='".$cont_columnas."' style='font-size:28px; text-align:center; background-color:#333333; color:white;'><strong>ARCHIVO DEBITO DIARIO (Del ".$fec_desde." al ".$fec_hasta.")</strong></td></tr>";

    $nombre_archivo = "exports/".$titulo_archivo."_".date("dmYHms").".xls" ;
    if($archivo = fopen($nombre_archivo, "a")){
        fwrite($archivo,$mensaje. "\n");
    }

    // PINTAR TITULO PLANES y SUBPLANES
    $linea1 = "<td style='text-align:center; font-size:12px; background-color:red; color:white;' ></td>";
    $linea2 = "<td style='text-align:center; font-size:12px; background-color:red; color:white; width: 100px;' ><strong>"."FECHAS"."</strong></td>";
    $cod_plan_colspan = 0;
    for($y = 0; $y < count($arr_planes_subplanes); $y++) {
        if ( $cod_plan_colspan <> $arr_planes_subplanes[$y]['cod_plan'] ){
            $cod_plan_colspan = $arr_planes_subplanes[$y]['cod_plan'];
            $cantidad_subplanes = contar_sub_planes_nova($conexion, $arr_planes_subplanes[$y]['cod_plan']);
            $linea1 .= "<td style='text-align:center; font-size:12px; background-color:red; color:white; width: ".$ancho_columnas."px;' colspan='".$cantidad_subplanes->cant_subplanes."' ><strong>".$arr_planes_subplanes[$y]['desc_plan']."</strong></td>";
        }
        $linea2 .= "<td style='text-align:center; font-size:12px; background-color:red; color:white; width: ".$ancho_columnas."px;' ><strong>".$arr_planes_subplanes[$y]['desc_subplan']."</strong></td>";
    }

    $mensaje = "<tr>".$linea1."</tr>";
    fwrite($archivo,$mensaje. "\n");
    
    $mensaje = "<tr>".$linea2."</tr>";
    fwrite($archivo,$mensaje. "\n");

    // PINTAR CONTENIDO DE CANTIDAD DE REGISTROS
    for($x = 0; $x < count($arr_rango_fechas); $x++) {
        $linea3 = "<td style='font-size:12px; background-color:red; color:white;' >".$arr_rango_fechas[$x]."</td>";
        for($y = 0; $y < count($arr_planes_subplanes); $y++) {
            $cant_registros = contar_sumar_registros_nova($conexion, $arr_planes_subplanes[$y]['cod_plan'], $arr_planes_subplanes[$y]['cod_subplan'], $arr_rango_fechas[$x]);
            if ( $tipo_rep == "CONTAR" ){
                $linea3 .= "<td style='font-size:12px;' >".$cant_registros->cant_reg."</td>";
                $arr_totales[$y] = $arr_totales[$y] + $cant_registros->cant_reg;
            }
            elseif ( $tipo_rep == "SUMAR" ){
                $linea3 .= "<td style='font-size:12px;' >".str_replace(".",",",$cant_registros->totales)."</td>";
                $arr_totales[$y] = $arr_totales[$y] + $cant_registros->totales;
            }
            else{
                $linea3 .= "<td style='font-size:12px;' >0</td>";
            }
        }
        $mensaje = "<tr>".$linea3."</tr>";
        fwrite($archivo,$mensaje. "\n");

    }

    // PINTAR TOTALES
    $linea4 = "<td style='font-size:15px; background-color:#333333; color:white;' ><strong>TOTALES:</strong></td>";
    for($x = 0; $x < count($arr_totales); $x++) {
        $linea4 .= "<td style='font-size:15px; background-color:#333333; color:white;' ><strong>".str_replace(".",",",$arr_totales[$x])."</strong></td>";
    }
    $mensaje = "<tr>".$linea4."</tr>";
    fwrite($archivo,$mensaje. "\n");

    
    $mensaje = "</table>";
    $mensaje .= "</body>";
    $mensaje .= "</html>";
    
    fwrite($archivo,$mensaje. "\n");
    fclose($archivo);


    echo "OK|".$nombre_archivo;

    sqlsrv_close($conexion);    
?>