<!DOCTYPE html>
<html>
<head>
	<title>Detalle de Archivo</title>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap-theme.min.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
<link rel="icon" href="imagenes/logo_icono.png" /> 
</head>
<body>

<?php
    require_once 'PHPExcel/Classes/PHPExcel.php';
    require_once 'cryp.php';
    $trama_original = $_GET['p_trama'];
    $trama_desencritada = desencriptar($trama_original);
    $trama_cabeceras = explode("|",$trama_desencritada);
?>


<h1 class="logo" title="ECUASISTENCIA">
    <img src="imagenes/logo_ecuasistencia.png" alt="DefaultAlt" title="DefaultAlt" width="500" height="53" />
</h1>
                    

<div class="container" style="width: 90%;">
    <div class="panel panel-primary">
      <div class="panel-heading">
        <h3 class="panel-title">Archivo: <strong><?php echo $trama_cabeceras[1]; ?></strong></h3>
      </div>
      <div class="panel-body">
        <div class="col-lg-12">
            
<?php

    $cod_carga = $trama_cabeceras[0];
    $archivo = "uploads/".$trama_cabeceras[1];

    $inputFileType = PHPExcel_IOFactory::identify($archivo);
    $objReader = PHPExcel_IOFactory::createReader($inputFileType);
    $objPHPExcel = $objReader->load($archivo);
    $sheet = $objPHPExcel->getSheet(0); 
    $highestRow = $sheet->getHighestRow(); 
    $highestColumn = $sheet->getHighestColumn();

    function getcolumnrange($min,$max){
        $pointer=strtoupper($min);
        $output=array();
        while(positionalcomparison($pointer,strtoupper($max))<=0){
            array_push($output,$pointer);
            $pointer++;
        }
        return $output;
    }

    function positionalcomparison($a,$b){
    $a1=stringtointvalue($a); $b1=stringtointvalue($b);
    if($a1>$b1)return 1;
    else if($a1<$b1)return -1;
    else return 0;
    }

    function stringtointvalue($str){
    $amount=0;
    $strarra=array_reverse(str_split($str));

    for($i=0;$i<strlen($str);$i++){
        $amount+=(ord($strarra[$i])-64)*pow(26,$i);
    }
    return $amount;
    } 

?>

<table class="table table-bordered" style="font-size:11px;">
      <thead>
        <tr>
          <th>#</th>												
          <th>Nro. Proceso</th>
          <th>Nro. de certificado</th>
          <th>Asegurado</th>
          <th>Identificaci&oacute;n</th>
          <th>Estado</th>
          <th>Nro. Cuota</th>
          <th>Prima Neta</th>
          <th>L&iacute;mite</th>
          <th>Nro. de cuotas</th>
          <th>Observaciones</th>
          <th>Tipo de Cuenta</th>
          <th>Excluir</th>
          <th>Motivo Exclusi&oacute;n</th>
        </tr>
      </thead>
      <tbody>


      <?php
        $num=0;
        for ($row = 2; $row <= $highestRow; $row++){ $num++;?>
              <tr>
                  <th scope='row'><?php echo $num;?></th>
                  <td><?php echo $sheet->getCell("A".$row)->getValue();?></td>
                  <td><?php echo $sheet->getCell("B".$row)->getValue();?></td>
                  <td><?php echo $sheet->getCell("C".$row)->getValue();?></td>
                  <td><?php echo $sheet->getCell("D".$row)->getValue();?></td>
                  <td><?php echo $sheet->getCell("E".$row)->getValue();?></td>
                  <td><?php echo $sheet->getCell("F".$row)->getValue();?></td>
                  <td><?php echo $sheet->getCell("G".$row)->getValue();?></td>
                  <td><?php echo $sheet->getCell("H".$row)->getValue();?></td>
                  <td><?php echo $sheet->getCell("I".$row)->getValue();?></td>
                  <td><?php echo $sheet->getCell("J".$row)->getValue();?></td>
                  <td><?php echo $sheet->getCell("K".$row)->getValue();?></td>
                  <td><?php echo $sheet->getCell("L".$row)->getValue();?></td>
                  <td><?php echo $sheet->getCell("M".$row)->getValue();?></td>
                </tr>
              
          <?php	
        }
        $cantidad_filas = $sheet->getCell("A".$highestRow)->getValue();
        /*echo "</br></br>Total de Filas = [".$cantidad_filas."] </br>";
        echo "Maximo de Filas = [".$highestRow."] </br>";
        echo "Maximo de Columnas = [".$highestColumn."] </br></br></br>";*/

        $cant_fil_archivo = $highestRow - 2;
        $arr_universo_col_excel = getcolumnrange('A','JZ');
        $cant_col_archivo = array_search($highestColumn,$arr_universo_col_excel);
        $cant_col_archivo++;

        /*echo "FINAL Maximo de Filas = [".$cant_fil_archivo."] </br>";
        echo "FINAL Maximo de Columnas = [".$cant_col_archivo."] </br>";*/

      ?>
          </tbody>
    </table>
  </div>	
 </div>	
</div>
</body>
</html>
