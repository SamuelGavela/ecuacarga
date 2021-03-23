<?php
    ini_set('display_errors', 1); ini_set('display_startup_errors', 1); error_reporting(E_ALL);
    
    require_once 'model.php';
    $conexion = conexion_bd();

    $fec_desde = $_POST["fecha_desde"];
    $fec_hasta = $_POST["fecha_hasta"];
    $cod_plan = $_POST["planes_01"];
    $cod_subplan = $_POST["sub_planes_01"];
    
    /*$fec_desde = "2021-03-01";
    $fec_hasta = "2021-03-01";
    $cod_plan = 9;
    $cod_subplan = 19;*/

    $consulta_desc_plan = get_desc_plan_nova($conexion, $cod_plan);
    $consulta_desc_subplan = get_desc_sub_plan_nova($conexion, $cod_plan, $cod_subplan);
    $arr_consulta_factura_nova = consulta_factura_nova($conexion, $cod_plan, $cod_subplan, $fec_desde, $fec_hasta);

    /***********************************************  E X P O R T  - header ********************************************/
    $nombre_archivo = "exports/NOVA_".str_replace(" ","",$consulta_desc_plan->nombre_plan)."_".str_replace(" ","",$consulta_desc_subplan->nombre_subplan)."-(".$fec_desde."__".$fec_hasta.")(".count($arr_consulta_factura_nova).")_".date("dmYHms").".xls";
    unlink($nombre_archivo);
    $mensaje = "<html>";
    $mensaje.= "<body>";
    $mensaje.= "<table border='1'>";
    $mensaje.= "<tr><td style='text-align:center; font-size:14px; background-color:yellow; color:black; width: 100px;'><strong>ID Cliente</strong></td>";
	$mensaje.= "<td style='text-align:center; font-size:14px; background-color:yellow; color:black; width: 300px;'><strong>Nombres Clientes</strong></td>";
    $mensaje.= "<td style='text-align:center; font-size:14px; background-color:green; color:black; width: 300px;'><strong>Direcci&oacute;n Cliente</strong></td>";
	$mensaje.= "<td style='text-align:center; font-size:14px; background-color:green; color:black; width: 250px;'><strong>Correo Cliente</strong></td>";
	$mensaje.= "<td style='text-align:center; font-size:14px; background-color:green; color:black; width: 100px;'><strong>Cta / TC</strong></td>";
	$mensaje.= "<td style='text-align:center; font-size:14px; background-color:yellow; color:black; width: 100px;'><strong>Fecha D&eacute;bito</strong></td>";
	$mensaje.= "<td style='text-align:center; font-size:14px; background-color:yellow; color:black; width: 100px;'><strong>Valor Debitado</strong></td></tr>";
        
    if($archivo = fopen($nombre_archivo, "a")){
        fwrite($archivo,$mensaje. "\n");
    }

    /***********************************************  E X P O R T  - body ********************************************/
    foreach ($arr_consulta_factura_nova as $row) {  // preparing an array
    	$mensaje = "<tr><td style='font-size:12px;'>=&#34;".$row["identificacion"]."&#34;</td>";
		$mensaje .= "<td style='font-size:12px;'>".$row["asegurado"]."</td>";
    	$mensaje .= "<td style='font-size:12px;'>".$row["direccion"]."</td>";
        $mensaje .= "<td style='font-size:12px;'>".$row["correo"]."</td>";
        $mensaje .= "<td style='font-size:12px;'>".$row["cuenta_tc"]."</td>";
    	$mensaje .= "<td style='font-size:12px;'>=&#34;".$row["fec_archivo"]->format('Y-m-d')."&#34;</td>";
        $mensaje .= "<td style='font-size:12px;'>".$row["prima_neta"]."</td></tr>";

        fwrite($archivo,$mensaje. "\n");
    }
	
    $mensaje = "</table>";
    $mensaje .= "<br />";
    $mensaje .= "</body>";
    $mensaje .= "</html>";
    fwrite($archivo,$mensaje. "\n");
    
    fclose($archivo);

    echo "OK|".$nombre_archivo;

    sqlsrv_close($conexion);    
?>