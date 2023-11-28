<?php
require_once "../models/DestinoModel.php";
$model = new DestinoModel();
switch ($_POST['action']) {
  case 'crear_destino':
    echo json_encode($model->crear_destino());
    break;
  case 'consultar_destinos':
    echo json_encode($model->consultar_destinos());
    break;
  case 'eliminar_destino':
    echo json_encode($model->eliminar_destinos());
    break;
  case 'actualizar_destino':
    echo json_encode($model->actualizar_destinos());
    break;
    case 'consultar_destinos_reportes':
      echo json_encode($model->consultar_destinos_reportes());
      break;
}