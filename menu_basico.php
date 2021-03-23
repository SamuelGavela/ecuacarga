<?php
    //ini_set('display_errors', 1); ini_set('display_startup_errors', 1); error_reporting(E_ALL);
    
    require_once 'model.php';
    $conexion2 = conexion_bd();

    $arr_lista_menu = lista_menus($conexion2, $_SESSION['user_rol']);
?>
    <nav class="navbar navbar-default" role="navigation">
          <!-- El logotipo y el icono que despliega el menu se agrupan para mostrarlos mejor en los dispositivos moviles -->
          <div class="navbar-header">
              <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                  <span class="sr-only">Desplegar navegacion</span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
              </button>
          </div>
        
        <!-- Agrupar los enlaces de navegacion, los formularios y cualquier otro elemento que se pueda ocultar al minimizar la barra -->
        <div class="collapse navbar-collapse navbar-ex1-collapse">
            <ul class="nav navbar-nav">

                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"> <span class="fa fa-th-large"></span>&nbsp;Configuraci&oacute;n&nbsp;<span class="caret"></span></a>
                  <ul class="dropdown-menu">

                        <?php
                            for ($i = 0; $i < count($arr_lista_menu); $i++) 
                            { 
                                $cod_menu = $arr_lista_menu[$i]['cod_menu'];
                                $nombre_menu = $arr_lista_menu[$i]['nombre_menu'];
                                $link_referencia = $arr_lista_menu[$i]['link_referencia'];
                                $fa_icon = $arr_lista_menu[$i]['fa_icon'];
                                $color_texto = $arr_lista_menu[$i]['color_texto'];
                                ?>
                                   <li><a href="<?php printf($link_referencia); ?>"><span class="<?php printf($fa_icon); ?>" style="color:<?php printf($color_texto); ?>;"></span>&nbsp;&nbsp; <?php printf($nombre_menu); ?></a></li>
                                <?php
                            }
                        ?>                
                   </ul>
                </li>
            </ul>
        
            <ul class="nav navbar-nav navbar-right">
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"> <span class="fa fa-user"></span>&nbsp;Hola, <?php echo $_SESSION['user_ecucarga']; ?>&nbsp;&nbsp;&nbsp;<span class="caret"></span></a>
                    <ul class="dropdown-menu">
                        <li><a href="cambioContrasena.php"><span class="fa fa-user"></span>&nbsp;Cambio Contrase&ntilde;a</a></li>
                        <li class="divider"></li>                  
                        <li><a href="logout.php"><span class="fa fa-sign-out"></span>&nbsp;Salir</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    </nav>  

    <script>
        $(document).ready(function(){
            $('.dropdown-submenu a.test').on("click", function(e){
                $(this).next('ul').toggle();
                e.stopPropagation();
                e.preventDefault();
            });
        });
    </script>

<?php
    sqlsrv_close($conexion2);    
?>
