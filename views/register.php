<!DOCTYPE html>
<html lang="es">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Registro de Usuarios</title>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
</head>

<body class="bg-light">
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h2 class="text-center">Registro de Usuario</h2>
            <form id="registerForm" method="post">
              <div class="form-group">
                <label for="name">Nombre:</label>
                <input type="text" name="name" class="form-control" placeholder="Nombre" required>
                <small class="text-danger" id="nameError"></small>
              </div>
              <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" name="email" class="form-control" placeholder="Correo electrónico" required>
                <small class="text-danger" id="emailError"></small>
              </div>
              <div class="form-group">
                <label for="password">Contraseña:</label>
                <input type="password" name="password" class="form-control" placeholder="Contraseña" required>
                <small class="text-danger" id="passwordError"></small>
              </div>
              <button type="button" id="registerBtn" class="btn btn-primary btn-block">Registrarse</button>
            </form>
            <p class="mt-3 text-center">¿Ya tienes una cuenta? <a href="/ctic-travel/login.php">Inicia sesión aquí</a></p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
  <script>
    var jQuery331 = jQuery.noConflict();
    window.jQuery = jQuery331;
    jQuery331(document).ready(function($) {
      $("#registerBtn").click(function() {
        // Obtener datos del formulario
        var name = $("input[name='name']").val();
        var email = $("input[name='email']").val();
        var password = $("input[name='password']").val();
        // Validar campos antes de enviar el formulario
        if (name === "") {
          $("#nameError").text("Por favor, ingrese su nombre.");
          return;
        } else {
          $("#nameError").text("");
        }
        if (email === "") {
          $("#emailError").text("Por favor, ingrese su email.");
          return;
        } else {
          $("#emailError").text("");
        }

        if (password === "") {
          $("#passwordError").text("Por favor, ingrese su contraseña.");
          return;
        } else {
          $("#passwordError").text("");
        }
        // Enviar datos al servidor usando Ajax
        password = btoa(password);
        $.ajax({
          type: "POST",
          url: "/ctic-travel/controllers/AuthController.php",
          data: {
            action:   'register',
            name:     name,
            email:    email,
            password: password
          },
          success: function(response) {
            // Manejar la respuesta del servidor
            response = JSON.parse(response);
            $("input[name='name']").val('');
            $("input[name='email']").val('');
            $("input[name='password']").val('');
            if (response === '1') {
              $("#passwordError").text("El Email ya se encuentra registrado en el sistema.");
              return;
            }
            else if (response != 0)
              window.location.href = `/ctic-travel/views/${response}/dashboard.php`;
          }
        });
      });
    });
  </script>
</body>

</html>