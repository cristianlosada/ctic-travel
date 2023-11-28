<?php
require_once "../models/AdminModel.php";
$model = new AdminModel();
switch ($_POST['action']) {
  case 'consultar_paises':
    echo json_encode($model->consultar_paises());
    break;
}