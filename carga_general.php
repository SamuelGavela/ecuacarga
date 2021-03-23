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
                    else if(file.size > 50000000) {
                        Lobibox.notify('error', {
                            img : './imagenes/icono_error.png',
                            sound: false,
                            title: 'ERROR CON ARCHIVO',
                            msg: "El archivo es muy Grande solo se permiten 50MB" 
                        });   
                    }
                } 
                else
                {
                    console.log('Archivo en Blanco');
                }
                
            });
            
            $("#bt_cargar").click(function() {
                      
					  form_cliente_01 = document.getElementById('cliente_01').value;
					  form_producto_01 = document.getElementById('producto_01').value;
					  form_subproducto_01 = document.getElementById('subproducto_01').value;
					  form_fecha_01 = document.getElementById('fecha_01').value;
					  form_proceso_01 = document.getElementById('proceso_01').value;

                      var file = $("#fileToUpload_01").prop("files")[0];
					  $("#bt_cargar").attr("disabled", true);
					  document.getElementById("demo").innerHTML = "<strong>Cargando archivo... por favor espere hasta que se muestre el resultado. </strong><br/> <div style='width:100%; background: #333; text-align:center;'> <img src='./imagenes/cargando3.gif' style='width:25%;'/> </div>";
					  
					  var validacion_ok = true;
					  if (form_cliente_01 == ""){
							Lobibox.notify('error', {
								img : './imagenes/icono_error.png',
								sound: false,
								title: 'DATOS INCOMPLETOS',
								msg: 'Debe seleccionar un CLIENTE para continuar' 
							}); 
							document.getElementById("demo").innerHTML = "Error al cargar Archivo: Datos Incompletos";
							$("#bt_cargar").attr("disabled", false);
							validacion_ok = false;
							removeLoading();
					  }		
					  if (form_producto_01 == ""){
							Lobibox.notify('error', {
								img : './imagenes/icono_error.png',
								sound: false,
								title: 'DATOS INCOMPLETOS',
								msg: 'Debe seleccionar un PRODUCTO para continuar' 
							}); 
							document.getElementById("demo").innerHTML = "Error al cargar Archivo: Datos Incompletos";
							$("#bt_cargar").attr("disabled", false);
							validacion_ok = false;
							removeLoading();
					  }		
					  if (form_subproducto_01 == ""){
							Lobibox.notify('error', {
								img : './imagenes/icono_error.png',
								sound: false,
								title: 'DATOS INCOMPLETOS',
								msg: 'Debe seleccionar una SUBPRODUCTO para continuar' 
							}); 
							document.getElementById("demo").innerHTML = "Error al cargar Archivo: Datos Incompletos";
							$("#bt_cargar").attr("disabled", false);
							validacion_ok = false;
							removeLoading();
					  }	
					  if (form_proceso_01 == ""){
							Lobibox.notify('error', {
								img : './imagenes/icono_error.png',
								sound: false,
								title: 'DATOS INCOMPLETOS',
								msg: 'Debe seleccionar una PROCESO para continuar' 
							}); 
							document.getElementById("demo").innerHTML = "Error al cargar Archivo: Datos Incompletos";
							$("#bt_cargar").attr("disabled", false);
							validacion_ok = false;
							removeLoading();
					  }	
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
							  form_data.append("form_cliente_01", form_cliente_01);
							  form_data.append("form_producto_01", form_producto_01);
							  form_data.append("form_subproducto_01", form_subproducto_01);
							  form_data.append("form_proceso_01", form_proceso_01);
							  form_data.append("form_fecha_01", form_fecha_01);
                              
                              $.ajax({
                                url: "cargar_archivo_general.php", // Upload Script
                                cache: false,
                                contentType: false,
                                processData: false,
                                data: form_data,
                                type: 'post',
                                success: function(response) {
                                    var res = response.split("|");
									var n = res[0].indexOf("OK");
                                    if ( n >= 0 ){
										try 
										{
											document.getElementById('txt_archivo_adjunto').innerHTML = "Archivo Cargado ( "+res[1]+" )";   
											document.getElementById("demo").innerHTML = "</br><strong>Resultado de la Carga: </strong> "+res[0]+"</br><strong>Nombre de Archivo Cargado: </strong>"+res[1]+"</br><strong>Total de Registros en el Archivo: </strong>"+res[2]+"</br>"+res[3];
											$("#bt_cargar").attr("disabled", false);

											/*document.getElementById('tb_nombre_archivo').innerHTML = res[1];
											document.getElementById('tb_cliente').innerHTML = form_cliente_01;
											document.getElementById('tb_producto').innerHTML = form_producto_01;
											document.getElementById('tb_subproducto').innerHTML = form_subproducto_01;
											document.getElementById('tb_proceso').innerHTML = form_proceso_01;
											document.getElementById('tb_fec_carga').innerHTML = form_fecha_01;
											document.getElementById('tb_cant_reg').innerHTML = res[2];
											document.getElementById('tb_cant_reg_rep').innerHTML = res[3];
											document.getElementById('tb_cant_reg_new').innerHTML = res[4];
											*/

										}
										catch(err) {
										  document.getElementById("demo").innerHTML = 'ERROR CATCH: '+err.message;
										  $("#bt_cargar").attr("disabled", false);
										}													
										
                                    }
                                    else{

                                        /*Lobibox.notify('error', {
                                            img : './imagenes/icono_error.png',
                                            sound: false,
                                            title: 'ERROR AL CARGAR ARCHIVO',
                                            msg: res 
                                        }); */
										console.log("ERROR: "+response); 
										document.getElementById("demo").innerHTML = "Error 1 al cargar Archivo. "+response;
										$("#bt_cargar").attr("disabled", false);
										removeLoading();			
                                    }
									
                                },
                                error: function (xhr, ajaxOptions, thrownError) {
									console.log(xhr.status);
									document.getElementById("demo").innerHTML = "Error 2 al cargar Archivo. "+response;
									$("#bt_cargar").attr("disabled", false);

                                    alert(thrownError);
                                }
                                
                              });
                      }                      
					removeLoading();
            });

		});   

		function verdetalle(cod_cabecera){
			var window_editar = window.open('test_leerexcel.php?p_cod_cabecera='+cod_cabecera,'fr_detalle');
		}
		
        function eliminar_base_colocacion_pendiente(registro_encriptado){

			var parametros = {
			  "p_trama" : registro_encriptado
			};			
			
			if ( registro_encriptado != "" ) {
				$.ajax({
						data:  parametros,
						url:   'eliminar_colocacion_pendiente.php',
						type:  'post',
						success:  function (response) {
							Lobibox.notify('success', {
								img : './imagenes/icono_ok.png',
								sound: false,
								title: 'EXITO',
								position: 'right top',
								msg: 'Los registros de Base de Colocación Pendientes han sido eliminados exitosamente.'
							});

						}
				});					
			}			

        }		
		
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
										<span style="color:#333333; font-size:24px; padding-left: 5px;"><strong>Proceso - Carga General</strong></span>
									</header>
									</br>	
									<table class="table table-bordered" style="font-size:14px;">
										<thead>
											<tr>
												<th>Cliente</th>
												<th>Producto</th>
												<th>Sub-Producto</th>
												<th>Proceso</th>
												<th>Archivo a Cargar</th>
												<th>&nbsp;</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>
													<select id="cliente_01" name="cliente_01" class="col-md-6 form-control" onchange="showProductos(this.value)">
														<option value="">Selec. Cliente</option>
														<?php 
															$array_result = lista_clientes($conexion);
															for ($c_i = 0; $c_i < count($array_result); $c_i++) 
															{ 
														?>
																<option value="<?php printf($array_result[$c_i]['cliente']); ?>"><?php printf($array_result[$c_i]['desc_cliente']); ?></option>
														<?php 
															} 
														?>
													</select>   
												</td>
												<td>
													<div id="div_productos">	
														<select id="producto_01" name="producto_01" class="col-md-6 form-control">
															<option value="">Selec. Producto</option>
														</select> 
													</div>  
												</td>
												<td>
													<div id="div_subproductos">											
														<select id="subproducto_01" name="subproducto_01" class="col-md-6 form-control">
															<option value="">Selec. Sub-Producto</option>	
														</select>
													</div>
												</td>
												<td>
													<div id="div_procesos">	
														<select id="proceso_01" name="proceso_01" class="col-md-6 form-control">
															<option value="">Selec. Proceso</option>
														</select> 
													</div>  
												</td>
												<input type="hidden" id="fecha_01" name="fecha_01" ng-model="codigo" ng-change="#"  maxlength="15" value="<?php echo(date("Y-m-d")); ?>" disabled placeholder="yyyy-mm-dd" class="form-control" />
												<td>
													<input type="file" class="col-md-6 form-control" value="" name="fileToUpload_01" id="fileToUpload_01"  />
													<span id="txt_archivo_adjunto" style="font-weight: bold; font-size: 10px;">( No hay archivo seleccionado )</span>&nbsp;<span id="txt_eliminar_adjunto" style="color: #FF0000;  font-size: 10px; text-decoration: underline;"> </span></div>
												</td>
												<td><button type="button" id="bt_cargar" class="btn btn-success"><span class="fa fa-upload"></span>&nbsp;Cargar</button></td>
											</tr>
									
										</tbody>
									</table>

									<div id="tabla_resultados_carga" style="width:100%; height:300px; background-color:#E1E1E1;overflow-y: scroll;"> 
										<span style="color:#FF0000; font-size:17px; padding-left: 5px;"><strong>Resultado T&eacute;cnico de la Carga</strong></span>
										<p id="demo" style="padding-left: 10px; padding-right: 5px;"></p>	
									</div>
									</br>							
									<!--<div id="tabla_archivos_cargados"> 
										<span style="color:#FF0000; font-size:17px; padding-left: 5px;"><strong>Resumen de la Carga</strong>&nbsp;&nbsp;</span>	
										<p id="demo_tabla_archivos">
											<table id="archivos_cab-grid" cellpadding="0" cellspacing="0" border="0" class="display" width="100%" style="font-size: 12px;">
												<thead>
													<tr>
														<th><p style='text-align: center; padding:0px; margin: 0px; color:red;'>ARCHIVO CARGADO</p></th>
														<th><p style='text-align: center; padding:0px; margin: 0px; color:red;'>CLIENTE</p></th>
														<th><p style='text-align: center; padding:0px; margin: 0px; color:red;'>PRODUCTO</p></th>
														<th><p style='text-align: center; padding:0px; margin: 0px; color:red;'>SUB-PRODUCTO</p></th>
														<th><p style='text-align: center; padding:0px; margin: 0px; color:red;'>PROCESO</p></th>
														<th><p style='text-align: center; padding:0px; margin: 0px; color:red;'>FEC. CARGA</p></th>
														<th><p style='text-align: center; padding:0px; margin: 0px; color:red;'>CANT.</br>REGISTROS</p></th>
														<th><p style='text-align: center; padding:0px; margin: 0px; color:red;'>CANT. REG.</br>GESTIONADOS</p></th>
														<th><p style='text-align: center; padding:0px; margin: 0px; color:red;'>CANT. REG.</br>NUEVOS</p></th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<td><p style='text-align: center; padding:5px; margin: 0px; color:#333333;'><span id="tb_nombre_archivo"></span></p></td>
														<td><p style='text-align: center; padding:5px; margin: 0px; color:#333333;'><span id="tb_cliente"></span></p></td>
														<td><p style='text-align: center; padding:5px; margin: 0px; color:#333333;'><span id="tb_producto"></span></p></td>
														<td><p style='text-align: center; padding:5px; margin: 0px; color:#333333;'><span id="tb_subproducto"></span></p></td>
														<td><p style='text-align: center; padding:5px; margin: 0px; color:#333333;'><span id="tb_proceso"></span></p></td>
														<td><p style='text-align: center; padding:5px; margin: 0px; color:#333333;'><span id="tb_fec_carga"></span></p></td>
														<td><p style='text-align: center; padding:5px; margin: 0px; color:#333333;'><span id="tb_cant_reg"></span></p></td>
														<td><p style='text-align: center; padding:5px; margin: 0px; color:#333333;'><span id="tb_cant_reg_rep"></span></p></td>
														<td><p style='text-align: center; padding:5px; margin: 0px; color:#333333;'><span id="tb_cant_reg_new"></span></p></td>
													</tr>
												</tbody>
											</table>
										</p>

									</div>-->
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

		function showProductos(str)
		{

			if (window.XMLHttpRequest)
			{// code for IE7+, Firefox, Chrome, Opera, Safari
				xmlhttp=new XMLHttpRequest();
			}
			else
			{// code for IE6, IE5
				xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
			}
			xmlhttp.onreadystatechange=function()
			{
				if (xmlhttp.readyState==4 && xmlhttp.status==200)
				{
					document.getElementById("div_productos").innerHTML=xmlhttp.responseText;
				}
			}
			xmlhttp.open("GET","get_productos.php?p_cliente="+str,true);
			xmlhttp.send();

			showProcesos(str);
			showSubProductos('0', '0');

		}

		
		function showSubProductos(cliente, str)
		{
			
			if (window.XMLHttpRequest)
			{// code for IE7+, Firefox, Chrome, Opera, Safari
				xmlhttp2=new XMLHttpRequest();
			}
			else
			{// code for IE6, IE5
				xmlhttp2=new ActiveXObject("Microsoft.XMLHTTP");
			}
			xmlhttp2.onreadystatechange=function()
			{
				if (xmlhttp2.readyState==4 && xmlhttp2.status==200)
				{
					document.getElementById("div_subproductos").innerHTML=xmlhttp2.responseText;
				}
			}
			xmlhttp2.open("GET","get_subproductos.php?p_cliente="+cliente+"&p_producto="+str,true);
			xmlhttp2.send();
		}


		function showProcesos(str)
		{

			if (window.XMLHttpRequest)
			{// code for IE7+, Firefox, Chrome, Opera, Safari
				xmlhttp3=new XMLHttpRequest();
			}
			else
			{// code for IE6, IE5
				xmlhttp3=new ActiveXObject("Microsoft.XMLHTTP");
			}
			xmlhttp3.onreadystatechange=function()
			{
				if (xmlhttp3.readyState==4 && xmlhttp3.status==200)
				{
					document.getElementById("div_procesos").innerHTML=xmlhttp3.responseText;
				}
			}
			xmlhttp3.open("GET","get_procesos.php?p_cliente="+str+"&p_tipo_proceso=IMPORT",true);
			xmlhttp3.send();
		}

	</script>								  
        
	</body>

	<script type="text/javascript">
		$('#fecha_01').datepicker({
			format: 'yyyy-mm-dd',
		});
	</script>  	

</html>