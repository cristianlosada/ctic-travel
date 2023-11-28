<?php
require_once "../models/HospedajeModel.php";
$model = new HospedajeModel();
switch ($_POST['action']) {
  case 'crear_hospedaje':
    echo json_encode($model->crear_hospedaje());
    break;
  case 'consultar_hospedajes':
    echo json_encode($model->consultar_hospedajes());
    break;
  case 'eliminar_hospedaje':
    echo json_encode($model->eliminar_hospedajes());
    break;
  case 'actualizar_hospedaje':
    echo json_encode($model->actualizar_hospedajes());
    break;
  case 'consultar_hospedajes_reportes':
    echo json_encode($model->consultar_hospedajes_reportes());
    break;
}