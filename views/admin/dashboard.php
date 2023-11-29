<?php
session_start();
// Verificar si la sesión está activa
if (!isset($_SESSION['user_role'])) {
  // La sesión no está activa, redirige al inicio de sesión
  header("Location: /ctic-travel/login.php");
  exit();
}
if ('admin' !== $_SESSION['user_role']) {
  header("Location: /ctic-travel/error.php");
  exit();
}
?>
<!DOCTYPE html>
<html lang="es">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Menú de Actividades Admin </title>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.1/jspdf.min.js"></script>
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
      <ul class="navbar-nav">
        <li class="nav-item">
          <button class="btn btn-primary nav-btn" id="btn_menu_crear_destino">Gestionar Destinos</button>
        </li>
        <li class="nav-item">
          <button class="btn btn-primary nav-btn" id="btn_menu_crear_hospedaje">Gestionar Hospedajes</button>
        </li>
        <li class="nav-item">
          <button class="btn btn-primary nav-btn" id="btn_menu_crear_plan_turistico">Gestionar Planes Turísticos</button>
        </li>
        <li class="nav-item">
          <button class="btn btn-primary nav-btn" id="btn_menu_ver_estadisticas">Estadísticas</button>
        </li>
      </ul>
    </div>

    <!-- Botón de Logout -->
    <form class="form-inline">
      <span class="text-light">Usuario: <b><?php echo $_SESSION['name'] ?></b></span>
      <button class="btn btn-danger my-2 my-sm-0" id="logoutBtn">Logout</button>
    </form>
  </nav>
  <div class="container bg-light mt-4" id="div_bienvenida">
    <h1 class="display-4 text-center">Bienvenido a la Página de Actividades</h1>
    <p class="lead text-center" id="nombre_usuario">¡Hola <?php echo $_SESSION['name'] ?>!</p>
    <p class="text-center">Estamos emocionados de que te hayas unido a nuestra comunidad de viajes. Aquí encontrarás una variedad de actividades y opciones para planificar tus próximas aventuras.</p>

    <div class="row mb-4">
      <div class="col-md-6">
        <h2 class="text-center mt-5">Descubre Nuevos Destinos</h2>
        <p class="text-center">Explora destinos turísticos increíbles de todo el mundo. Desde playas paradisíacas hasta ciudades vibrantes, tenemos opciones para todos los gustos.</p>
      </div>
      <div class="col-md-6">
        <img src="https://images.pexels.com/photos/237272/pexels-photo-237272.jpeg" class="img-fluid mx-auto d-block" alt="Playa paradisíaca">
      </div>
    </div>

    <div class="row mb-4">
      <div class="col-md-6">
        <img src="https://images.pexels.com/photos/3586966/pexels-photo-3586966.jpeg" class="img-fluid mx-auto d-block" alt="Ciudad vibrante">
      </div>
      <div class="col-md-6">
        <h2 class="text-center mt-5">Crea Experiencias Únicas</h2>
        <p class="text-center">Con nuestro sistema, puedes crear planes turísticos personalizados que se adapten a tus preferencias. Elige destinos, selecciona hospedajes y crea recorridos inolvidables.</p>
      </div>
    </div>

    <div class="row mb-4">
      <div class="col-md-6">
        <h2 class="text-center mt-5">Estadísticas y Reportes</h2>
        <p class="text-center">Obtén información detallada sobre tus actividades y viajes. Visualiza estadísticas, descarga reportes y lleva un registro de tus experiencias de viaje.</p>
      </div>
      <div class="col-md-6">
        <img src="https://images.pexels.com/photos/95916/pexels-photo-95916.jpeg" class="img-fluid mx-auto d-block" alt="Gráficos de estadísticas">
      </div>
    </div>

    <div class="row mb-4">
      <div class="col-md-6">
        <img src="https://img.freepik.com/foto-gratis/papeles-comerciales-naturaleza-muerta-varias-piezas-mecanismo_23-2149352652.jpg" class="img-fluid mx-auto d-block" alt="Menú de opciones">
      </div>
      <div class="col-md-6">
        <h2 class="text-center mt-5">Crea y Gestiona</h2>
        <p class="text-center">Utiliza las opciones del menú para crear nuevos destinos, hospedajes, y planes turísticos. Gestiona tu información de manera sencilla y eficiente.</p>
      </div>

    </div>
    <p class="text-center">Estamos aquí para ayudarte a planificar las mejores experiencias de viaje. ¡Disfruta explorando y descubriendo todo lo que tenemos para ofrecer!</p>
  </div>
  <div class="container mt-4" id="div_crear_destino" hidden>
  </div>
  <div class="container mt-4" id="div_crear_hospedaje" hidden>
  </div>
  <div class="container mt-4" id="div_crear_plan_turistico" hidden>
  </div>
  <div class="container mt-4" id="div_estadistica" hidden>
  </div>
  <footer>
    <p>&copy; 2023  Desarrollado por Crissoft con ♥️. | <a href="https://www.linkedin.com/in/cristian-losada-6ab093162/">linkedin</a></p>
  </footer>

  <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
  <script src="../../assets/js/reporte_admin.js"></script>
  <script src="../../assets/js/templates.js"></script>
  <script src="../../assets/js/dashboard_admin.js"></script>
  <script src="../../assets/js/destinos_admin.js"></script>
  <script src="../../assets/js/hospedajes_admin.js"></script>
  <script src="../../assets/js/planes_admin.js"></script>

</body>
<script>
  $(document).ready(function() {
  });
</script>
</body>
</html>