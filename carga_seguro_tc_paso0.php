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
		<!-- SGA Font Awesome ICONS-->
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
		<link rel="stylesheet" type="text/css" href="includes/bootstrapdatapicker/css/bootstrap-datepicker.css" />

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

            $('#fileToUpload_01').change(function(){
                var file = this.files[0];

                if( file ){
                    name = file.name;
                    size = file.size;
                    type = file.type;
                
                    if(file.name.length < 3) {
                        Lobibox.notify('error', {
                            img : './imagenes/icono_error.png',
                            sound: false,
                            title: 'ERROR CON ARCHIVO',
                            msg: "El nombre del archivo es muy corto" 
                        });   
                    }
                    else if(file.size > 500000000) {
                        Lobibox.notify('error', {
                            img : './imagenes/icono_error.png',
                            sound: false,
                            title: 'ERROR CON ARCHIVO',
                            msg: "El archivo es muy Grande solo se permiten 500MB" 
                        });   
                    }
                } 
                else
                {
                    console.log('Archivo en Blanco');
                }
                
            });
            
            $("#bt_cargar").click(function() {
					  form_fecha_01 = document.getElementById('fecha_01').value;

                      var file = $("#fileToUpload_01").prop("files")[0];
					  $("#bt_cargar").attr("disabled", true);
					  document.getElementById("demo").innerHTML = "<strong>Cargando archivo... por favor espere hasta que se muestre el resultado. </strong><br/> <div style='width:100%; background: #333; text-align:center;'> <img src='./imagenes/cargando3.gif' style='width:25%;'/> </div>";
					  
					  var validacion_ok = true;
					  if (form_fecha_01 == ""){
							Lobibox.notify('error', {
								img : './imagenes/icono_error.png',
								sound: false,
								title: 'DATOS INCOMPLETOS',
								msg: 'Debe seleccionar una FECHA para continuar' 
							}); 
							document.getElementById("demo").innerHTML = "Error al cargar Archivo: Datos Incompletos";
							$("#bt_cargar").attr("disabled", false);
							validacion_ok = false;
							removeLoading();
					  }	
					  if (!file){
							Lobibox.notify('error', {
								img : './imagenes/icono_error.png',
								sound: false,
								title: 'DATOS INCOMPLETOS',
								msg: 'Debe seleccionar un ARCHIVO de Excel para continuar' 
							}); 
							document.getElementById("demo").innerHTML = "Error al cargar Archivo: Datos Incompletos";
							$("#bt_cargar").attr("disabled", false);
							validacion_ok = false;
							removeLoading();
					  }						  						  					  			  

                      if (file && validacion_ok){
                              name = file.name;
                              size = file.size;
                              type = file.type;
                              
							  var file_data = $("#fileToUpload_01").prop("files")[0];
							  
                              var form_data = new FormData();
                              form_data.append("fileToUpload_01", file_data);
							  form_data.append("form_fecha_01", form_fecha_01);
                              
                              $.ajax({
                                url: "cargar_archivo_seguro_tc_paso0.php", // Upload Script
                                cache: false,
                                contentType: false,
                                processData: false,
                                data: form_data,
                                type: 'post',
                                success: function(response) {
                                    var res = response.split("|");
									var n = res[0].indexOf("OK");
                                    if ( n >= 0 ){
										try {
												document.getElementById('txt_archivo_adjunto').innerHTML = "Archivo Cargado ( "+res[1]+" )";   
												document.getElementById("demo").innerHTML = "<strong>Proceso de Archivo:</strong> "+res[0]+"</br><strong>Nombre de Archivo Cargado y Cant. de Líneas:</strong> "+res[1]+"</br>";
												$("#bt_cargar").attr("disabled", false);

										}
										catch(err) {
										  document.getElementById("demo").innerHTML = 'ERROR CATCH: '+err.message;
										  $("#bt_cargar").attr("disabled", false);
										}													
										
                                    }
                                    else{
                                        Lobibox.notify('error', {
                                            img : './imagenes/icono_error.png',
                                            sound: false,
                                            title: 'ERROR AL CARGAR ARCHIVO',
                                            msg: res 
                                        }); 
										console.log("ERROR: "+res); 
										document.getElementById("demo").innerHTML = "Error al cargar Archivo. "+response;
										$("#bt_cargar").attr("disabled", false);
										removeLoading();			
                                    }
									
                                },
                                error: function (xhr, ajaxOptions, thrownError) {
									console.log(xhr.status);
									document.getElementById("demo").innerHTML = "Error al cargar Archivo. "+response;
									$("#bt_cargar").attr("disabled", false);
                                    alert(thrownError);
                                }
                                
                              });
                      }                      
					removeLoading();
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
										<span style="color:#333333; font-size:24px; padding-left: 5px;"><strong>Proceso 0 - Cargar Base Activa</strong></span>
									</header>
									</br>	
									<table class="table table-bordered" style="font-size:14px;">
										<thead>
											<tr>
												<th>Fecha de Carga</th>
												<th>Archivo a Cargar</th>
												<th>&nbsp;</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td><input type="text" id="fecha_01" name="fecha_01" ng-model="codigo" ng-change="#"  maxlength="15" value="<?php echo(date("Y-m-d")); ?>" disabled placeholder="yyyy-mm-dd" class="form-control" /></td>
												<td>
													<input type="file" class="col-md-6 form-control" value="" name="fileToUpload_01" id="fileToUpload_01"  />
													<span id="txt_archivo_adjunto" style="font-weight: bold; font-size: 10px;">( No hay archivo .TXT seleccionado )</span>&nbsp;<span id="txt_eliminar_adjunto" style="color: #FF0000;  font-size: 10px; text-decoration: underline;"> </span></div>
												</td>
												<td><button type="button" id="bt_cargar" class="btn btn-success"><span class="fa fa-upload"></span>&nbsp;Cargar</button></td>
											</tr>
									
										</tbody>
									</table>

									<div id="tabla_resultados_carga" style="width:100%; height:200px; background-color:#E1E1E1;overflow-y: scroll;"> 
										<span style="color:#FF0000; font-size:17px; padding-left: 5px;"><strong>Resultado de la Carga del Archivo</strong></span>
										<p id="demo" style="padding-left: 10px; padding-right: 5px;"></p>	
									</div>
									</br>							
									</br>

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
		$('#fecha_01').datepicker({
			format: 'yyyy-mm-dd',
		});
	</script>  	

</html>