consultar_planes_turisticos_disponibles();
$("#logoutBtn").click(function () {
  // Mostrar una confirmación antes de cerrar la sesión
  if (confirm("¿Estás seguro de que deseas cerrar sesión?")) cerrar_sesion();
});
// cierre de sesion
function cerrar_sesion() {
  return $.ajax({
    type: "POST",
    url: "/ctic-travel/controllers/AuthController.php",
    data: {
      action: "logout",
    },
    success: function (response) {
      window.location.href = `/ctic-travel/login.php`;
    },
    error: function (request, status, error) {
      window.location.href = `/ctic-travel/login.php`;
    },
  });
}
function suscribir_plan_turistico(plan_id) {
  return $.ajax({
    url: "/ctic-travel/controllers/ClientController.php",
    type: "POST",
    data: `action=suscribir_plan_turistico&plan_turistico_id=${plan_id}`,
    success: function (response) {
      consultar_planes_turisticos_disponibles();
    },
    error: function (response) {
      alert("Error al crear el destino.");
    },
  });
}
function eliminar_suscripcion(plan_id) {
  return $.ajax({
    url: "/ctic-travel/controllers/ClientController.php",
    type: "POST",
    data: `action=eliminar_suscripcion&plan_turistico_id=${plan_id}`,
    success: function (response) {
      consultar_planes_turisticos_disponibles();
    },
    error: function (response) {
      alert("Error al crear el destino.");
    },
  });
}
function consultar_planes_turisticos_disponibles() {
  return $.ajax({
    type: "POST",
    url: "/ctic-travel/controllers/ClientController.php",
    data: "action=consultar_planes_turisticos_disponibles",
    success: function (response) {
      let datos       = JSON.parse(response);
      planes          = datos.planes;
      planes_usuarios = datos.planes_usuarios;
      planes_vendidos = datos.planes_vendidos;
      usuario         = datos.usuario;
      let html        = ``;
      console.log(planes_vendidos);
      html += `<div class="row">`;
      for (const i in planes) {
        inscrito            = 'primary';
        mensaje_suscripcion = 'Inscribirse Ahora';
        funcion             = 'suscribir_plan_turistico';
        cantidad_vendida    = (planes_vendidos[i]??[]).length
        if (planes_usuarios[i] != undefined && usuario == planes_usuarios[i].usuario_id) {
          inscrito            = 'danger';
          mensaje_suscripcion = 'Quitar Inscripcion';
          funcion             = 'eliminar_suscripcion'
        }
        // Crear un contenedor de tarjeta
        planes[i].forEach((element) => {
          precio     = element.precio;
          cantidad   = element.cantidad_paquetes_habilitados;
          noches     = element.duracion_noches;
          dias       = element.duracion_dias;
          transporte = element.tipo_transporte;
        });
        accion   = `onclick="${funcion}(${i});"`;
        disabled = '';
        if ((cantidad - cantidad_vendida) === 0){
          accion   = '';
          disabled = 'disabled';
        }
        html += `
        <div class="col-md-6">
          <div class="card">
            <img src="https://images.pexels.com/photos/237272/pexels-photo-237272.jpeg" alt="Imagen destacada" height="50px" width="250px" class="card-img-top">
            <div class="card-body">
              <h2 class="card-title">Plan Turistico ${i}</h2>
              <h3 class="card-subtitle mb-2">Descubre la belleza natural de lugares únicos</h3>
              <p class="card-text">
                Experimenta aventuras inolvidables y crea recuerdos para toda la vida.
              </p>
              <p class="card-price">Precio: $${precio}</p> <p class="card-price">Cupos: ${cantidad - cantidad_vendida}</p>
              <div>
                <p class="card-text">
                  ${dias} Dias - ${noches} Noches
                </p>
                <span>Viajas por via ${transporte}</span><br>
              </div>
            </div>
            <div class="card-footer">
            <button class="btn btn-${inscrito} ${disabled}" ${accion}>${mensaje_suscripcion}</button>
            </div>
          </div>
        </div>`;
      }
      html += `</div>`;
      $(`#div_tarjetas`).html(html);
    },
    error: function (request, status, error) {},
  });
}
