<?php
session_start();
require_once ('./config.inc.php');
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>ECUASISTENCIA - Carga Masiva Datos</title>
    
    <!-- CSS comunes -->
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
    <link rel="icon" href="imagenes/logo_icono.png" />  
    <!-- SGA Font Awesome ICONS-->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link href="includes/css/theme.css" rel="stylesheet" />
    <link href="includes/css/style.css" rel="stylesheet" type="text/css" media="screen">  

    <!-- JS comunes -->
    <script src="includes/js/i18n.data.js"></script>
    <script src="includes/js/jquery-2.2.0.min.js"></script>
    <script src="includes/js/jquery.main.js"></script>
    <script src="includes/js/jquery.commercial.js"></script>
    <script src="includes/js/funciones-comunes.js"></script>
    <script src="includes/js/bootstrap-paginator.js"></script>
    <script type="text/javascript" src="includes/js/bootstrap.js"> </script> 
    <script type="text/javascript" src="includes/js/lobibox.js"></script>
    <script type="text/javascript" src="includes/js/validation.min.js"></script>

    
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
    
        .header-links a,.language-selector>a,.phone-number-selector>a{color:#fafafa}
        .header-links li:after{background:#fff}
        .header-links li{color:#fafafa;font:13px/16px 'Noto Sans',Arial,Helvetica,sans-serif}
        .box:after,#header .content-container02 .box:after,#header .content-container03 .box:after,.header-links li:after{background:#fff}
        .phone a{color:#fff}    
        .phone{word-spacing:2px;color:#fff;font:700 16px/19px 'Noto Sans',Arial,Helvetica,sans-serif}  
        ul{list-style-type:none}  
        body{background:url(includes/images/bg-main.png)50% 0 #faf9fa} 
            
    </style>

    <script type="text/javascript" >

        $(document).ready(function() {
        	 $("#login-form").validate({
              rules:
        	  {
        			password: {
        			required: true,
        			},
        			user_email: {
                    required: true
                    },
        	   },
               messages:
        	   {
                    password:{
                              required: "Por favor ingrese su Clave"
                             },
                    user_email: "por favor ingrese su Usuario",
               },
        	   submitHandler: submitForm
               });
        	   /* validation */

        	   /* login submit */
        	   function submitForm()
        	   {
        			var data = $("#login-form").serialize();

                    $.ajax({
                            type : 'POST',
                            url  : 'login_process.php',
                            data : data,
                            beforeSend: function(){
                                $("#error").fadeOut();
                                $("#btn-login").html('<span class="glyphicon glyphicon-transfer"></span> &nbsp; comprobando ...');
                            },
                            success :  function(response){
                                var n = response.indexOf("ok");
                                console.log("RESPONSE ---->");
                                console.log(response);
                                console.log(data);
                            

                                if(n >= 0){
                                    $("#btn-login").html('<img src="includes/images/btn-ajax-loader.gif" /> &nbsp; Ingresando ...');
                                    setTimeout(' window.location.href = "home.php"; ',4000);
                                }
                                else{
                                    $("#error").fadeIn(1000, function(){
                                        //alert("4");
                                        $("#error").html('<div class="alert alert-danger"> <span class="glyphicon glyphicon-info-sign"></span> &nbsp; ['+response+'] !</div>');
                                        $("#btn-login").html('<span class="glyphicon glyphicon-log-in"></span> &nbsp; Ingresar');
                                    });
                                }
                            }
        			});
        				return false;
        		}
        	   /* login submit */
        });
        </script>

    </head>

<body>

        <!-- CABECERA -->
        <header id="header" role="banner" >
        
            <!-- Include Cabecera: Banner + Menu INICIO -->
            <div class="model-b" style="background-color: #999999;">
                    
                    <!-- Include Banner INICIO -->
                       	<div class="container">
                    		<div class="row">
                    			<div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                    <h1 class="logo" title="ECUASISTENCIA"> 
                                        <img src="imagenes/logo_ecuasistencia.png" alt="DefaultAlt" title="DefaultAlt" width="225" height="40" />
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
                    <!-- Include Banner FIN -->
                        
            </div>
            <!-- Include Cabecera: Banner + Menu FIN -->
        </header>     
    
        <div class="signin-form">
        
        	<div class="container">
                
               <form class="form-signin" method="post" id="login-form" style="background-color: #E5E5E5;">
              
                    <div style="text-align: center;">
                        <h2 class="form-signin-heading"><strong>Formateo de Archivos<span style="font-size:14px;">&nbsp;(<?php printf(TITULO_AMBIENTE); ?>)</span></strong></h2><hr />
                    </div>
                    
                    <input type="hidden" value="<?php if(isset($_SESSION['user_tasasaut'])) { echo $_SESSION['user_tasasaut']; } else { echo "NNN"; }?>"/>
                    <div id="error">
                    <!-- error will be shown here ! -->
                    </div>
                    
                    <div class="form-group">
                         <strong>Usuario:</strong> <input type="text" style="text-transform:uppercase;" class="form-control" name="user_email" id="user_email" autocomplete="off" />
                    <span id="check-e"></span>
                    </div>
                    
                    <div class="form-group">
                         <strong>Clave:</strong> <input type="password" style="text-transform:uppercase;" class="form-control" name="password" id="password" autocomplete="off" />
                    <span id="check-p"></span>
                    </div>
                   
                 	<hr />
                    
                    <div class="form-group">
                        <button type="submit" class="btn btn-primary" name="btn-login" id="btn-login">
                		<span class="glyphicon glyphicon-log-in"></span> &nbsp; Ingresar</button>  <!--<br /><br /> <a href="recordar_contrasena.php">He olvidado mi clave</a>-->
                    </div>  
              
              </form>
                <div class="form-leyenda" style="text-align: center;">
                    <span>Chrome 36.0.1; Firefox 31.0; | Resolucion &oacute;ptima: 1360x768px <br />
                    &#169; 2021 ECUASISTENCIA Todos los derechos reservados</span>
                </div>        
            </div>

            
            
        </div>
    
<script src="includes/bootstrap/js/bootstrap.min.js"></script>


</body>
</html>