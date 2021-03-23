<?php

/**
 * ac_db.inc.php: Database class using the PHP OCI8 extension
 * @package Oracle
 */

namespace Oracle;

require dirname(__FILE__).'/../config.inc.php';

/**
 * Oracle Database access methods
 * @package Oracle
 * @subpackage Db
 */
class Db
{

    /**
     * @var resource The connection resource
     * @access protected
     */
    public $conn = null;
    /**
     * @var resource The statement resource identifier
     * @access protected
     */
    protected $stid = null;
    /**
     * @var integer The number of rows to prefetch with queries
     * @access protected
     */
    protected $prefetch = 100;

    /**
     * Constructor opens a connection to the database
     * @param string $module Module text for End-to-End Application Tracing
     * @param string $cid Client Identifier for End-to-End Application Tracing
     */
    public function __construct($module, $cid)
    {
        $this->conn = @oci_pconnect(SCHEMA, PASSWORD, DATABASE, CHARSET);
        if (!$this->conn) {
            $m = oci_error();
            throw new \Exception('Cannot connect to database: ' . $m['message']);
        }
        // Record the "name" of the web user, the client info and the module.
        // These are used for end-to-end tracing in the DB.
        oci_set_client_info($this->conn, CLIENT_INFO);
        oci_set_module_name($this->conn, $module);
        oci_set_client_identifier($this->conn, $cid);
    }

    /**
     * Destructor closes the statement and connection
     */
    public function __destruct()
    {
        if ($this->stid) {
            oci_free_statement($this->stid);
        }

        if ($this->conn) {
            oci_close($this->conn);
        }

    }

    /**
     * @param string $sql The statement to run
     * @param string $action Action text for End-to-End Application Tracing
     * @param array $bindvars Binds. An array of (bv_name, php_variable, length)
     */
    public function execute($sql, $action, $bindvars = array())
    {
        $this->stid = oci_parse($this->conn, $sql);
        if ($this->prefetch >= 0) {
            oci_set_prefetch($this->stid, $this->prefetch);
        }
        foreach ($bindvars as $bv) {
            // oci_bind_by_name(resource, bv_name, php_variable, length, object_type)
            oci_bind_by_name($this->stid, $bv[0], $bv[1], $bv[2]);
        }
        oci_set_action($this->conn, $action);
        oci_execute($this->stid); // will auto commit
    }

    /**
     * @param string $sql The statement to run
     * @param string $action Action text for End-to-End Application Tracing
     * @param array $bindvars Binds. An array of (bv_name, php_variable, length)
     */
    public function executeFetchOut($sql, $action, $bindvars = array())
    {
        $this->stid = oci_parse($this->conn, $sql);
        if ($this->prefetch >= 0) {
            oci_set_prefetch($this->stid, $this->prefetch);
        }
        foreach ($bindvars as $bv) {
            // oci_bind_by_name(resource, bv_name, php_variable, length, object_type)
            if ($bv[0] == ':p_n_error') {
                oci_bind_by_name($this->stid, $bv[0], $cod_error, 10);
            }else if($bv[0] == ':p_v_error'){
                oci_bind_by_name($this->stid, $bv[0], $mensaje, 200);
            } else {
                oci_bind_by_name($this->stid, $bv[0], $bv[1]);
            }
        }
        oci_set_action($this->conn, $action);
        oci_execute($this->stid); // will auto commit
        $out_params = array('cod_error' => $cod_error, 'mensaje' => $mensaje);
        return $out_params;
    }

    /**
     * Run a query and return all rows.
     *
     * @param string $sql A query to run and return all rows
     * @param string $action Action text for End-to-End Application Tracing
     * @param array $bindvars Binds. An array of (bv_name, php_variable, length)
     * @return array An array of rows
     */
    public function execFetchAll($sql, $action, $bindvars = array())
    {
        $this->execute($sql, $action, $bindvars);
        oci_fetch_all($this->stid, $res, 0, -1, OCI_FETCHSTATEMENT_BY_ROW);
        $this->stid = null; // free the statement resource
        return ($res);
    }

    /**
     * Run a query and return all rows from procedure into a cursor.
     *
     * @param string $sql A query to run and return all rows
     * @param string $action Action text for End-to-End Application Tracing
     * @param array $bindvars Binds. An array of (bv_name, php_variable, length, object_type)
     * @return array An array of rows
     */
    public function execFetchOutCursor($sql, $action, $bindvars = array())
    {
        $this->execute($sql, $action, $bindvars);
        $cursor = '';
        foreach ($bindvars as $bv) {
            $cursor = $bv[1];
        }
        oci_execute($cursor);
        oci_fetch_all($cursor, $res, 0, -1, OCI_FETCHSTATEMENT_BY_ROW);
        $this->stid = null; // free the statement resource
        return ($res);
    }
    
     /**
     * @param string $sql A SQL string calling a PL/SQL stored procedure
     * @param string $action Action text for End-to-End Application Tracing
     * @param string $rcname the name of the REF CURSOR bind variable
     * @param array  $otherbindvars Binds. Array (bv_name, php_variable, length)
     * @return array Returns an array of tuples
     */
    public function refcurExecFetchAll($sql, $action, $rcname, $otherbindvars = array()) {
        $this->stid = oci_parse($this->conn, $sql);
        $rc = oci_new_cursor($this->conn);
        oci_bind_by_name($this->stid, $rcname, $rc, -1, OCI_B_CURSOR);

        foreach ($otherbindvars as $bv) {
            // oci_bind_by_name(resource, bv_name, php_variable, length)
            //OUT PARAMS
            if ($bv[0] == ':p_tot_reg') {
                oci_bind_by_name($this->stid, $bv[0], $total_reg, 50);
            }else if($bv[0] == ':p_n_error'){
                oci_bind_by_name($this->stid, $bv[0], $cod_error, 10);
            }else if($bv[0] == ':p_v_error'){
                oci_bind_by_name($this->stid, $bv[0], $mensaje, 200);
            //IN PARAMS
            }else{
                oci_bind_by_name($this->stid, $bv[0], $bv[1], $bv[2]);
            }
        }

        oci_set_action($this->conn, $action);
        oci_execute($this->stid);
        oci_execute($rc); // run the ref cursor as if it were a statement id
        oci_fetch_all($rc, $res, 0, -1, OCI_FETCHSTATEMENT_BY_ROW);
        $this->stid = null;
        $out_msg = array('total_reg' => $total_reg, 'cod_error' => $cod_error, 'mensaje' => $mensaje);
        $out_rc = $res;
        return array($out_msg, $out_rc);
    }
    
    public function refcurNormExecFetchAll($sql, $action, $rcname, $otherbindvars = array()) {
        $this->stid = oci_parse($this->conn, $sql);
        $rc = oci_new_cursor($this->conn);
        oci_bind_by_name($this->stid, $rcname, $rc, -1, OCI_B_CURSOR);

        foreach ($otherbindvars as $bv) {
            // oci_bind_by_name(resource, bv_name, php_variable, length)
            //OUT PARAMS
            if($bv[0] == ':p_n_error'){
                oci_bind_by_name($this->stid, $bv[0], $cod_error, 10);
            }else if($bv[0] == ':p_v_error'){
                oci_bind_by_name($this->stid, $bv[0], $mensaje, 200);
            //IN PARAMS
            }else{
                oci_bind_by_name($this->stid, $bv[0], $bv[1], $bv[2]);
            }
        }

        oci_set_action($this->conn, $action);
        oci_execute($this->stid);
        oci_execute($rc); // run the ref cursor as if it were a statement id
        oci_fetch_all($rc, $res, 0, -1, OCI_FETCHSTATEMENT_BY_ROW);
        $this->stid = null;
        $out_msg = array('cod_error' => $cod_error, 'mensaje' => $mensaje);
        $out_rc = $res;
        return array($out_msg, $out_rc);
    }
    
    
    
    
}

?>

