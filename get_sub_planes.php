<!DOCTYPE html>
<html lang="es-CL">

<!-- Added by HTTrack --><meta http-equiv="content-type" content="text/html;charset=UTF-8"><!-- /Added by HTTrack -->
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="format-detection" content="telephone=no" />
    <meta charset="UTF-8" />
    <link rel="canonical" href="index.html" />
    
    <title>ECUASISTENCIA - Carga Masiva</title>	
    
    <!-- CSS comunes -->
    <link rel="shortcut icon" href="../../favicon.ico" type="image/x-icon" />   
    <link media="all" rel="stylesheet" href="http://fonts.googleapis.com/css?family=Noto+Sans:400,700,400italic,700italic&amp;subset=latin,latin-ext" />     
    <link media="all" rel="stylesheet" href="includes/css/bootstrap2.min.css" />    
    <link media="all" rel="stylesheet" href="includes/css/structure-style.css" />
    <link media="all" rel="stylesheet" href="includes/css/content-style.css" />
    <link media="all" rel="stylesheet" href="includes/css/commercial-structure-style.css" />
    <link media="all" rel="stylesheet" href="includes/css/commercial-content-style.css" />
    <link media="all" rel="stylesheet" href="includes/css/mediaelementplayer.css" />
    <link media="all" rel="stylesheet" href="includes/css/mejs-skins.css" />
    <link media="all" rel="stylesheet" href="includes/css/stylecookies.css" />
    <link media="all" rel="stylesheet" href="includes/css/mapfreatlas-style.css" />
    <link media="all" rel="stylesheet" href="includes/css/formValidation.min.css" />
    <link media="all" rel="stylesheet" href="includes/css/Lobibox.min.css"/>
    <link media="all" rel="stylesheet" href="includes/css/font-awesome.min.css"/>
      

    <!-- JS comunes -->
    <script src="includes/js/i18n.data.js"></script>
    <script src="includes/js/jquery-2.2.0.min.js"></script>
    <script src="includes/js/jquery.main.js"></script>
    <script src="includes/js/jquery.commercial.js"></script>
    <script src="includes/js/funciones-comunes.js"></script>
    <script src="includes/js/bootstrap-paginator.js"></script>
    <script type="text/javascript" src="includes/js/bootstrap.js"> </script> 
    <script language="JavaScript" type="text/javascript" src="includes/js/lobibox.js"></script>
    
    <!-- CSS impresion -->
    <link media="print" rel="stylesheet" href="includes/css/print-style.css" />
    <link media="print" rel="stylesheet" href="includes/css/commercial-print.css" />
    

</head>
<body>
    <?php
        require_once 'model.php';
        $p_cod_plan = $_GET["p_cod_plan"];
        $conexion = conexion_bd();
    ?>
    
        <select  id="sub_planes_01" name="sub_planes_01" class="col-md-6 form-control">
                <option value="">Selec. Sub-Plan</option>
            <?php 
                $array_result = lista_sub_planes_nova($conexion,$p_cod_plan);
                for ($c_i = 0; $c_i < count($array_result); $c_i++) 
                { 
            ?>
                    <option value="<?php printf($array_result[$c_i]['cod_subplan']); ?>"><?php printf($array_result[$c_i]['nombre_subplan']); ?></option>
            <?php 
                } 
            ?>
        </select> 
    
    <?php
    	sqlsrv_close($conexion);
    ?> 
</body>