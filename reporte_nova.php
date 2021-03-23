<?php
	session_start();

	if(!isset($_SESSION['user_ecucarga']))
	{
		header("Location: login.php");
	}
	require_once 'model.php';
?>
<!DOCTYPE html>
<html lang="es-CL">

<!-- Added by HTTrack --><meta http-equiv="content-type" content="text/html;charset=UTF-8"><!-- /Added by HTTrack -->
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="format-detection" content="telephone=no" />
    <meta charset="UTF-8" />
    
    <title>ECUASISTENCIA - Carga Masiva</title>
    <!-- METAS -->
        <meta id="keywords" name="keywords" content="cotiza en l&iacute;nea,seguro vehiculo, seguro auto,contratar seguro,online,seguros MAPFREATLAS" />
    
    <!-- CSS comunes -->
	<link rel="icon" href="imagenes/logo_icono.png" />  
		<link media="all" rel="stylesheet" href="includes/css/bootstrap2.min.css" />
		<link media="all" rel="stylesheet" href="includes/css/content-style.css" />
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
		<link media="all" rel="stylesheet" href="includes/css/font-awesome.min.css"/>
		<link href="includes/css/style.css" rel="stylesheet" media="screen"/>
		<link rel="stylesheet" type="text/css" href="includes/css/jquery.dataTables.css" />
		<link rel="stylesheet" type="text/css" href="includes/bootstrapdatapicker/css/bootstrap-datepicker.css" />
		<!-- SGA Font Awesome ICONS-->
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
		<!-- JS comunes -->
		<script src="includes/js/i18n.data.js"></script>
		<script src="includes/js/jquery-2.2.0.min.js"></script>
		<script src="includes/js/jquery.commercial.js"></script>
		<script src="includes/js/funciones-comunes.js"></script>
		<script src="includes/js/bootstrap-paginator.js"></script>
		<script type="text/javascript" src="includes/js/bootstrap.js"> </script>
		<script language="JavaScript" type="text/javascript" src="includes/js/lobibox.js"></script>
		<script src="js/js-webshim/minified/polyfiller.js"></script>
		<script type="text/javascript" language="javascript" src="includes/js/jquery.dataTables.js"></script>
		<script src="js/jquery-ui.js"></script>
		<script  type="text/javascript" src="includes/js/moment.min.js"></script>
		
		<script type="text/javascript" src="includes/bootstrapdatapicker/js/bootstrap-datepicker.js"></script>  
		<script type="text/javascript" src="includes/bootstrapdatapicker/locales/bootstrap-datepicker.es.min.js"></script> 
    
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
    
	html.loading {
		background: #333 url('./imagenes/cargando3.gif') no-repeat 50% 50%;
		-webkit-transition: opacity 0.3;
		transition: opacity 0.3;
	}	  
	html.loading body {
		opacity: 0.3;
		-webkit-transition: opacity 0.3;
		transition: opacity 0.3;
	}	
    
    </style>
	
    <script>
        var html = document.getElementsByTagName('html')[0];
        html.className = 'loading';
    </script>	

    <script type="text/javascript" language="javascript" >
        $(document).ready(function() {
       
            $("#bt_generar").click(function() {
                html.className = 'loading';
                fecha_desde = document.getElementById('fecha_desde').value;
                fecha_hasta = document.getElementById('fecha_hasta').value;
				tipo_reporte = document.getElementById('tipo_reporte').value;   

				var validacion_ok = true;

                const fec_des = new Date(fecha_desde);
                const fec_has = new Date(fecha_hasta);

				if (fec_des > fec_has){
					Lobibox.notify('error', {
						img : './imagenes/icono_error.png',
						sound: false,
						title: 'DATOS INCOMPLETOS',
						msg: 'La FECHA HASTA debe ser mayor o igual que la FECHA DESDE' 
					}); 

					validacion_ok = false;
					removeLoading();
				}
				
				if (fecha_desde == ""){
					Lobibox.notify('error', {
						img : './imagenes/icono_error.png',
						sound: false,
						title: 'DATOS INCOMPLETOS',
						msg: 'Debe seleccionar FECHA DESDE para continuar' 
					}); 

					validacion_ok = false;
					removeLoading();
				}		
				if (fecha_hasta == ""){
					Lobibox.notify('error', {
						img : './imagenes/icono_error.png',
						sound: false,
						title: 'DATOS INCOMPLETOS',
						msg: 'Debe seleccionar FECHA HASTA para continuar' 
					}); 

					validacion_ok = false;
					removeLoading();
				}		
				if (tipo_reporte == ""){
					Lobibox.notify('error', {
						img : './imagenes/icono_error.png',
						sound: false,
						title: 'DATOS INCOMPLETOS',
						msg: 'Debe seleccionar un TIPO DE REPORTE para continuar' 
					}); 

					validacion_ok = false;
					removeLoading();
				}	

				if (validacion_ok)
				{
                    html.className = 'loading';
					var parametros = {
                      "fecha_desde" : fecha_desde,
                      "fecha_hasta" : fecha_hasta,
					  "tipo_reporte" : tipo_reporte
                    };
			
                    $.ajax({
                            data:  parametros,
                            url:   'generar_archivo_reporte_nova.php',
                            type:  'post',
                            success:  function (response) {
                                removeLoading(); 
                                var res = response.split("|");
                                var n = response.indexOf("OK|");
                                if ( n >= 0 ) {								
                                    Lobibox.alert('success', {
                                        img : './imagenes/icono_ok.png',
                                        sound: false,
                                        delay: false,
                                        title: 'EXITO - ARCHIVO GENERADO',
                                        msg: 'Sus consulta ha sido generada exitosamente. Link para descargar el archivo: <a href="'+res[1]+'" download>Click para Descargar Archivo</a>'
                                    });
                                }
                                else{
                                    Lobibox.notify('error', {
                                        img : './imagenes/icono_error.png',
                                        sound: false,
                                        delay: false,
                                        position: 'right top',
                                        title: 'ERROR',
                                        msg: 'Su archivo no pudo ser generado. ERROR TECNICO: '+response
                                    });
                                }		

                            }
                    });	
											
				}

			});  

		});   

		
    </script>    
    
</head>
<body>
		<?php
			// CONEXION CON LA BASE DE DATOS
			$conexion = conexion_bd();
		?>
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
        <br />
        <div class="container" style="width: 95%;">

                   <div class="row"  style="background-color: none;">

        				<div class="col-sm-12 col-md-12" style="background-color: none;">
                            <section id="content">

                                    <header>
										<span style="color:#333333; font-size:24px; padding-left: 5px;"><strong>Reporte Totales NOVA</strong></span>
									</header>
									</br>	
									<table class="table table-bordered" style="font-size:14px;">
										<thead>
											<tr>
												<th>Fecha Desde</th>
												<th>Fecha Hasta</th>
												<th>Tipo de Reporte</th>
												<th>&nbsp;</th>
											</tr>
										</thead>
										<tbody>
											<tr>
                                                <td><input type="text" id="fecha_desde" name="fecha_desde" ng-model="codigo" ng-change="#" maxlength="15" value="" placeholder="yyyy-mm-dd" class="form-control"  autocomplete="off" /></td>
                                                <td><input type="text" id="fecha_hasta" name="fecha_hasta" ng-model="codigo" ng-change="#" maxlength="15" value="" placeholder="yyyy-mm-dd" class="form-control"  autocomplete="off" /></td>
												<td>
													<div id="div_tip_reporte">											
														<select id="tipo_reporte" name="tipo_reporte" class="col-md-6 form-control">
															<option value="CONTAR">Cant. Registros&nbsp;&nbsp;</option>	
                                                            <option value="SUMAR">Suma Prima Neta&nbsp;&nbsp;</option>
														</select>
													</div>
												</td>

												<td><button type="button" id="bt_generar" class="btn btn-success col-md-12">&nbsp;&nbsp;<span class="fa fa-search"></span>&nbsp;Generar Reporte</button></td>
											</tr>
									
										</tbody>
									</table>									

									</br></br>

                            </section>
    					</div>

    				</div>

        </div>


    </div>
    <!--FIN CUERpo -->
 
	<?php
		sqlsrv_close($conexion);
	?>

	<script type="text/javascript">    
	
		var html = document.getElementsByTagName('html')[0];
		var removeLoading = function() {
			setTimeout(function() {
				html.className = html.className.replace(/loading/, '');
			}, 500);
		};

		html.className = 'loading';
		removeLoading();    

	</script>								  
        
	</body>

	<script type="text/javascript">
		$('#fecha_desde').datepicker({
			format: 'yyyy-mm-dd',
		});

        $('#fecha_hasta').datepicker({
			format: 'yyyy-mm-dd',
		});       
	</script>  	

</html>