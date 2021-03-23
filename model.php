<?php
	
	require_once ('./config.inc.php');
	
	ini_set('memory_limit', '8072M'); 
	ini_set('max_execution_time', 6000); 
	//ini_set('display_errors', 1); ini_set('display_startup_errors', 1); error_reporting(E_ALL);

	function conexion_bd(){
	
		$l_server = SERVERNAME;
		$l_puerto = PUERTO;
		$l_dataBase = DATABASE;
		$l_uid = SCHEMA;
		$l_pwd = PASSWORD;
		$l_CharacterSet = CHARSET;
		
		$serverName = "$l_server, $l_puerto"; 
		$connectionInfo = array( "Database"=>"$l_dataBase", "UID"=> "$l_uid" , "PWD"=>"$l_pwd" /*, "CharacterSet" => "$l_CharacterSet" */);
		$conn = sqlsrv_connect($serverName, $connectionInfo);
    	if( $conn ) {
			//echo "Conexión establecida.";
		}else{
			echo "Conexión no se pudo establecer.";
			die( print_r( sqlsrv_errors(), true));
		}
		return $conn;
	}

	function validar_login($conn, $cod_usuario, $cod_clave){
		$cod_usuario = strtolower($cod_usuario);
		$sql = "SELECT TOP 1 username, cod_usuario, email, rol FROM [db_ecuasisec].[dbo].[ea_usuarios] WHERE estado = 'A' AND username = ? AND clave = ? ";
		$result = sqlsrv_query($conn, $sql, array($cod_usuario, $cod_clave));
		if($result === false) {
			die(print_r(sqlsrv_errors(), true));
		}
		return sqlsrv_fetch_object($result);
	}

	function lista_menus($conn, $rol_usuario){
		$sql = "SELECT a.cod_menu, a.nombre_menu, a.link_referencia, a.fa_icon, a.color_texto FROM [db_ecuasisec].[dbo].[ea_menus] a, [db_ecuasisec].[dbo].[ea_menus_x_rol] b 
		WHERE a.estado = 'A' AND b.cod_menu = a.cod_menu AND b.estado = 'A' AND b.rol = ? ORDER BY a.orden ";
		$result = sqlsrv_query($conn, $sql, array($rol_usuario));
    	$datos = array();

		if($result === false) {
			die(print_r(sqlsrv_errors(), true));
		}
		while($row = sqlsrv_fetch_array($result, SQLSRV_FETCH_ASSOC)) {
			$datos[] = (array) $row;
		}
		return $datos;
	}	


	//----------------------------------------------------------------------------------------
	// INICIO NOVA

	function lista_planes_nova($conn){
		$sql = "SELECT cod_plan, nombre_plan FROM [db_ecuasisec].[dbo].[ea_nov_planes] WHERE estado = 'A' ORDER BY orden";
		$result = sqlsrv_query($conn, $sql);
    	$datos = array();

		if($result === false) {
			die(print_r(sqlsrv_errors(), true));
		}
		while($row = sqlsrv_fetch_array($result, SQLSRV_FETCH_ASSOC)) {
			$datos[] = (array) $row;
		}
		return $datos;
	}	

	function get_desc_plan_nova($conn, $cod_plan){
		$sql = "SELECT cod_plan, nombre_plan FROM [db_ecuasisec].[dbo].[ea_nov_planes] WHERE estado = 'A' AND cod_plan = ?";
		$result = sqlsrv_query($conn, $sql, array($cod_plan));
    	$datos = array();

		if($result === false) {
			die(print_r(sqlsrv_errors(), true));
		}
		return sqlsrv_fetch_object($result);
	}		

	function lista_sub_planes_nova($conn, $cod_plan){
		$sql = "SELECT cod_subplan, nombre_subplan FROM [db_ecuasisec].[dbo].[ea_nov_subplanes] WHERE estado = 'A' and cod_plan = ? ORDER BY orden";
		$result = sqlsrv_query($conn, $sql, array($cod_plan));
    	$datos = array();

		if($result === false) {
			die(print_r(sqlsrv_errors(), true));
		}
		while($row = sqlsrv_fetch_array($result, SQLSRV_FETCH_ASSOC)) {
			$datos[] = (array) $row;
		}
		return $datos;
	}

	function contar_sub_planes_nova($conn, $cod_plan){
		$sql = "SELECT count(1) AS cant_subplanes FROM [db_ecuasisec].[dbo].[ea_nov_subplanes] WHERE estado = 'A' and cod_plan = ? ";
		$result = sqlsrv_query($conn, $sql, array($cod_plan));

		if($result === false) {
			die(print_r(sqlsrv_errors(), true));
		}
		return sqlsrv_fetch_object($result);
	}	
	
	function get_desc_sub_plan_nova($conn, $cod_plan, $cod_subplan){
		$sql = "SELECT nombre_subplan FROM [db_ecuasisec].[dbo].[ea_nov_subplanes] WHERE estado = 'A' AND cod_plan = ? AND cod_subplan = ?";
		$result = sqlsrv_query($conn, $sql, array($cod_plan, $cod_subplan));
    	$datos = array();

		if($result === false) {
			die(print_r(sqlsrv_errors(), true));
		}
		return sqlsrv_fetch_object($result);
	}	

	function valor_sub_planes_nova($conn, $cod_plan, $cod_subplan){
		
		$sql = "SELECT TOP 1 valor FROM [db_ecuasisec].[dbo].[ea_nov_subplanes] WHERE estado = 'A' AND cod_plan = ? AND cod_subplan = ?";
		$result = sqlsrv_query($conn, $sql, array($cod_plan, $cod_subplan));
		if($result === false) {
			die(print_r(sqlsrv_errors(), true));
		}
		return sqlsrv_fetch_object($result);
	}		

	function insert_cab_archivo_nova($conn, $nombre_archivo, $fec_archivo, $cod_plan, $cod_subplan, $cant_reg, $cant_reg_err, $observacion, $usr_carga){
		$ultimo_id = 0;
		$sql  = "INSERT INTO [db_ecuasisec].[dbo].[ea_nov_cab_carga] (archivo_cargado, fec_archivo, cod_plan, cod_subplan, cant_registros_carga, 
		cant_registros_error, estado_carga, observacion, fec_carga, fec_procesado, usr_carga) VALUES (?, ?, ?, ?, ?, ?, 'P', ?, GETDATE(), null, ? );  SELECT SCOPE_IDENTITY()";
		$params = array($nombre_archivo, $fec_archivo, $cod_plan, $cod_subplan, $cant_reg, $cant_reg_err, $observacion, $usr_carga);
		$result = sqlsrv_query( $conn, $sql, $params);
		sqlsrv_next_result($result);
		sqlsrv_fetch($result);
		if ( $result === false ) {
			$ultimo_id = 0;
		}
		else{
			$ultimo_id = sqlsrv_get_field($result, 0); 
		}
		return $ultimo_id;
	}

	function existe_cab_archivo_nova($conn, $fec_archivo, $cod_plan, $cod_subplan){
		$sql = "SELECT count(*) AS existe FROM [db_ecuasisec].[dbo].[ea_nov_cab_carga] WHERE estado_carga = 'P' AND fec_archivo = ? AND cod_plan = ? AND cod_subplan = ? ";
		$result = sqlsrv_query($conn, $sql, array($fec_archivo, $cod_plan, $cod_subplan));
		if($result === false) {
			die(print_r(sqlsrv_errors(), true));
		}
		return sqlsrv_fetch_object($result);
	}		

	function insert_det_archivo_nova($conn, $c_cod_carga, $c_cod_registro, $c_no_proceso, $c_no_certificado, $c_asegurado, $c_identificacion, $c_estado, $c_nro_cuota, $c_prima_neta, $c_limite, $c_nro_total_cuotas, $c_observaciones, $c_tipo_cuenta, $c_excluir, $c_motivo_excluir, $c_fec_archivo, $c_cod_plan, $c_nombre_plan, $c_cod_subplan, $c_nombre_subplan, $c_estado_registro, $c_observacion_registro, $c_usr_modificacion){
		
		$sql  = "INSERT INTO [db_ecuasisec].[dbo].[ea_nov_det_carga] (cod_carga, cod_registro, no_proceso, no_certificado, asegurado, identificacion, estado, nro_cuota, prima_neta, limite, nro_total_cuotas, observaciones, tipo_cuenta, excluir, motivo_excluir, fec_archivo, cod_plan, nombre_plan, cod_subplan, nombre_subplan, estado_registro, observacion_registro, fec_modificacion, usr_modificacion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, GETDATE(), ? );";
		$params = array($c_cod_carga, $c_cod_registro, $c_no_proceso, $c_no_certificado, $c_asegurado, $c_identificacion, $c_estado, $c_nro_cuota, $c_prima_neta, $c_limite, $c_nro_total_cuotas, $c_observaciones, $c_tipo_cuenta, $c_excluir, $c_motivo_excluir, $c_fec_archivo, $c_cod_plan, $c_nombre_plan, $c_cod_subplan, $c_nombre_subplan, $c_estado_registro, $c_observacion_registro, $c_usr_modificacion);
		$result = sqlsrv_query( $conn, $sql, $params);
		
		if( $result === false ) {
			del_cab_archivo_nova($conn, $c_cod_carga);
			return die("ERROR| Para el Dpto de Sistemas:".print_r(sqlsrv_errors(), true));
		}
		else{
			return "OK|".sqlsrv_fetch_object($result);
		}
		
	}

	function existe_det_archivo_nova($conn, $cod_plan, $cod_subplan, $no_certificado, $identificacion, $nro_cuota ){
		$sql = "SELECT TOP 1 cod_carga, cod_registro, fec_archivo, usr_modificacion, estado_registro FROM [db_ecuasisec].[dbo].[ea_nov_det_carga] 
		WHERE cod_plan = ? AND cod_subplan = ? AND no_certificado = ? AND identificacion = ? AND nro_cuota = ? ";
		$result = sqlsrv_query($conn, $sql, array($cod_plan, $cod_subplan, $no_certificado, $identificacion, $nro_cuota));
    	$datos = array();

		if($result === false) {
			die(print_r(sqlsrv_errors(), true));
		}
		while($row = sqlsrv_fetch_array($result, SQLSRV_FETCH_ASSOC)) {
			$datos[] = (array) $row;
		}
		return $datos;
	}	

	function del_cab_archivo_nova($conn, $cod_carga){
		$sql  = "DELETE FROM [db_ecuasisec].[dbo].[ea_nov_cab_carga] WHERE cod_carga = ?";
		$params = array($cod_carga);
		
		$result = sqlsrv_query( $conn, $sql, $params);
		if( $result === false ) {
			die(print_r(sqlsrv_errors(), true));
		}
		return "OK|".sqlsrv_fetch_object($result);
	}	

	function del_det_archivo_nova($conn, $cod_carga){
		$sql_det  = "DELETE FROM [db_ecuasisec].[dbo].[ea_nov_det_carga] WHERE cod_carga = ? and estado_registro = 'P' ";
		$params_det = array($cod_carga);
		
		$result_det = sqlsrv_query( $conn, $sql_det, $params_det);
		if( $result_det === false ) {
			die(print_r(sqlsrv_errors(), true));
		}

		return "OK|".sqlsrv_fetch_object($result_det);
	}	
	
	function actualizar_estado_cab_archivo_nova($conn, $cod_carga, $estado_actual, $estado_nuevo, $usuario){
		$sql = "UPDATE [db_ecuasisec].[dbo].[ea_nov_cab_carga] SET estado_carga = ?, usr_carga = ?, fec_procesado = GETDATE() WHERE estado_carga = ? AND cod_carga = ? ";
		$params = array($estado_nuevo, $usuario, $estado_actual, $cod_carga);
		
		$result = sqlsrv_query( $conn, $sql, $params);
		if( $result === false ) {
			die(print_r(sqlsrv_errors(), true));
		}

		return "OK|".sqlsrv_fetch_object($result);
	}
	
	function actualizar_estado_det_archivo_nova($conn, $cod_carga, $estado_actual, $estado_nuevo, $observacion, $usuario){
		$sql = "UPDATE [db_ecuasisec].[dbo].[ea_nov_det_carga] SET estado_registro = ?, observacion_registro = ?, usr_modificacion = ?, fec_modificacion = GETDATE() 
		WHERE estado_registro = ? AND cod_carga = ? ";
		$params = array($estado_nuevo, $observacion, $usuario, $estado_actual, $cod_carga);
		
		$result = sqlsrv_query( $conn, $sql, $params);
		if( $result === false ) {
			die(print_r(sqlsrv_errors(), true));
		}

		return "OK|".sqlsrv_fetch_object($result);
	}	

	function contar_sumar_registros_nova($conn, $cod_plan, $cod_subplan, $fecha){
		$sql = "SELECT count(1) AS cant_reg, isnull(sum(prima_neta),0) as totales FROM [db_ecuasisec].[dbo].[ea_nov_det_carga] WHERE cod_plan = ? AND cod_subplan = ? AND fec_archivo = ? AND estado_registro = 'A' ";
		$params = array($cod_plan, $cod_subplan, $fecha);	

		$result = sqlsrv_query($conn, $sql, $params);
		if($result === false) {
			die(print_r(sqlsrv_errors(), true));
		}
		return sqlsrv_fetch_object($result);
	}

	function lista_cab_nova($conn){
		$sql = "SELECT cod_carga, archivo_cargado, fec_archivo, cod_plan, cod_subplan, cant_registros_carga, cant_registros_error, estado_carga, 
				observacion, fec_carga, usr_carga FROM [db_ecuasisec].[dbo].[ea_nov_cab_carga] WHERE estado_carga = 'P' ORDER BY cod_plan, cod_subplan, fec_archivo";
		$result = sqlsrv_query($conn, $sql);
    	$datos = array();

		if($result === false) {
			die(print_r(sqlsrv_errors(), true));
		}
		while($row = sqlsrv_fetch_array($result, SQLSRV_FETCH_ASSOC)) {
			$datos[] = (array) $row;
		}
		return $datos;
	}	

	function consulta_factura_nova($conn, $cod_plan, $cod_subplan, $fecha_desde, $fecha_hasta){
		$sql = "SELECT identificacion, asegurado, 'S/N' as direccion, 'SC' as correo, '0' as cuenta_tc, fec_archivo, prima_neta 
				FROM [db_ecuasisec].[dbo].[ea_nov_det_carga] WHERE estado_registro = 'A' AND cod_plan = ?  AND cod_subplan = ? 
				AND fec_archivo >= ?  AND fec_archivo <= ? ORDER BY fec_archivo, identificacion";
		$result = sqlsrv_query($conn, $sql, array($cod_plan, $cod_subplan, $fecha_desde, $fecha_hasta));
    	$datos = array();

		if($result === false) {
			die(print_r(sqlsrv_errors(), true));
		}
		while($row = sqlsrv_fetch_array($result, SQLSRV_FETCH_ASSOC)) {
			$datos[] = (array) $row;
		}
		return $datos;
	}

	//-- INI - SGA
	function cons_existe_cliente_nova($conn, $identificacion) {
		$sql = "SELECT count(*) AS existe from [dbo].[ea_datos_clientes_nova] where identificacion = ? ";
		$params = array($identificacion);	

		$result = sqlsrv_query($conn, $sql, $params);
		if($result === false) {
			die(print_r(sqlsrv_errors(), true));
		}
		return sqlsrv_fetch_object($result);
	}

	function consulta_procesos_formatos_nova($conn, $cliente, $proceso){
		$sql = "SELECT TOP 1 cliente, desc_proceso, campos_en_txt, tipo_proceso, tipo_dml, estado_actual, estado_proximo, delimitador, clausula_where FROM ea_procesos WHERE cliente = ? AND nom_proceso = ? ";
		$params = array($cliente, $proceso);
		$result = sqlsrv_query($conn, $sql, $params);
    	$datos = array();
		
		
		if($result === false) {
			die(print_r(sqlsrv_errors(), true));
		}
		while($row = sqlsrv_fetch_array($result, SQLSRV_FETCH_ASSOC)) {
			$datos[] = (array) $row;
		} 
		return $datos;
		
	}	

	function consulta_rep_dir_email ($conn, $planNova){
		$sql = "select DISTINCT (s.rep_dir_email)
				from 	db_ecuasisec.dbo.ea_nov_planes P, 
						db_ecuasisec.dbo.ea_nov_subplanes S 
				where p.cod_plan  = s.cod_plan
				and p.estado  = s.estado 
				and p.estado = 'A'
				and p.cod_plan = ? ";
		$params = array ($planNova);
		$result = sqlsrv_query($conn, $sql, $params);
		$datos = array();

		if($result === false) {
			die(print_r(sqlsrv_errors(), true));
		}

		while($row = sqlsrv_fetch_array($result, SQLSRV_FETCH_ASSOC)) {
			$datos[] = (array) $row;
		}

		return $datos;

	}

	function del_datos_clientes_nova($conn){
		$sql  = "DELETE FROM [dbo].[ea_datos_clientes_nova]";
		
		$result = sqlsrv_query( $conn, $sql);
		if( $result === false ) {
			die(print_r(sqlsrv_errors(), true));
		}
		return "OK|".sqlsrv_fetch_object($result);
	}	

	function actualiza_ea_datos_clientes_nova ($conn, $c_identificacion, $c_nombre_cliente, $c_direccion, $c_telf_domicilio, $c_telf_celular, $c_email, $c_fec_ini_vigencia, $c_fec_fin_vigencia, $c_plan_nova, $c_Nro_polizaAseguradora = false ){
	
		if ($c_Nro_polizaAseguradora) {
			$sql="UPDATE db_ecuasisec.dbo.ea_datos_clientes_nova SET 
					identificacion= ? , 
					nombre_cliente= ?, 
					fec_ini_vigencia= ?, 
					fec_fin_vigencia= ?,
					Nro_polizaAseguradora = ?
				WHERE identificacion= ?";
			$params = array  ( $c_identificacion, $c_nombre_cliente, $c_fec_ini_vigencia, $c_fec_fin_vigencia, $c_Nro_polizaAseguradora, $c_identificacion);
			$result = sqlsrv_query ($conn, $sql, $params);

		}else {
			$sql="UPDATE db_ecuasisec.dbo.ea_datos_clientes_nova SET 
					identificacion= ? , 
					nombre_cliente= ?, 
					direccion= ?, 
					telf_domicilio= ?, 
					telf_celular= ?,
					email= ?,
					fec_ini_vigencia= ?, 
					fec_fin_vigencia= ?,
					plan_nova= ?					
				WHERE identificacion= ?";
			$params = array  ( $c_identificacion, $c_nombre_cliente, $c_direccion, $c_telf_domicilio, $c_telf_celular, $c_email, $c_fec_ini_vigencia, $c_fec_fin_vigencia, $c_plan_nova, $c_identificacion);
			$result = sqlsrv_query ($conn, $sql, $params);
		}
		
		if ($result === false ){
			die (print_r(sqlsrv_errors(), true));
		}

		return "OK|".sqlsrv_fetch_object($result);
	}

	function insert_ea_datos_clientes_nova ($conn, $c_identificacion, $c_nombre_cliente, $c_direccion, $c_telf_domicilio, $c_telf_celular, $c_email, $c_fec_ini_vigencia, $c_fec_fin_vigencia, $c_plan_nova, $c_Nro_polizaAseguradora = false ){
		
		if ($c_Nro_polizaAseguradora ) {
			$sql="INSERT INTO db_ecuasisec.dbo.ea_datos_clientes_nova
					(  identificacion, nombre_cliente, fec_ini_vigencia, fec_fin_vigencia, Nro_polizaAseguradora)
				VALUES(  ?, ?, ?, ?, ? )";
			$params = array  ( $c_identificacion, $c_nombre_cliente, $c_fec_ini_vigencia, $c_fec_fin_vigencia, $c_Nro_polizaAseguradora);
			$result = sqlsrv_query ($conn, $sql, $params);

		}else {
			$sql="INSERT INTO db_ecuasisec.dbo.ea_datos_clientes_nova
					(  identificacion, nombre_cliente, direccion, telf_domicilio, telf_celular, email, fec_ini_vigencia, fec_fin_vigencia, plan_nova)
				VALUES(  ?, ?, ?, ?, ?, ?, ?, ?, ? )";
			$params = array  ( $c_identificacion, $c_nombre_cliente, $c_direccion, $c_telf_domicilio, $c_telf_celular, $c_email, $c_fec_ini_vigencia, $c_fec_fin_vigencia, $c_plan_nova);
			$result = sqlsrv_query ($conn, $sql, $params);
		}

		if ($result === false ){
			die (print_r(sqlsrv_errors(), true));
		}

		return "OK|".sqlsrv_fetch_object($result);
	}
		//-- FIN - SGA
	// -- FIN NOVA


	//----------------------------------------------------------------------------------------
	// INICIO otros clientes BGR

	function del_base_activa($conn){
		$sql  = "DELETE FROM [db_ecuasisec].[dbo].[ea_base_activa] ";
		
		$result = sqlsrv_query( $conn, $sql);
		if( $result === false ) {
			die(print_r(sqlsrv_errors(), true));
		}
		return "OK|".sqlsrv_fetch_object($result);
	}	
	
	function inserta_base_activa($conn, $camp_00, $camp_01, $camp_02, $camp_03, $camp_04, $camp_05, $camp_06, $camp_07, $camp_08, $camp_09, 
								$camp_10, $camp_11, $camp_12, $camp_13, $camp_14, $camp_15, $camp_16, $camp_17, $camp_18, $camp_19,
								$camp_20, $camp_21, $camp_22, $camp_23, $camp_24, $camp_25, $camp_26, $camp_27, $camp_28, $camp_29,
								$camp_30, $camp_31, $camp_32, $camp_33, $camp_34, $camp_35, $camp_36, $camp_37, $camp_38, $camp_39,
								$camp_40, $camp_41, $camp_42, $camp_43, $camp_44, $camp_45, $camp_46, $camp_47, $camp_48, $camp_49,
								$camp_50, $camp_51, $camp_52, $camp_53, $camp_54, $camp_55, $camp_56, $camp_57, $camp_58, $camp_59,
								$camp_60, $camp_61, $camp_62, $camp_63, $camp_64, $cliente, $producto, $subproducto, $estado, $observacion, $usuario, $anio, $mes, $dia, $fec_carga, 
								$file_base_colocacion, $fileout_telemarketing, $filein_telemarketing, $fileout_banco_info, $filein_banco_info, 
								$fileout_debitos, $filein_debitos, $fileout_factura, $filein_factura){
		$sql  = "INSERT INTO [db_ecuasisec].[dbo].[ea_base_activa] (tipide, cedula, nombre, apellido, cuenta, tarjeta, fecvigen, tiptar, clase, telefono1, 
		telefono2, telefono3, telefono4, telefono5, telefono6, telefono7, direccion, provincia, ciudad, prefijo, 
		direccion2, ciudad2, prefijo2, estado_cli, visa, master, super, austro, seguro, estado, 
		tipresp, codresp, detresp, telfnuevo, detalle, fecha, hora, operador, codoper, activa, 
		archivo, archivo1, archivo2, enviada, edadanio, edad, numllama, fecreges, h_cliente, fechcarga, 
		telcon, email, celnuevo, tipcliente, titulo, env_asi, gestion, fechllama, conversa, comentario, 
		ama_send, ama_status, fecest, horaest, usmod, cliente, producto, subproducto, estado_reg, fecha_reg, observacion, usuario_reg, anio, mes, dia, fec_carga, file_base_colocacion, 
		fileout_telemarketing, filein_telemarketing, fileout_banco_info, filein_banco_info, fileout_debitos, filein_debitos, fileout_factura, filein_factura) 
		VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
		?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, GETDATE(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )";
		$params = array($camp_00, $camp_01, $camp_02, $camp_03, $camp_04, $camp_05, $camp_06, $camp_07, $camp_08, $camp_09, 
						$camp_10, $camp_11, $camp_12, $camp_13, $camp_14, $camp_15, $camp_16, $camp_17, $camp_18, $camp_19,
						$camp_20, $camp_21, $camp_22, $camp_23, $camp_24, $camp_25, $camp_26, $camp_27, $camp_28, $camp_29,
						$camp_30, $camp_31, $camp_32, $camp_33, $camp_34, $camp_35, $camp_36, $camp_37, $camp_38, $camp_39,
						$camp_40, $camp_41, $camp_42, $camp_43, $camp_44, $camp_45, $camp_46, $camp_47, $camp_48, $camp_49,
						$camp_50, $camp_51, $camp_52, $camp_53, $camp_54, $camp_55, $camp_56, $camp_57, $camp_58, $camp_59,
						$camp_60, $camp_61, $camp_62, $camp_63, $camp_64, $cliente, $producto, $subproducto, $estado, $observacion, $usuario, $anio, 
						$mes, $dia, $fec_carga, $file_base_colocacion, $fileout_telemarketing, $filein_telemarketing, $fileout_banco_info, $filein_banco_info, 
						$fileout_debitos, $filein_debitos, $fileout_factura, $filein_factura
					);

		$result = sqlsrv_query($conn, $sql, $params);
		if( $result === false ) {
			die(print_r(sqlsrv_errors(), true));
		}
		return "OK|".sqlsrv_fetch_object($result);	
			
	}

	function actualiza_base_activa($conn, $c_tipide, $c_cedula, $c_nombre, $c_apellido, $c_cuenta, $c_tarjeta, $c_fecvigen, $c_tiptar, $c_clase, 
				$c_telefono1, $c_telefono2, $c_telefono3, $c_telefono4, $c_telefono5, $c_telefono6, $c_telefono7, $c_direccion, $c_provincia, $c_ciudad, $c_prefijo, 
				$c_direccion2, $c_ciudad2, $c_prefijo2, $c_estado_cli, $c_visa, $c_master, $c_super, $c_austro, $c_seguro, $c_estado, $c_tipresp, $c_codresp, 
				$c_detresp, $c_telfnuevo, $c_detalle, $c_fecha, $c_hora, $c_operador, $c_codoper, $c_activa, $c_archivo, $c_archivo1, $c_archivo2, $c_enviada, 
				$c_edadanio, $c_edad, $c_numllama, $c_fecreges, $c_h_cliente, $c_fechcarga, $c_telcon, $c_email, $c_celnuevo, $c_tipcliente, $c_titulo, $c_env_asi, 
				$c_gestion, $c_fechllama, $c_conversa, $c_comentario, $c_ama_send, $c_ama_status, $c_fecest, $c_horaest, $c_usmod, $cliente, $producto, $subproducto, 
				$estado, $observacion, $usuario, $anio, $mes, $dia, $fec_carga, 
				$file_base_colocacion, $fileout_telemarketing, $filein_telemarketing, $fileout_banco_info, $filein_banco_info, 
				$fileout_debitos, $filein_debitos, $fileout_factura, $filein_factura){
		$sql  = "UPDATE [db_ecuasisec].[dbo].[ea_base_activa] SET tipide = ?, nombre = ?, apellido = ?, cuenta = ?, tarjeta = ?, fecvigen = ?, tiptar = ?, clase = ?, 
		telefono1 = ?, telefono2 = ?, telefono3 = ?, telefono4 = ?, telefono5 = ?, telefono6 = ?, telefono7 = ?, direccion = ?, provincia = ?, ciudad = ?, prefijo = ?, 
		direccion2 = ?, ciudad2 = ?, prefijo2 = ?, estado_cli = ?, visa = ?, master = ?, super = ?, austro = ?, seguro = ?, estado = ?, tipresp = ?, codresp = ?, 
		detresp = ?, telfnuevo = ?, detalle = ?, fecha = ?, hora = ?, operador = ?, codoper = ?, activa = ?, archivo = ?, archivo1 = ?, archivo2 = ?, enviada = ?, 
		edadanio = ?, edad = ?, numllama = ?, fecreges = ?, h_cliente = ?, fechcarga = ?, telcon = ?, email = ?, celnuevo = ?, tipcliente = ?, titulo = ?, env_asi = ?, 
		gestion = ?, fechllama = ?, conversa = ?, comentario = ?, ama_send = ?, ama_status = ?, fecest = ?, horaest = ?, usmod = ?, 
		estado_reg = ?, observacion = ?, usuario_reg = ?, anio = ?, mes = ?, dia = ?, fec_carga = ?, 
		file_base_colocacion = ISNULL(?,file_base_colocacion), fileout_telemarketing = ISNULL(?,fileout_telemarketing), filein_telemarketing = ISNULL(?,filein_telemarketing), fileout_banco_info = ISNULL(?,fileout_banco_info), filein_banco_info = ISNULL(?,filein_banco_info), 
		fileout_debitos = ISNULL(?,fileout_debitos), filein_debitos = ISNULL(?,filein_debitos), fileout_factura = ISNULL(?,fileout_factura), filein_factura = ISNULL(?,filein_factura)
		WHERE cliente = ? AND producto = ? AND subproducto = ? AND cedula = ? ";
		$params = array($c_tipide, $c_nombre, $c_apellido, $c_cuenta, $c_tarjeta, $c_fecvigen, $c_tiptar, $c_clase, 
					$c_telefono1, $c_telefono2, $c_telefono3, $c_telefono4, $c_telefono5, $c_telefono6, $c_telefono7, $c_direccion, $c_provincia, $c_ciudad, $c_prefijo, 
					$c_direccion2, $c_ciudad2, $c_prefijo2, $c_estado_cli, $c_visa, $c_master, $c_super, $c_austro, $c_seguro, $c_estado, $c_tipresp, $c_codresp, 
					$c_detresp, $c_telfnuevo, $c_detalle, $c_fecha, $c_hora, $c_operador, $c_codoper, $c_activa, $c_archivo, $c_archivo1, $c_archivo2, $c_enviada, 
					$c_edadanio, $c_edad, $c_numllama, $c_fecreges, $c_h_cliente, $c_fechcarga, $c_telcon, $c_email, $c_celnuevo, $c_tipcliente, $c_titulo, $c_env_asi, 
					$c_gestion, $c_fechllama, $c_conversa, $c_comentario, $c_ama_send, $c_ama_status, $c_fecest, $c_horaest, $c_usmod, 
					$estado, $observacion, $usuario, $anio, $mes, $dia, $fec_carga, 
					$file_base_colocacion, $fileout_telemarketing, $filein_telemarketing, $fileout_banco_info, $filein_banco_info, 
					$fileout_debitos, $filein_debitos, $fileout_factura, $filein_factura, 
					$cliente, $producto, $subproducto,$c_cedula
					);

		$result = sqlsrv_query( $conn, $sql, $params);
		if( $result === false ) {
			die(print_r(sqlsrv_errors(), true));
		}
		return "OK|".sqlsrv_fetch_object($result);	
		//return "OK|".$sql;

			
	}

	function del_base_colocacion($conn, $cliente, $producto, $subproducto){
		$sql  = "DELETE FROM [db_ecuasisec].[dbo].[ea_base_activa] WHERE estado_reg = 'NBC' AND cliente = ? AND producto = ? AND subproducto = ? ";
		$params = array($cliente, $producto, $subproducto);	

		$result = sqlsrv_query( $conn, $sql, $params);
		if( $result === false ) {
			die(print_r(sqlsrv_errors(), true));
		}
		return "OK|".sqlsrv_fetch_object($result);
	}	

	function cons_existe_base_colocacion($conn, $cedula, $cliente, $producto, $subproducto){
		$sql = "SELECT count(*) AS existe FROM [db_ecuasisec].[dbo].[ea_base_activa] WHERE cedula = ? AND cliente = ? AND producto = ? AND subproducto = ?";
		$params = array($cedula, $cliente, $producto, $subproducto);	

		$result = sqlsrv_query($conn, $sql, $params);
		if($result === false) {
			die(print_r(sqlsrv_errors(), true));
		}
		return sqlsrv_fetch_object($result);
	}

	function lista_pend_telemarketing($conn){
		$sql = "SELECT file_base_colocacion, fec_carga, producto, count(*) AS existe FROM [db_ecuasisec].[dbo].[ea_base_activa] WHERE estado_reg = 'NBC' 
		group by file_base_colocacion, fec_carga, producto ORDER BY fec_carga, producto";
		$result = sqlsrv_query($conn, $sql);
    	$datos = array();

		if($result === false) {
			die(print_r(sqlsrv_errors(), true));
		}
		while($row = sqlsrv_fetch_array($result, SQLSRV_FETCH_ASSOC)) {
			$datos[] = (array) $row;
		}
		return $datos;
	}	

	function consulta_pend_telemarketing($conn, $archivo, $producto){
		$sql = "SELECT cedula, nombre, telefono1, telefono2, telefono3, ciudad FROM [db_ecuasisec].[dbo].[ea_base_activa] WHERE producto = ? and estado_reg = 'NBC' and file_base_colocacion = ? ";
    	$params = array($producto, $archivo);
		$result = sqlsrv_query($conn, $sql, $params);
		$datos = array();

		if($result === false) {
			die(print_r(sqlsrv_errors(), true));
		}
		while($row = sqlsrv_fetch_array($result, SQLSRV_FETCH_ASSOC)) {
			$datos[] = (array) $row;
		}
		return $datos;
	}		

	//SGA - CAMBIA PARAMETROS OPCIONALES.
	function consulta_nombre_campo($conn, $proceso, $cliente, $producto=false, $subproducto=false, $posicion){
		
		if ( $producto && $subproducto ){
			$sql = "SELECT TOP 1 nom_campo FROM [db_ecuasisec].[dbo].[ea_config_procesos] WHERE nom_proceso = ? AND cliente = ? AND producto = ? AND subproducto = ? and posicion_campo_en_txt = ? ";
    		$params = array($proceso, $cliente, $producto, $subproducto, $posicion);
			$result = sqlsrv_query($conn, $sql, $params);
		}else{
			$sql = "select nom_campo
					from db_ecuasisec.dbo.ea_config_procesos 
					where nom_proceso = ?
					and cliente = ?
					and productosMultiples = 'SI' 
					and posicion_campo_en_txt = ? ";
			$params = array ($proceso, $cliente, $posicion);
			$result = sqlsrv_query ($conn, $sql, $params);
		}
		
		$datos = array();

		if($result === false) {
			die(print_r(sqlsrv_errors(), true));
		}
		return sqlsrv_fetch_object($result);
	
	}

	function lista_generar_archivo($conn, $cliente, $producto, $subproducto, $proceso, $clausula_where){
		if ( strlen($clausula_where) > 2 ){
			$clausula_where = " AND a.".$clausula_where." ";
		}		
		$sql = "SELECT a.cliente, a.producto, a.subproducto, b.nom_proceso, b.desc_proceso, a.file_base_colocacion, a.fec_carga, a.estado_reg, count(*) AS existe 
		FROM [db_ecuasisec].[dbo].[ea_base_activa] AS a, [db_ecuasisec].[dbo].[ea_procesos] AS b 
		WHERE a.cliente = ? AND a.producto = ? AND a.subproducto = ? AND b.nom_proceso = ? AND a.estado_reg = b.estado_actual ".$clausula_where." 
		GROUP BY a.cliente, a.producto, a.subproducto, b.nom_proceso, b.desc_proceso, a.file_base_colocacion, a.fec_carga, a.estado_reg 
		ORDER BY a.fec_carga";
		$params = array($cliente, $producto, $subproducto, $proceso);
		$result = sqlsrv_query($conn, $sql, $params);
    	$datos = array();

		if($result === false) {
			die(print_r(sqlsrv_errors(), true));
		}
		while($row = sqlsrv_fetch_array($result, SQLSRV_FETCH_ASSOC)) {
			$datos[] = (array) $row;
		}
		return $datos;
	}	

	function consulta_cab_datos_generar($conn, $cliente, $producto, $subproducto, $proceso){
		$sql = "SELECT a.nom_campo, a.nom_cabecera, a.color_fondo_cabecera, a.con_dato_mapeable FROM [db_ecuasisec].[dbo].[ea_config_procesos] AS a 
		WHERE a.cliente = ? AND a.producto = ? AND a.subproducto = ? AND a.nom_proceso = ? ORDER BY a.posicion_campo_en_txt";
    	$params = array($cliente, $producto, $subproducto, $proceso);
		$result = sqlsrv_query($conn, $sql, $params);
		$datos = array();

		if($result === false) {
			die(print_r(sqlsrv_errors(), true));
		}
		while($row = sqlsrv_fetch_array($result, SQLSRV_FETCH_ASSOC)) {
			$datos[] = (array) $row;
		}
		return $datos;
	}	

	function consulta_det_datos_generar($conn, $cliente, $producto, $subproducto, $proceso, $campos_select_dinamicos, $estado, $nombre_archivo, $fec_carga, $where){
		if ( strlen($where) > 2 ){
			$where = " AND ".$where;
		}
		$sql = "SELECT ".$campos_select_dinamicos." FROM [db_ecuasisec].[dbo].[ea_base_activa] WHERE cliente = ? AND producto = ? AND subproducto = ? AND estado_reg = ? AND file_base_colocacion = ? ".$where;
    	$params = array($cliente, $producto, $subproducto, $estado, $nombre_archivo);
		$result = sqlsrv_query($conn, $sql, $params);
		$datos = array();

		if($result === false) {
			die(print_r(sqlsrv_errors(), true));
		}
		while($row = sqlsrv_fetch_array($result, SQLSRV_FETCH_ASSOC)) {
			$datos[] = (array) $row;
		}
		return $datos;
	}		
	
	function consulta_proceso($conn, $cliente, $proceso){
		$sql = "SELECT TOP 1 cliente, desc_proceso, campos_en_txt, tipo_proceso, tipo_dml, estado_actual, estado_proximo, delimitador, clausula_where FROM ea_procesos WHERE cliente = ? AND nom_proceso = ? ";
		$params = array($cliente, $proceso);
		$result = sqlsrv_query($conn, $sql, $params);
    	$datos = array();

		if($result === false) {
			die(print_r(sqlsrv_errors(), true));
		}
		while($row = sqlsrv_fetch_array($result, SQLSRV_FETCH_ASSOC)) {
			$datos[] = (array) $row;
		}
		return $datos;
	}	

	//SGA - AGREGO PARAM OPCIONAL
	function lista_clientes($conn, $pIdCliente = false){
		
		if ( $pIdCliente) {
			$sql = "SELECT cliente, desc_cliente FROM [db_ecuasisec].[dbo].[ea_clientes]  where id_cliente = ? ORDER BY orden";
			$params = array($pIdCliente);
			$result = sqlsrv_query($conn, $sql, $params);
		}else {
			$sql = "SELECT cliente, desc_cliente FROM [db_ecuasisec].[dbo].[ea_clientes]  ORDER BY orden";
			$result = sqlsrv_query($conn, $sql);
		}
		
	
		$datos = array();

		if($result === false) {
			die(print_r(sqlsrv_errors(), true));
		}
		while($row = sqlsrv_fetch_array($result, SQLSRV_FETCH_ASSOC)) {
			$datos[] = (array) $row;
		}
		return $datos;
	}	

	function get_desc_cliente($conn, $cliente){
		$sql = "SELECT desc_cliente FROM [db_ecuasisec].[dbo].[ea_nov_planes] AND cliente = ?";
		$result = sqlsrv_query($conn, $sql, array($cliente));
    	$datos = array();

		if($result === false) {
			die(print_r(sqlsrv_errors(), true));
		}
		return sqlsrv_fetch_object($result);
	}		

	function lista_productos($conn, $cliente){
		$sql = "SELECT nom_producto, desc_producto FROM [db_ecuasisec].[dbo].[ea_productos] WHERE cliente = ? ORDER BY orden";
		$result = sqlsrv_query($conn, $sql, array($cliente));
    	$datos = array();

		if($result === false) {
			die(print_r(sqlsrv_errors(), true));
		}
		while($row = sqlsrv_fetch_array($result, SQLSRV_FETCH_ASSOC)) {
			$datos[] = (array) $row;
		}
		return $datos;
	}
	
	function get_desc_productos($conn, $cliente, $producto){
		$sql = "SELECT desc_producto FROM [db_ecuasisec].[dbo].[ea_productos] WHERE cliente = ? AND nom_producto = ? ";
		$result = sqlsrv_query($conn, $sql, array($cliente, $producto));
    	$datos = array();

		if($result === false) {
			die(print_r(sqlsrv_errors(), true));
		}
		return sqlsrv_fetch_object($result);
	}		

	function lista_subproductos($conn, $cliente, $producto){
		$sql = "SELECT nom_subproducto, desc_subproducto FROM [db_ecuasisec].[dbo].[ea_subproductos] WHERE cliente = ? AND producto = ? ORDER BY orden";
		$result = sqlsrv_query($conn, $sql, array($cliente, $producto));
    	$datos = array();

		if($result === false) {
			die(print_r(sqlsrv_errors(), true));
		}
		while($row = sqlsrv_fetch_array($result, SQLSRV_FETCH_ASSOC)) {
			$datos[] = (array) $row;
		}
		return $datos;
	}
	
	function get_desc_subproductos($conn, $cliente, $producto, $subproducto){
		$sql = "SELECT desc_subproducto FROM [db_ecuasisec].[dbo].[ea_subproductos] WHERE cliente = ? AND producto = ? AND nom_subproducto = ?";
		$result = sqlsrv_query($conn, $sql, array($cliente, $producto, $subproducto));
    	$datos = array();

		if($result === false) {
			die(print_r(sqlsrv_errors(), true));
		}
		return sqlsrv_fetch_object($result);
	}	

	function lista_procesos($conn, $cliente, $tipo_proceso){
		$sql = "SELECT nom_proceso, desc_proceso FROM [db_ecuasisec].[dbo].[ea_procesos] WHERE cliente = ? AND tipo_proceso = ? ORDER BY orden";
		$result = sqlsrv_query($conn, $sql, array($cliente, $tipo_proceso));
    	$datos = array();

		if($result === false) {
			die(print_r(sqlsrv_errors(), true));
		}
		while($row = sqlsrv_fetch_array($result, SQLSRV_FETCH_ASSOC)) {
			$datos[] = (array) $row;
		}
		return $datos;
	}

	function lista_respuestas_tmk($conn){
		$sql = "SELECT tipresp, codresp, detresp FROM [db_ecuasisec].[dbo].[ea_tipos_repuestas] ORDER BY orden";
		$result = sqlsrv_query($conn, $sql);
    	$datos = array();

		if($result === false) {
			die(print_r(sqlsrv_errors(), true));
		}
		while($row = sqlsrv_fetch_array($result, SQLSRV_FETCH_ASSOC)) {
			$datos[] = (array) $row;
		}
		return $datos;
	}

	function get_tipresp($conn, $codresp){
		$sql = "SELECT tipresp FROM [db_ecuasisec].[dbo].[ea_tipos_repuestas] WHERE codresp = ?";
		$result = sqlsrv_query($conn, $sql, array($codresp));
    	$datos = array();

		if($result === false) {
			die(print_r(sqlsrv_errors(), true));
		}
		return sqlsrv_fetch_object($result);
	}	


?>