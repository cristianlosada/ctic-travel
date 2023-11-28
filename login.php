<!DOCTYPE html>
<html lang="es">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
  <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
  <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
  <title>Iniciar Sesión</title>
</head>

<body class="bg-light">
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h2 class="text-center">Iniciar Sesión</h2>
            <?php
            // Mostrar mensajes de error si existen
            if (isset($_SESSION['error'])) {
              echo '<div class="alert alert-danger">' . $_SESSION['error'] . '</div>';
              unset($_SESSION['error']);
            }
            session_start();
            session_destroy();
            ?>
            <form id="loginForm" method="post">
              <div class="form-group">
                <label for="username">Usuario:</label>
                <input type="text" name="username" class="form-control" placeholder="Usuario" required>
                <small class="text-danger" id="usernameError"></small>
              </div>
              <div class="form-group">
                <label for="password">Contraseña:</label>
                <input type="password" name="password" class="form-control" placeholder="Contraseña" required minlength="8" pattern="">
                <small class="text-danger" id="passwordError"></small>
              </div>
              <button type="button" id="loginBtn" class="btn btn-primary btn-block">Iniciar Sesión</button>
            </form>
            <p class="mt-3 text-center">¿No tienes una cuenta? <a href="/ctic-travel/views/register.php">Regístrate aquí</a></p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Validación y envío con jQuery Ajax -->
  <script>
    var jQuery331 = jQuery.noConflict();
    window.jQuery = jQuery331;

    jQuery331(document).ready(function($) {
      $("#loginBtn").click(function() {
        var username = $("input[name='username']").val();
        var password = $("input[name='password']").val();

        // Validar campos antes de enviar el formulario
        if (username === "") {
          $("#usernameError").text("Por favor, ingrese su usuario.");
          return;
        } else {
          $("#usernameError").text("");
        }

        if (password === "") {
          $("#passwordError").text("Por favor, ingrese su contraseña.");
          return;
        } else {
          $("#passwordError").text("");
        }
        // Encriptar la contraseña
        password = btoa(password);
        // Enviar datos al servidor usando Ajax
        $.ajax({
          type: "POST",
          url: "/ctic-travel/controllers/AuthController.php",
          data: {
            action: 'login',
            username: username,
            password: password
          },
          success: function(response) {
            // Manejar la respuesta del servidor
            if (response !== "error") {
              // Redirigir al dashboard después de un inicio de sesión exitoso
              window.location.href = `/ctic-travel/views/${JSON.parse(response)}/dashboard.php`;

            } else {
              // Mostrar mensaje de error
              $("#usernameError").text("Credenciales incorrectas. Inténtalo de nuevo.");
            }
          }
        });
      });
    });
  </script>
</body>
</html>