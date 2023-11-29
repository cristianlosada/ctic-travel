<?php
session_start();
// Verificar si la sesión está activa
$route = explode('/', parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH))[3];
if (!isset($_SESSION['user_role'])) {
  // La sesión no está activa, redirige al inicio de sesión
  header("Location: /ctic-travel/login.php");
  exit();
}
if ($route != $_SESSION['user_role']) {
  header("Location: /ctic-travel/error.php");
  exit();
}
?>
<!DOCTYPE html>
<html lang="es">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Menú de Actividades Cliente</title>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
  <style>
    .nav-btn {
      color: #fff;
      background-color: #007bff;
      border: 1px solid #007bff;
      margin-right: 5px;
    }

    .nav-btn:hover {
      color: #007bff;
      background-color: #fff;
    }

    #logoutBtn {
      margin-left: 10px;
    }

    body {
      font-family: 'Arial', sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }

    .card {
      border: 1px solid #ccc;
      border-radius: 8px;
      margin: 10px;
      padding: 15px;
      background-color: #fff;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .card-title {
      font-size: 1.5em;
      margin-bottom: 10px;
    }

    .card-description {
      margin-bottom: 15px;
    }

    .card-button {
      background-color: #4caf50;
      color: #fff;
      border: none;
      padding: 10px 20px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      border-radius: 5px;
      cursor: pointer;
    }
  </style>
</head>

<body>
  <nav class="navbar navbar-expand-lg navbar-light bg-primary">
    <a class="navbar-brand" href="#" id="btn_index">
      <img src="http://colombiatctravel.com/wp-content/uploads/2021/02/Logo-TC-Travel-Restyling-Prova-4-e1613069785813.png" alt="">
    </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">

    </div>

    <!-- Botón de Logout -->
    <form class="form-inline">
      <span class="text-light">Usuario: <b><?php echo $_SESSION['name'] ?></b></span>
      <button class="btn btn-danger my-2 my-sm-0" id="logoutBtn">Logout</button>
    </form>
  </nav>
  <div class="container mt-4">
    <h1 class="display-5 text-center">Planes Turísticos</h1>
    <!-- Tarjeta de Plan Turístico 2 -->
    <div id="div_tarjetas"></div>

    <footer>
      <p>&copy; 2023 Desarrollado por Crissoft con ♥️. | <a href="https://www.linkedin.com/in/cristian-losada-6ab093162/">linkedin</a></p>
    </footer>
</body>

<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
<script src="../../assets/js/dashboard_client.js"></script>

</body>
<script>
  $(document).ready(function() {});
</script>
</body>

</html>