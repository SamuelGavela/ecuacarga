<?php

    require_once 'model.php';
    ini_set('display_errors', 1); ini_set('display_startup_errors', 1); error_reporting(E_ALL);

	$p_cliente = $_POST['p_cliente'];
    $p_producto = $_POST['p_producto'];
    $p_subproducto = $_POST['p_subproducto'];
    $p_nom_proceso = $_POST['p_nom_proceso'];
    $p_fec_carga = $_POST['p_fec_carga'];
    $p_file_base_colocacion = $_POST['p_file_base_colocacion'];
    $p_estado_reg = $_POST['p_estado_reg'];
    $p_extension = $_POST['p_extension'];
    $p_delimitador = $_POST['p_delimitador'];

    $nombre_archivo = "exports/".$p_cliente."_".$p_producto."_".$p_subproducto."_".$p_nom_proceso."__".date("dmYHms").$p_extension ;
    $conexion = conexion_bd();  

    $result_consul_proceso = consulta_proceso($conexion, $p_cliente, $p_nom_proceso);
    $clausula_where = $result_consul_proceso[0]["clausula_where"];

    /***********************************************  E X P O R T  - EXCEL  INICIO ********************************************/
    if ( $p_extension == ".xls" )
    {
        
        $mensaje = "<html>";
        $mensaje.= "<body>";
        $mensaje.= "<table border='1'>";
        $mensaje.= "<tr>";

        $campos_select_dinamicos = "";
        $primer_campo_dinamico = true;

        $arr_consulta_cab_generar = consulta_cab_datos_generar($conexion, $p_cliente, $p_producto, $p_subproducto, $p_nom_proceso);
        foreach ($arr_consulta_cab_generar as $row) {
            $mensaje.= "<td bgcolor='".$row["color_fondo_cabecera"]."' align='right'><strong><font color='black'>".$row["nom_cabecera"]."</font></strong></td>";
            if ( $row["con_dato_mapeable"] == "SI" ){
                if ($primer_campo_dinamico){
                    $campos_select_dinamicos .= $row["nom_campo"];
                    $primer_campo_dinamico = false;
                }
                else{
                    $campos_select_dinamicos .= ", ".$row["nom_campo"];
                }
            }
        }
        $mensaje.= "</tr>";
            
        if($archivo = fopen($nombre_archivo, "w")){
            fwrite($archivo,$mensaje. "\n");
            fclose($archivo);
        }

        $arr_consulta_det_generar = consulta_det_datos_generar($conexion, $p_cliente, $p_producto, $p_subproducto, $p_nom_proceso, $campos_select_dinamicos, $p_estado_reg, $p_file_base_colocacion, $p_fec_carga, $clausula_where);

        $contador = 0;
        foreach ($arr_consulta_det_generar as $row_det) {  
            $contador++;
            $mensaje = "<tr>";
            foreach ($arr_consulta_cab_generar as $row_cab) {
                if ( $row_cab["con_dato_mapeable"] == "SI" ){
                    $nombre_campo = $row_cab["nom_campo"];
                    $mensaje .= "<td align='right'><font color='#333333'>=&#34;".preg_replace('/[^a-zA-Z0-9.,-_()|# \d ]/i', '', $row_det[$nombre_campo])."&#34;</font></td>";
                }

                if ( $row_cab["con_dato_mapeable"] == "NO" ){
                    $nombre_campo = $row_cab["nom_campo"];
                    $mensaje .= "<td align='right'><font color='#333333'>=&#34;".$nombre_campo."&#34;</font></td>";    
                }

                if ( $row_cab["con_dato_mapeable"] == "SECU" ){
                    $mensaje .= "<td align='right'><font color='#333333'>=&#34;".$contador."&#34;</font></td>";    
                }       

                if ( $row_cab["con_dato_mapeable"] == "HOY" ){
                    $formato_fecha = $row_cab["nom_campo"]; // se guarda en este campo
                    $mensaje .= "<td align='right'><font color='#333333'>=&#34;".date($formato_fecha)."&#34;</font></td>";   
                }                         

            }
            $mensaje .= "</tr>";

            if($archivo = fopen($nombre_archivo, "a")){
                fwrite($archivo,$mensaje. "\n");
                fclose($archivo);
            }
        }
        
        $mensaje = "</table>";
        $mensaje .= "<br />";
        $mensaje .= "</body>";
        $mensaje .= "</html>";
        
        if($archivo = fopen($nombre_archivo, "a")){
            fwrite($archivo,$mensaje. "\n");
            fclose($archivo);
            $p_error = "OK|".$nombre_archivo;
        }
        
    }
    /***********************************************  E X P O R T  - EXCEL  FIN ********************************************/



    /***********************************************  E X P O R T  - TXT  INICIO ********************************************/
    if ( $p_extension == ".txt" )
    {
        
        $campos_select_dinamicos = "";
        $primer_campo_dinamico = true;

        $arr_consulta_cab_generar = consulta_cab_datos_generar($conexion, $p_cliente, $p_producto, $p_subproducto, $p_nom_proceso);
        foreach ($arr_consulta_cab_generar as $row) {
            if ( $row["con_dato_mapeable"] == "SI" ){
                if ($primer_campo_dinamico){
                    $campos_select_dinamicos .= $row["nom_campo"];
                    $primer_campo_dinamico = false;
                }
                else{
                    $campos_select_dinamicos .= ", ".$row["nom_campo"];
                }
            }
        }

        $arr_consulta_det_generar = consulta_det_datos_generar($conexion, $p_cliente, $p_producto, $p_subproducto, $p_nom_proceso, $campos_select_dinamicos, $p_estado_reg, $p_file_base_colocacion, $p_fec_carga, $clausula_where);

        $contador = 0;
        foreach ($arr_consulta_det_generar as $row_det) {  
            $contador++;
            $mensaje = "";
            foreach ($arr_consulta_cab_generar as $row_cab) {
                if ( $row_cab["con_dato_mapeable"] == "SI" ){
                    $nombre_campo = $row_cab["nom_campo"];
                    $mensaje .= preg_replace('/[^a-zA-Z0-9.,-_()|# \d ]/i', '', $row_det[$nombre_campo]);
                }

                if ( $row_cab["con_dato_mapeable"] == "NO" ){
                    $nombre_campo = $row_cab["nom_campo"];
                    $mensaje .= $nombre_campo;    
                }

                if ( $row_cab["con_dato_mapeable"] == "SECU" ){
                    $mensaje .= $contador;    
                }    

                if ( $row_cab["con_dato_mapeable"] == "HOY" ){
                    $formato_fecha = $row_cab["nom_campo"]; // se guarda en este campo
                    $mensaje .= date($formato_fecha);   
                }             
                
                if ($p_delimitador == "TAB") {
                    $mensaje .= chr(9);
                }
                else{
                    $mensaje .= $p_delimitador;
                }
                
            }

            if($archivo = fopen($nombre_archivo, "a")){
                fwrite($archivo,$mensaje. "\n");
                fclose($archivo);
            }
        }

        fclose($archivo);
        $p_error = "OK|".$nombre_archivo;

    }
    /***********************************************  E X P O R T  - TXT  FIN ********************************************/

    echo $p_error;

    sqlsrv_close($conexion);

?>

