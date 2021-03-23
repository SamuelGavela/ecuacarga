<?php

/*
##==============================================================================================================

#-- Nombre Fuente         : cargar_archivo_clientes_nova_process.php
#-- Copyright Empresa     : EcuaCodigo S.A.
#-- Fecha Fin Programación: 19/03/2021
#-- Autor                 : Samuel Gavela
#-- Referencia            : Proyecto de Asistencia - Cliente NOVA
#-- Descripción general   : Proceso de lectura de archivos planos txt, realiza
#                           validaciones si los registros existen o no en la estructura ea_datos_clientes_nova
#                           de existir actualiza campos, caso contrario inserta.
##================================================================================================================
 
 */

    require_once 'model.php';
   
    function procesaArchivoDatosClientesNOVA ($target_file, $form_cliente_01, $form_proceso_01, $result_consul_proceso){
    
        $conexion = conexion_bd();
        $resultado_continuar = "OK";
        
             /*   if ( $result_consul_proceso[0]['tipo_dml'] == "INSERT" ){   //Borrar estructura ea_datos_clientes_nova
                            $result_del_datos_clientes_nova = del_datos_clientes_nova($conexion);
                            $split_result_datos_clientes_nova = explode("|", $result_del_datos_clientes_nova);
                            $resultado_continuar = $split_result_datos_clientes_nova[0];
                }
            */
             
                if ( $resultado_continuar == "OK") 
                {

                    $file = fopen($target_file,"r");
                    $contador = 0;
                    $contador_alterno = 0;
                    $contador_nuevos = 0;
                    $contador_repetidos = 0;
                    $contador_actualizados = 0;
                    $contador_errores = 0;
                    $arr_errores = array();
                    $errores_generales = "";

                    $campos_config_en_txt = $result_consul_proceso[0]['campos_en_txt'];
                    

                    //true si, La función feof () comprueba si se ha alcanzado el "final del archivo" (EOF) para un archivo abierto.
                    while(!feof($file))
                    {
                        $linea= null;
                        $error_al_mapear = 0;
                        $linea = fgets($file);
                        $campos_linea = explode(chr(9),$linea);  // chr(9) es el TAB
                        $canti_campos_en_archivo_cargado = count($campos_linea); //cuenta las columnas
                        $contador_alterno++;
                        
                                if ( $canti_campos_en_archivo_cargado == $campos_config_en_txt ){
                                     
                                        $registro = "";
                                        $mensaje_error_completo = "";
                                        $txt_mensaje = "";				

                                        //instancio campos
                                        $c_identificacion   = null;
                                        $c_nombre_cliente   = null;
                                        $c_direccion        = null;
                                        $c_telf_domicilio   = null;
                                        $c_telf_celular	    = null;
                                        $c_email	        = null;
                                        $c_fec_ini_vigencia = null;	
                                        $c_fec_fin_vigencia = null;
                                        $c_plan_nova        = null;
                                        $c_Nro_polizaAseguradora = null;
                                        
                                
                                        for ($posicion = 0; $posicion < $campos_config_en_txt; $posicion++) 
                                        {
                                    
                                            $nombre_campo = consulta_nombre_campo($conexion, $form_proceso_01, $form_cliente_01, false, false,  $posicion);
                                            
                                            $valor_campo = str_replace('"','',$campos_linea[$posicion]);
                                            $valor_campo =  rtrim($valor_campo, "\r\n"); //elimino los pinches saltos de linea en ultimos campos que me generaban error SQL

                                            if(isset($nombre_campo->nom_campo))
                                            {
                                                switch ($nombre_campo->nom_campo) {

                                                    case 'identificacion': $c_identificacion  = $valor_campo; break;
                                                    case 'nombre_cliente': $c_nombre_cliente  = $valor_campo; break;
                                                    case 'direccion'     : $c_direccion       = $valor_campo; break;
                                                    case 'telf_domicilio': $c_telf_domicilio  = $valor_campo; break;
                                                    case 'telf_celular'  : $c_telf_celular    = $valor_campo; break;
                                                    case 'email'         : $c_email           = $valor_campo; break;
                                                    case 'fec_ini_vigencia': $c_fec_ini_vigencia= $valor_campo; break;
                                                    case 'fec_fin_vigencia': $c_fec_fin_vigencia= $valor_campo; break;
                                                    case 'plan_nova'       : $c_plan_nova       = $valor_campo; break;
                                                    case 'Nro_polizaAseguradora':  $c_Nro_polizaAseguradora = $valor_campo; break;
                                                }  
                                            }
                                            else{
                                                $error_al_mapear++;
                                            }
                                    
                
                                        }

                                        $registro = $c_identificacion."|".$c_nombre_cliente."|".$c_direccion."|".$c_telf_domicilio."|".$c_telf_celular."|".$c_email."|".$c_fec_ini_vigencia."|".$c_fec_fin_vigencia."|".$c_plan_nova;
                                        $registro = preg_replace('/[^a-zA-Z0-9.,-_()|# \d ]/i', '', $registro);
                                        $registro .= "</br>";
                                    
                                        //TEMPORAL solo para ver lo que esta procesando
                                        //echo $registro;
                                        if ( $error_al_mapear == 0) // solo inserto si no ha tenido error al Mapear
                                        {
                                            try
                                            {
                                                // aquí consulto si el registro ya existe o no en la base para solo insertar los nuevos
                                                $resulta_existe_cliente_nova = cons_existe_cliente_nova($conexion, $c_identificacion); 
                                               
                                                if ($resulta_existe_cliente_nova->existe > 0){ // el registro ya existe
                                                    $contador_repetidos++;

                                                    try
                                                        {

                                                            $result_update_carga = actualiza_ea_datos_clientes_nova($conexion,
                                                                                                                    $c_identificacion,
                                                                                                                    $c_nombre_cliente,
                                                                                                                    $c_direccion,
                                                                                                                    $c_telf_domicilio,
                                                                                                                    $c_telf_celular,
                                                                                                                    $c_email,
                                                                                                                    $c_fec_ini_vigencia,
                                                                                                                    $c_fec_fin_vigencia,
                                                                                                                    $c_plan_nova,
                                                                                                                    $c_Nro_polizaAseguradora ); 
                                                        
                                                            $split_update_carga= explode("|", $result_update_carga);
                                                            if ( $split_update_carga[0] <> "OK") 
                                                            {   
                                                                $errores_generales .= "ERROR: GEN-1 al actualizar registros".$split_update_carga[1];
                                                            }
                                                            else{
                                                                $contador_actualizados++;
                                                            }

                                                        }catch(Exception $e) {
                                                            
                                                            $errores_generales .= "ERROR: GEN-2 al actualizar registros";								
                                                        }


                                                }
                                                else { 
                                                   
                                                    if ( $result_consul_proceso[0]['tipo_dml'] == "INSERT" )
                                                    {   
                                                        try
                                                        {
                                                            $result_base_activa = insert_ea_datos_clientes_nova($conexion,
                                                                                                                $c_identificacion,
                                                                                                                $c_nombre_cliente,
                                                                                                                $c_direccion,
                                                                                                                $c_telf_domicilio,
                                                                                                                $c_telf_celular,
                                                                                                                $c_email,
                                                                                                                $c_fec_ini_vigencia,
                                                                                                                $c_fec_fin_vigencia,
                                                                                                                $c_plan_nova,
                                                                                                                $c_Nro_polizaAseguradora ); 
                
                                                            $split_base_activa = explode("|", $result_base_activa);
                                                            if ( $split_base_activa[0] <> "OK") 
                                                            {
                                                                $errores_generales .= "ERROR: GEN-1 al insertar registros".$split_base_activa[1];
                                                            }
                                                            else{
                                                                $contador_nuevos++;
                                                            }
                
                                                        }catch(Exception $e) {
                                                            $errores_generales .= "ERROR: GEN-2 al insertar registros";								
                                                        }	
                                                    }

                                                }
                                                

                                            }catch(Exception $e2) {
                                                $errores_generales .= "ERROR: GEN-3 al consultar registros cons_existe_cliente_nova ".$txt_mensaje;								
                                            }    
                                        }  
                        
                                        if ( strlen($errores_generales) > 0 ) {
                                            $arr_mostrar[$contador] = array(
                                                "linea"    => $contador+1,  
                                                "registro" => $registro,
                                                "error"    => $errores_generales  
                                            );
                                            $contador_errores = $contador_errores + 1;
                                        }
                                        
                                        $contador = $contador + 1;
                                
                                }else{ // el archivo no tiene las cantidad de columnas que requiere el proceso.
                                    
                                    if ( !$linea ) { // $linea devuelve FALSE. SI El valor es nulo o esté vacío
                                        $errores_generales .=  "ERROR: Debe borrar la linea en blanco al final del archivo.</br>";
                                        $contador_errores = -1;
                                    }
                                    else{
                                        $contador_errores = -1;
                                        $errores_generales .=  "</br>ERROR: Linea [".$contador_alterno."] - El error NO tiene las cantidad de COLUMNAS del archivo . DEBE TENER COLUMNAS = ".$campos_config_en_txt." cols, PERO TIENE = ".$canti_campos_en_archivo_cargado." cols.";
                                    }
                                }
                    }
                
    
                     fclose($file);	
    
                    
                    if ( $result_consul_proceso[0]['tipo_dml'] == "INSERT" )
                    {
                        if ($contador_errores == 0) {
                            $txt_resultado = "<strong>Total de Registros Gestionados: </strong>".$contador_repetidos."</br><strong>Total de Registros Nuevos:  </strong>".$contador_nuevos;
                            echo "OK|".$target_file."|".$contador."|";
                        }
                        else{
                            echo "ERROR|".$target_file."|".$contador."|".$errores_generales;
                        }
                    }


                }
                
    sqlsrv_close($conexion);
    
    }
?>