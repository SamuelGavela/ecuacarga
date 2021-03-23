<?php

/*
##==============================================================================================================

#-- Nombre Fuente         : cargar_archivo_clientes_nova.php
#-- Copyright Empresa     : EcuaCodigo S.A.
#-- Fecha Fin Programación: 19/03/2021
#-- Autor                 : Samuel Gavela
#-- Referencia            : Proyecto de Asistencia - Cliente NOVA
#-- Descripción general   : PHP carga el TXT al servidor, valida el ID_PROCESO a ejecutar configurado previamente 
#                           en las tablas:  ea_procesos, ea_config_procesos.
#                           Si el proceso es PROCESO_07 ejecuta metodo para los productos donde el archivos recibe 
#                           email del cliente.
##================================================================================================================
 
 */

session_start();

    if(!isset($_SESSION['user_ecucarga']))
    {
        header("Location: login.php");
    }
    ini_set('display_errors', 1); ini_set('display_startup_errors', 1); error_reporting(E_ALL);
    
    require_once 'model.php';
    require_once 'cargar_archivo_clientes_nova_process.php';

    $conexion = conexion_bd();

    $usuario_sistema = $_SESSION['user_ecucarga'];

    $target_dir = "uploads/";
    $uploadOk = 1;

    $form_cliente_01 = "NOVA";
    $form_producto_01 = $_POST['form_planes'];
    $form_subproducto_01 = $_POST['form_sub_planes'];
    
    $result_consult_rep_dir_email = consulta_rep_dir_email ($conexion, $form_producto_01);
    $form_proceso_01 = $result_consult_rep_dir_email[0]['rep_dir_email'] == 'S' ? 'PROCESO_07' : 'PROCESO_08';

    $result_consul_proceso = consulta_procesos_formatos_nova($conexion, $form_cliente_01, $form_proceso_01); //PROCESO_07 recibe email.
   
    //True because is set, flase because is NULL
    if (!isset($result_consul_proceso[0]['campos_en_txt'])) {
        echo "ERROR|No existe un proceso ".$form_proceso_01." configurado para el cliente ".$form_cliente_01.". </br>Comuniquese con el Administrador del Sistema.";
        $uploadOk = 0;
    }

    //Dada una cadena que contiene una ruta a un archivo o directorio, esta función devolverá el último componente de nombre.
    $nombre_archivo = basename($_FILES["fileToUpload_01"]["name"]);
    $nombre_archivo = preg_replace('([^A-Za-z0-9._-])', '',htmlspecialchars(addslashes(stripslashes($nombre_archivo))));

    $target_file = $target_dir.$nombre_archivo;
    //var_dump ("target_file--> ".$target_file);
    //var_dump ("realpath--> ". realpath($target_file));
    // Borrar archivo si es que ya existe en el servidor.
    if (file_exists($target_file)) {
        unlink( realpath($target_file));
    }   

    
    $imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);

    // Check if file already exists
    if (file_exists($target_file)) {
        echo "ERROR|El archivo ya existe o ya ha sido subido.";
        $uploadOk = 0;
    }

    // Check file size
    if ($_FILES["fileToUpload_01"]["size"] > 500000000) {
        echo "ERROR|El archivo tiene un tamano excesivo, solo se permiten 500 MB.";
        $uploadOk = 0;
    }
    
    // Allow certain file formats
    if($imageFileType != "txt" && $imageFileType != "TXT") {
        echo "ERROR|Solo se permite adjuntar archivos TXT ";
        $uploadOk = 0;
    }

    // Check if $uploadOk is set to 0 by an error
    if ($uploadOk == 1) 
    {
        if (move_uploaded_file($_FILES["fileToUpload_01"]["tmp_name"], $target_file)) 
        {
            procesaArchivoDatosClientesNOVA ($target_file, $form_cliente_01, $form_proceso_01,  $result_consul_proceso);
        }

    }
    sqlsrv_close($conexion);

?>