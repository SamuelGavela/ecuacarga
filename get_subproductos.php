<!DOCTYPE html>
<html lang="es-CL">

<!-- Added by HTTrack --><meta http-equiv="content-type" content="text/html;charset=UTF-8"><!-- /Added by HTTrack -->
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charset="UTF-8" />
    <title>ECUASISTENCIA - Carga Masiva</title>	

    <link rel="shortcut icon" href="../../favicon.ico" type="image/x-icon" />   
    <link media="all" rel="stylesheet" href="http://fonts.googleapis.com/css?family=Noto+Sans:400,700,400italic,700italic&amp;subset=latin,latin-ext" />     
    <link media="all" rel="stylesheet" href="includes/css/bootstrap2.min.css" />    

    <script type="text/javascript" src="includes/js/bootstrap.js"> </script> 
    <script language="JavaScript" type="text/javascript" src="includes/js/lobibox.js"></script>

</head>
<body>
    <?php
        require_once 'model.php';
        $p_cliente = $_GET["p_cliente"];
        $p_producto = $_GET["p_producto"];

        $conexion2 = conexion_bd();

        $array_result = lista_subproductos($conexion2, $p_cliente, $p_producto);
    ?>
    
        <select id="subproducto_01" name="subproducto_01" class="col-md-6 form-control">
                <option value="">Selec. SubProducto</option>
            <?php 
                for ($c_i = 0; $c_i < count($array_result); $c_i++) 
                { 
            ?>
                    <option value="<?php printf($array_result[$c_i]['nom_subproducto']); ?>"><?php printf(utf8_encode($array_result[$c_i]['desc_subproducto'])); ?></option>
            <?php 
                } 
            ?>
        </select> 
    
    <?php
    	sqlsrv_close($conexion2);
    ?> 
</body>