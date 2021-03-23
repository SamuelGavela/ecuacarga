<?php
session_start();

if(!isset($_SESSION['user_ecucarga']))
{
	header("Location: login.php");
}

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>ECUASISTENCIA - Carga Masiva</title>

    <!-- CSS comunes -->
    <link rel="icon" href="imagenes/logo_icono.png" />   
    <link media="all" rel="stylesheet" href="http://fonts.googleapis.com/css?family=Noto+Sans:400,700,400italic,700italic&amp;subset=latin,latin-ext" />     
    <link media="all" rel="stylesheet" href="includes/css/bootstrap2.min.css" />    
    <link media="all" rel="stylesheet" href="includes/css/structure-style.css" />
    <link media="all" rel="stylesheet" href="includes/css/commercial-structure-style.css" />
    <link media="all" rel="stylesheet" href="includes/css/commercial-content-style.css" />
    <link media="all" rel="stylesheet" href="includes/css/mediaelementplayer.css" />
    <link media="all" rel="stylesheet" href="includes/css/mejs-skins.css" />
    <link media="all" rel="stylesheet" href="includes/css/stylecookies.css" />
    <link media="all" rel="stylesheet" href="includes/css/mapfreatlas-style.css" />
    <link media="all" rel="stylesheet" href="includes/css/formValidation.min.css" />
    <link media="all" rel="stylesheet" href="includes/css/Lobibox.min.css"/>
    <link href="includes/css/theme.css" rel="stylesheet" />
    <link media="print" rel="stylesheet" href="includes/css/print-style.css" />
    <link media="print" rel="stylesheet" href="includes/css/commercial-print.css" />
    <link href="includes/bootstrap/css/bootstrap.min.css" rel="stylesheet" media="screen"/> 
    <link href="includes/bootstrap/css/bootstrap-theme.min.css" rel="stylesheet" media="screen"/> 
    <link href="includes/css/style.css" rel="stylesheet" media="screen"/>   
    <!-- SGA Font Awesome ICONS-->
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"> 
  
    <!-- JS comunes -->
    <script src="includes/js/i18n.data.js"></script>
    <script src="includes/js/jquery-2.2.0.min.js"></script>
    <script src="includes/js/jquery.main.js"></script>
    <script src="includes/js/jquery.commercial.js"></script>
    <script src="includes/js/funciones-comunes.js"></script>
    <script src="includes/js/bootstrap-paginator.js"></script>
    <script type="text/javascript" src="includes/js/bootstrap.js"> </script> 
    <script language="JavaScript" type="text/javascript" src="includes/js/lobibox.js"></script>
    
    <style>
    
    
        input[type="image"]:focus {
            outline: none;
            border: none;
        }   
        
        .header-links a,.language-selector>a,.phone-number-selector>a{color:#fafafa}
        .header-links li:after{background:#fff}
        .header-links li{color:#fafafa;font:13px/16px 'Noto Sans',Arial,Helvetica,sans-serif}
        .box:after,#header .content-container02 .box:after,#header .content-container03 .box:after,.header-links li:after{background:#fff}
         ul{list-style-type:none}   
    </style>

    </script>

</head>

<body>
       

        <!-- CABECERA -->
        <header id="header" role="banner" >
        
            <!-- Include Cabecera: Banner + Menu INICIO -->
            <div class="model-b" style="background-color: #999999;">
                    
                    <!-- Include Banner INICIO -->
                    <div class="layer01">
                    	<div class="container">
                    		<div class="row">
                    			<div class="col-lg-3 col-md-3 col-sm-4">
                                    <h1 class="logo" title="ECUASISTENCIA"> 
                                        <img src="imagenes/logo_ecuasistencia.png" alt="DefaultAlt" title="DefaultAlt" width="500" height="53" />
                                    </h1>
                                    <b class="visible-xs phone"></b>
                                </div>			
                                <div class="col-lg-9 col-md-9 col-sm-8 hidden-xs">
             			            <div class="content-container02">
               				    	    <div class="box">

                    	                </div>

                 	                    <div class="box hidden-sm" style="display: none;">
                    	                </div>
			    
                    				</div>
                                </div>
                    		</div>
                    	</div>
                    </div>
                        
            </div>
            <!-- Include Cabecera: Banner + Menu FIN -->
        </header> 
            
                
		<nav class="navbar navbar-default" style="position: absolute; top:50px; width: 100%;">
		  <div class="container"  style="width: 100%">
			<div class="navbar-header">
			</div>
			<?php
				include("menu_basico.php");
			?>
		  </div>
		</nav>
    
    
        <div class="body-container">
            <br /><br />
            <div class="container">
                <div class='alert alert-success'>
                    <button class='close' data-dismiss='alert'>&times;</button>
                        <strong>Hola <?php echo $_SESSION['user_email']; ?></strong>  Bienvenido al M&oacute;dulo de Carga Masiva y Formateo de Archivos de ECUASISTENCIAS.
                </div>
            </div>
            
            <div class="container">

            </div>
        </div>


</body>
</html>
