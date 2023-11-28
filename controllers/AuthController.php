<?php
require_once "../models/AuthModel.php";
$auth = new AuthModel();
switch ($_POST['action']) {
  case 'login':
    $auth->login();
    break;
  case 'logout':
    $auth->logout();
    break;
  case 'register':
    echo json_encode($auth->register_users());
    break;
}