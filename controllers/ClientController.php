<?php
require_once "../models/ClientModel.php";
$model = new ClientModel();
switch ($_POST['action']) {
  case 'consultar_planes_turisticos_disponibles':
    echo json_encode($model->consultar_planes_turisticos_disponibles());
    break;
  case 'suscribir_plan_turistico':
    echo json_encode($model->suscribir_plan_turistico());
    break;
  case 'eliminar_suscripcion':
    echo json_encode($model->eliminar_suscripcion());
    break;
}