<?php

	/**
	 * TasasProductosAuto
	 */
	class TasasProductosAuto
	{
		public $cod_registro;
		public $cod_cia;
		public $num_poliza_grupo;
		public $nom_num_poliza_grupo;
		public $num_contrato;
		public $num_contrato2;
		public $num_poliza_cliente;
		public $cod_docum;
		public $nom_cliente;
		public $cod_sector;
		public $nom_sector;
		public $cod_subsector;
		public $nom_subsector;
		public $cod_ramo;
		public $nom_ramo;
		public $cod_grupo_vehi;
		public $nom_grupo_vehi;
		public $cod_subgrupo_vehi;
		public $nom_subgrupo_vehi;
		public $cod_marca;
		public $nom_marca;
		public $cod_familia_veh;
		public $nom_familia_veh;
		public $cod_zona;
		public $nom_zona;
		public $cod_localidad;
		public $nom_localidad;
		public $cod_prov;
		public $nom_prov;
		public $cod_cob;
		public $nom_cob;
		public $num_desde;
		public $num_hasta;
		public $cod_modalidad;
		public $nom_modalidad;
		public $pct_tasa_cob;
		public $imp_cob;
		public $fec_validez;
		public $mca_inh;
		public $fec_baja;
		public $fec_equipo;
		public $cod_usr;
		public $tip_spto;
		public $tip_renovacion;
		public $capital_desde;
		public $capital_hasta;
		public $edad_desde;
		public $edad_hasta;
	}

	/**
	 * Compania
	 */
	class Compania
	{
		public $cod_cia;
		public $nom_cia;
	}

	/**
	 * Sector
	 */
	class Sector
	{
		public $cod_sector;
		public $nom_sector;
	}

	 /**
	 * Subsector
	 */
	class Subsector
	{
		public $cod_subsector;
		public $nom_subsector;
	}

	 /**
	 * Ramo
	 */
	class Ramo
	{
		public $cod_ramo;
		public $nom_ramo;
	}
	
	 /**
	 * Grupo_vehi
	 */
	class Grupo_vehi
	{
		public $cod_tip_vehi;
		public $nom_tip_vehi;
	}	
	
	 /**
	 * Provincia
	 */
	class Provincia
	{
		public $cod_estado;
		public $nom_estado;
		public $cod_prov;
		public $nom_prov;		
	}	

	 /**
	 * Num_poliza
	 */
	class Num_poliza
	{
		public $num_poliza;
		public $nom_poliza;
	}
	
	 /**
	 * Num_poliza
	 */
	class Num_contrato
	{
		public $num_contrato;
		public $nom_contrato;
	}	
	
	 /**
	 * Num_poliza
	 */
	class Modalidad
	{
		public $cod_modalidad;
		public $nom_modalidad;
	}		
	
	 /**
	 * Cobertura
	 */
	class Cobertura
	{
		public $cod_cob;
		public $nom_cob;
	}		
	
?>

