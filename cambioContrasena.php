<?php
session_start();

if(!isset($_SESSION['user_ecucarga']))
{
	header("Location: login.php");
}
?>
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
    <link href="includes/css/theme.css" rel="stylesheet" />
      

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
    
    <style>
    
    .div_img_fondo{
        position: absolute;
        top: 80px;    
        right: 2px;
    }
    
      input[type="image"]:focus {
        outline: none;
        border: none;
      }    
      
      ul>li, a{cursor: pointer;}
    
    </style>

    <script type="text/javascript" language="javascript" >
        $(document).ready(function() {

            $("#btn_grabar").click(function() {
                txt_contrasena_actual = document.getElementById('txt_contrasena_actual').value;  
                txt_nueva_contrasena = document.getElementById('txt_nueva_contrasena').value;
                txt_repetir_contrasena = document.getElementById('txt_repetir_contrasena').value;
                txt_user_session = document.getElementById('txt_user_session').value;
                txt_nombre_usuario = document.getElementById('txt_nombre_usuario').value;
                txt_usuario_email = document.getElementById('txt_usuario_email').value;
                var proceder = "OK";
                
                if ( txt_nueva_contrasena != txt_repetir_contrasena ) 
                {  
                    Lobibox.notify('error', {
                        img : './imagenes/icono_error.png',
                        sound: false,
                        title: 'ERROR',
                        msg: 'Los valores ingresados en Contrasena Nueva y Repetir Contrasena no son iguales.'
                    });                       
                    
                    proceder = "ERROR";
                }                  
                
                if ( (txt_repetir_contrasena=="Repetir Contrasena") || ( txt_repetir_contrasena.length < 8) ) 
                {  
                    Lobibox.notify('error', {
                        img : './imagenes/icono_error.png',
                        sound: false,
                        title: 'ERROR',
                        msg: 'El valor ingresado en Repetir Contrasena debe tener al menos 8 caracteres.'
                    });                       
                    
                    proceder = "ERROR";
                }                 
                
                if ( (txt_nueva_contrasena=="Nueva Contrasena") || ( txt_nueva_contrasena.length < 8) ) 
                {  
                    Lobibox.notify('error', {
                        img : './imagenes/icono_error.png',
                        sound: false,
                        title: 'ERROR',
                        msg: 'La Nueva Contrasena debe tener al menos 8 caracteres.'
                    });                       
                    
                    proceder = "ERROR";
                }      

                if ( (txt_contrasena_actual=="Contrasena Actual") || ( txt_contrasena_actual.length < 4) ) 
                {  
                    Lobibox.notify('error', {
                        img : './imagenes/icono_error.png',
                        sound: false,
                        title: 'ERROR',
                        msg: 'La Contrasena Actual debe tener al menos 8 caracteres.'
                    });                       
                    
                    proceder = "ERROR";
                }    
                
                if (  txt_nombre_usuario.length < 5 ) 
                {  
                    Lobibox.notify('error', {
                        img : './imagenes/icono_error.png',
                        sound: false,
                        title: 'ERROR',
                        msg: 'Nombres y Apellido debe tener al menos 5 caracteres.'
                    });                       
                    
                    proceder = "ERROR";
                }                                          
                
                if ( proceder == "OK"){
                        var parametros = {
                          "txt_contrasena_actual" : txt_contrasena_actual,
                          "txt_nueva_contrasena" : txt_nueva_contrasena,
                          "txt_repetir_contrasena" : txt_repetir_contrasena,
                          "txt_user_session" : txt_user_session,
                          "txt_nombre_usuario" : txt_nombre_usuario,
                          "txt_usuario_email" : txt_usuario_email
                        };
                        $.ajax({
                                data:  parametros,
                                url:   'grabar_constrasena.php',
                                type:  'post',
                                success:  function (response) { 
                                    if (response == " "){
                                        Lobibox.notify('success', {
                                            img : './imagenes/icono_ok.png',
                                            sound: false,
                                            title: 'EXITO',
                                            msg: 'La Constrasena ha sido Cambiada exitosamente.' 
                                        });     
                                    }
                                    else{
                                        Lobibox.notify('error', {
                                            img : './imagenes/icono_error.png',
                                            sound: false,
                                            title: 'ERROR',
                                            msg: response 
                                        });     
                                        
                                    }
                                    
                                }
                        });                
                }
                
            });                 
            
            $("#btn_regresar").click(function() {
                window.open('principal.php','_self');
            });           
        });                  
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
                                        <div class="box">
             	                            <b class="phone">1-800-222-111</b>
                                        </div>	
			    
                    				</div>
                                </div>
                    		</div>
                    	</div>
                    </div>
                    <!-- Include Banner FIN -->
                        
            </div>
            <!-- Include Cabecera: Banner + Menu FIN -->
        </header>
        
        <?php
        
            // Conexion a la Base de datos
        	$ini_array = parse_ini_file("configuracion.php");
        	$string=$ini_array['string'];
        	$base = $ini_array['base'];
        	$user = $ini_array['user'];
        	$pass = $ini_array['pass'];
            $conexion = new mysqli($string,$user,$pass,$base,3306);
            if (mysqli_connect_errno()) {
            	printf("La conexi�n con el servidor de base de datos fall�: %s\n", mysqli_connect_error());
            	exit();
            }  
            
            $nombre_usuario = "";
            $email_usuario = "";
            $sql_email_usuario= sprintf("SELECT user_email, user_name FROM tbl_users WHERE user_id = '".$_SESSION['user_session']."' ");
        	$result_email_usuario = $conexion->query($sql_email_usuario);
        	while($row_email_usuario = $result_email_usuario->fetch_array()){                                                  
                $email_usuario = $row_email_usuario['user_email'];
                $nombre_usuario = $row_email_usuario['user_name'];
            }                    
        
        ?>
        
        <!-- CUERPO -->
    	<div id="main">
    		<div class="inner-main">

                <div class="container">
                <div id="div_img_fondo" class="div_img_fondo"><img src="imagenes/bg_img_contactenos_password.png" width="100%"/></div>
                <br/>
                <blockquote><h4>Editar Perfil</h4></blockquote>
                <br/>
                    <div class="row">
                        <div class="col-md-3"><span></span><strong>Usuario&nbsp;<span style="color:#CC0C00;">*</span></strong>
                             <input type="text" id="txt_nombre_usuario" disabled="true" maxlength="24" ng-model="codigo" ng-change="#" value="<?php printf($nombre_usuario);?>" class="form-control" />
                             <input type="hidden" id="txt_user_session"  ng-model="codigo" ng-change="#" value="<?php printf($_SESSION['user_session']);?>" class="form-control" />
                        </div>   
                    </div> <br/>                 
                    <div class="row">
                        <div class="col-md-3"><span></span><strong>Email de Usuario&nbsp;</strong>
                             <input type="text" id="txt_usuario_email" disabled="true" ng-model="codigo" ng-change="#" value="<?php printf($email_usuario);?>" class="form-control" />
                        </div>   
                    </div> <br/>      
                    <div class="row">
                        <div class="col-md-3"><span></span><strong>Contrase&ntilde;a Actual&nbsp;<span style="color:#CC0C00;">*</span></strong>
                             <input type="password" id="txt_contrasena_actual" ng-model="codigo" ng-change="#"  maxlength="15" value="" class="form-control" />
                        </div>   
                    </div> <br/>    
                    <div class="row">        
                        <div class="col-md-3"><strong>Nueva Contrase&ntilde;a&nbsp;<span style="color:#CC0C00;">*</span></strong>
                             <input type="text" id="txt_nueva_contrasena" ng-model="descripcion" ng-change="#" pattern="[a-zA-Z0-9*#._]{1,15}"  maxlength="15" value="" class="form-control" />
                             <span> Solo N&uacute;meros, letras y los caracteres <strong>*#._</strong> (cualquier otro caracterer ser&aacute; suprimido)</span>
                        </div>
                    </div>  <br/>   
                    <div class="row">            
                        <div class="col-md-3"><strong>Repetir Contrase&ntilde;a&nbsp;<span style="color:#CC0C00;">*</span></strong>
                            <input type="text" id="txt_repetir_contrasena" ng-model="orden" ng-change="#" pattern="[a-zA-Z0-9*#._]{1,15}" maxlength="15" value="" class="form-control" />
                            <span> Solo N&uacute;meros, letras y los caracteres <strong>*#._</strong> (cualquier otro caracterer ser&aacute; suprimido)</span>
                        </div>
                    </div>   <br/>   <br/> 
                    <div class="row">            
                        <div class="col-md-12" ng-show="filteredItems > 0">    
                            <div> <button id="btn_grabar" type="button" class="btn btn-primary">&nbsp;&nbsp;Cambiar Contrase&ntilde;a&nbsp;&nbsp;</button>&nbsp;&nbsp;&nbsp;&nbsp;
                            <button id="btn_regresar" type="button" class="btn btn-primary">&nbsp;&nbsp;&nbsp;&nbsp;Regresar&nbsp;&nbsp;&nbsp;&nbsp;</button> </div>
                        </div>        
                    </div>

                
                </div>
            </div>
    	</div>
        <!--FIN CUERpo -->
        
        
        <!-- Include Footer -->
        <footer id="footer" role="contentinfo"><br/><br/>
            <div class="bottom-block">
                <div class="wrapper">
                	<div class="container">
                		<div class="row">
                			<div class="col-lg-3 col-lg-push-3 col-md-4 col-md-push-2 col-sm-2 col-sm-push-2">
                			</div>
                		
                			<div class="col-lg-6 col-lg-pull-3 col-md-5 col-md-pull-3 col-sm-2 col-sm-pull-2">
                                <div class="footer-legal">

                                    <div class="text-block" style="color: #FFF; font-size: x-small; padding-top: 5px;">&#169; 2018 MAPFRE|ATLAS Todos los derechos reservados.
                                    </div>                                    
                                    
                                </div>				
                            </div>
                		</div>
                	</div>
                </div>
            </div>
        </footer>           
        
    </body>
</html>