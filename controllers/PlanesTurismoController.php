<?php
require_once "../models/PlanesTurismoModel.php";
$model = new PlanesTurismoModel();
switch ($_POST['action']) {
  case 'crear_planes':
    echo json_encode($model->crear_planes_turisticos());
    break;
  case 'consultar_planes_turisticos':
    echo json_encode($model->consultar_planes_turisticos());
    break;
  case 'eliminar_plan_turismo':
    echo json_encode($model->eliminar_plan_turismo());
    break;
  // case 'actualizar_hospedaje':
  //   echo json_encode($model->actualizar_hospedajes());
  //   break;
  case 'consultar_planes_turisticos_reportes':
    echo json_encode($model->consultar_planes_turisticos_reportes());
    break;
}