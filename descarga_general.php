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
       
            $("#bt_consultar").click(function() {

				form_cliente_01 = document.getElementById('cliente_01').value;
				form_producto_01 = document.getElementById('producto_01').value;
				form_subproducto_01 = document.getElementById('subproducto_01').value;   
				form_proceso_01 = document.getElementById('proceso_01').value;    
				var validacion_ok = true;

				if (form_cliente_01 == ""){
					Lobibox.notify('error', {
						img : './imagenes/icono_error.png',
						sound: false,
						title: 'DATOS INCOMPLETOS',
						msg: 'Debe seleccionar un CLIENTE para continuar' 
					}); 

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

					validacion_ok = false;
					removeLoading();
				}	
				if (form_proceso_01 == ""){
					Lobibox.notify('error', {
						img : './imagenes/icono_error.png',
						sound: false,
						title: 'DATOS INCOMPLETOS',
						msg: 'Debe seleccionar un PROCESO para continuar' 
					}); 

					validacion_ok = false;
					removeLoading();
				}	

				if (validacion_ok)
				{
                    var parametros = {
                      "form_cliente_01" : form_cliente_01,
                      "form_producto_01" : form_producto_01,
					  "form_subproducto_01" : form_subproducto_01,
					  "form_proceso_01" : form_proceso_01
                    };
			
					// INICIO CARGA LISTADO
					if ( $.fn.DataTable.isDataTable('#generar-grid') ) {
						$('#generar-grid').DataTable().clear().destroy();
					}

					var dataTable = $('#generar-grid').DataTable( {
						"processing": true,
						"serverSide": true,
						"bFilter": true,
						"retrieve": true,
						"ajax":{
							url :"generar-grid-data.php", // json datasource
							type: "post",  // method  , by default get
							data:  parametros,
							error: function(e){  // error handling
								$(".generar-grid-error").html("");
								$("#generar-grid").append('<tbody class="generar-grid-error"></tbody>');
								$("#generar-grid_processing").css("display","none");
							}
						}
					});
					refrescar = function() {
						dataTable.ajax.reload(null, false);
					}
					// FIN CARGA LISTADO												
				}

				removeLoading();
			});  

		});   

		$(window).load(function(){

		});

		function envia_telemkt(archivo_telemkt, producto_telemkt){
			//var window_editar = window.open('test_leerexcel.php?p_cod_cabecera='+cod_cabecera,'fr_detalle');
			alert("Pendiente de definición ["+archivo_telemkt+"] ["+producto_telemkt+"]");
		}
		
        function descarga_general(trama_completa){
			html.className = 'loading';
			var arr_trama_completa = trama_completa.split("|");

			var parametros = {
			  "p_cliente" : arr_trama_completa[0],
			  "p_producto" : arr_trama_completa[1],
			  "p_subproducto" : arr_trama_completa[2],
			  "p_nom_proceso" : arr_trama_completa[3],
			  "p_fec_carga" : arr_trama_completa[4],
			  "p_file_base_colocacion" : arr_trama_completa[5],
			  "p_estado_reg" : arr_trama_completa[6],
			  "p_extension" : arr_trama_completa[7],
			  "p_delimitador" : arr_trama_completa[8]
			};			

			$.ajax({
					data:  parametros,
					url:   'generar_excel_general.php',
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
										<span style="color:#333333; font-size:24px; padding-left: 5px;"><strong>Proceso - Descarga General</strong></span>
									</header>
									</br>	
									<table class="table table-bordered" style="font-size:14px;">
										<thead>
											<tr>
												<th>Cliente</th>
												<th>Producto</th>
												<th>Sub-Producto</th>
												<th>Proceso</th>
												<th>&nbsp;</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>
													<select id="cliente_01" name="cliente_01" class="col-md-6 form-control" onchange="showProductos(this.value)" >
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
												<td><button type="button" id="bt_consultar" class="btn btn-success col-md-12">&nbsp;&nbsp;<span class="fa fa-search"></span>&nbsp;Consultar</button></td>
											</tr>
									
										</tbody>
									</table>									
									</br>	
						
									<div id="tabla_archivos_cargados"> 
										<p id="demo_tabla_archivos">
											<table id="generar-grid" cellpadding="0" cellspacing="0" border="0" class="display" width="100%" style="font-size: 10px;">
												<thead>
													<tr>
														<th><p style='text-align: center; padding:0px; margin: 0px; color:red;'>CLIENTE</p></th>
														<th><p style='text-align: center; padding:0px; margin: 0px; color:red;'>PRODUCTO</p></th>
														<th><p style='text-align: center; padding:0px; margin: 0px; color:red;'>SUBPRODUCTO</p></th>
														<th><p style='text-align: center; padding:0px; margin: 0px; color:red;'>PROCESO</p></th>
														<th><p style='text-align: center; padding:0px; margin: 0px; color:red;'>FECHA DE CARGA</p></th>
														<th><p style='text-align: center; padding:0px; margin: 0px; color:red;'>NOMBRE DE ARCHIVO</p></th>
														<th><p style='text-align: center; padding:0px; margin: 0px; color:red;'>REGISTROS</br>A GENERAR</p></th>
														<th><p style='text-align: center; padding:0px; margin: 0px; color:red;'>DESCARGAR</p></th>
													</tr>
												</thead>
											</table>
										</p>	
									</div>
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
			xmlhttp3.open("GET","get_procesos.php?p_cliente="+str+"&p_tipo_proceso=EXPORT",true);
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