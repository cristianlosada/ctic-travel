let sw_edita_hospedaje = 0;
let datos_hospedajes   = {};
data_paises            = [];
data_departamentos     = [];
data_municipios        = [];
function agregar_validaciones_formulario_hospedaje() {
  $("#hospedaje_habitaciones").on("keypress", function(event) {
    var keyCode = event.which;
    // Solo permitir números y limitar a tres dígitos
    if (keyCode < 48 || keyCode > 57 || $(this).val().length >= 3)
      event.preventDefault();
  });
  $("#btn_cancelar_hospedaje").click(function () {
    $("#form_hospedaje")[0].reset();
    $("#btn_crear_hospedaje").text('Crear hospedaje');
    sw_edita_hospedaje  = 0;
  });
  $("#btn_crear_hospedaje").click(function () {
    var errorCount             = 0;
    var pais                   = $("#hospedaje_pais").val();
    var departamento           = $("#hospedaje_departamento").val();
    var ciudad                 = $("#hospedaje_ciudad").val();
    var nombre                 = $("#hospedaje_nombre").val();
    var checkin                = $("#hospedaje_checkin").val();
    var checkout               = $("#hospedaje_checkout").val();
    var hospedaje_habitaciones = $("#hospedaje_habitaciones").val();
    var hospedaje_tipo         = $("#hospedaje_tipo").val();
    if (!pais) {
      $("#hospedaje_pais")
        .parent()
        .append("<span class='error text-danger'>Seleccione un país.</span>");
      errorCount++;
    } else $("#hospedaje_pais").parent().find(".error").remove();
    if (!departamento) {
      $("#hospedaje_departamento")
        .parent()
        .append(
          "<span class='error text-danger'>Seleccione un departamento.</span>"
        );
      errorCount++;
    } else $("#hospedaje_departamento").parent().find(".error").remove();
    if (!ciudad) {
      $("#hospedaje_ciudad")
        .parent()
        .append(
          "<span class='error text-danger'>Seleccione una ciudad o municipio.</span>"
        );
      errorCount++;
    } else $("#hospedaje_ciudad").parent().find(".error").remove();
    if (!nombre) {
      $("#hospedaje_nombre")
        .parent()
        .append("<span class='error text-danger'>Ingrese un nombre.</span>");
      errorCount++;
    } else $("#hospedaje_nombre").parent().find(".error").remove();
    if (!checkin) {
      $("#hospedaje_checkin")
        .parent()
        .append("<span class='error text-danger'>Ingrese la hora de checkin.</span>");
      errorCount++;
    } else $("#hospedaje_checkin").parent().find(".error").remove();
    if (!checkout) {
      $("#hospedaje_checkout")
        .parent()
        .append("<span class='error text-danger'>Ingrese la hora de checkout.</span>");
      errorCount++;
    } else $("#hospedaje_checkout").parent().find(".error").remove();
    if (!hospedaje_habitaciones) {
      $("#hospedaje_habitaciones")
        .parent()
        .append("<span class='error text-danger'>Ingrese el numero de habitaciones.</span>");
      errorCount++;
    } else $("#hospedaje_habitaciones").parent().find(".error").remove();
    if (!hospedaje_tipo) {
      $("#hospedaje_tipo")
        .parent()
        .append(
          "<span class='error text-danger'>Ingrese un tipo de hospedaje.</span>"
        );
      errorCount++;
    } else $("#hospedaje_tipo").parent().find(".error").remove();
    if (errorCount === 0) {
      if (sw_edita_hospedaje == 0)
        crear_hospedaje_turistico();
      else
        actualizar_hospedaje(sw_edita_hospedaje);
    }
  });
}
function generar_tabla_hospedajes(hospedajes) {
  html = ``;
  if (Object.keys(hospedajes).length > 0) {
    cont = 0;
    for (i in hospedajes) {
      cont++;
      html += ` <tr>
                  <td>${cont}</td>
                  <td>${hospedajes[i].pais_des} - ${hospedajes[i].departamento_des} - ${hospedajes[i].municipio_des}</td>
                  <td>${hospedajes[i].nombre}</td>
                  <td>${hospedajes[i].tipo}</td>
                  <td>${hospedajes[i].cantidad_habitaciones}</td>
                  <td>${hospedajes[i].horario_checkin}</td>
                  <td>${hospedajes[i].horario_checkout}</td>
                  <td>
                    <button class="btn btn-info" onclick="editar_hospedaje(${hospedajes[i].id})">Editar</button>
                    <button class="btn btn-danger" onclick="eliminar_hospedaje(${hospedajes[i].id})">Eliminar</button>
                  </td>
                </tr>`;
    }
  }
  else
    html += `<tr><td colspan="8">No se encontraron registros.</td></tr>`;
  $(`#datos_hospedajes`).html(html);
}
function consultar_hospedajes() {
  return $.ajax({
    url: "/ctic-travel/controllers/HospedajeController.php",
    type: "POST",
    data: "action=consultar_hospedajes",
    success: function (response) {
      let hospedajes = JSON.parse(response);
      if (hospedajes !== 0) {
        generar_tabla_hospedajes(hospedajes);
        datos_hospedajes = hospedajes;
      }
      $("#form_hospedaje")[0].reset();
    },
    error: function (response) {
      alert("Error al crear el hospedaje.");
    },
  });
}
function consultar_hospedajes_reportes() {
  return $.ajax({
    url: "/ctic-travel/controllers/HospedajeController.php",
    type: "POST",
    data: "action=consultar_hospedajes_reportes",
    success: function (response) {
      let destinos = JSON.parse(response);
      if (destinos !== 0) {
        generar_tabla_destinos(destinos);
        datos_destinos = destinos;
      }
    },
    error: function (response) {
      alert("Error al crear el destino.");
    },
  });
}
// function validar_campos_hospedajes() {
function crear_hospedaje_turistico() {
  return $.ajax({
    url: "/ctic-travel/controllers/HospedajeController.php",
    type: "POST",
    data: `action=crear_hospedaje&${$("#form_hospedaje").serialize()}`,
    success: function (response) {
      let hospedajes = JSON.parse(response);
      if (hospedajes != 0) {
        generar_tabla_hospedajes(hospedajes);
        datos_hospedajes = hospedajes;
      }
      $("#form_hospedaje")[0].reset();
      $("#btn_crear_hospedaje").text('Crear Hospedaje');
    },
    error: function (response) {
      alert("Error al crear el hospedaje.");
    },
  });
}
async function editar_hospedaje(hospedaje_id) {
  await consultar_paises();
  sw_edita_hospedaje  = hospedaje_id;
  edit_pais         = datos_hospedajes[hospedaje_id].pais;
  edit_departamento = datos_hospedajes[hospedaje_id].departamento;
  edit_ciudad       = datos_hospedajes[hospedaje_id].ciudad;
  for (i in data_paises)
    $("#hospedaje_pais").append('<option value="'+data_paises[i].pais_id+'">' +data_paises[i].pais+"</option>");
  $("#hospedaje_pais").val(datos_hospedajes[hospedaje_id].pais);
  for (i in data_departamentos[edit_pais])
    $("#hospedaje_departamento").append('<option value="' + data_departamentos[edit_pais][i].departamento_id +'">' + data_departamentos[edit_pais][i].departamento +"</option>" );
  $("#hospedaje_departamento").val(datos_hospedajes[hospedaje_id].departamento);
  for (i in data_municipios[edit_pais][edit_departamento])
    $("#hospedaje_ciudad").append('<option value="' + data_municipios[edit_pais][edit_departamento][i].municipio_id +'">' + data_municipios[edit_pais][edit_departamento][i].municipio +"</option>");
  $("#hospedaje_ciudad").val(datos_hospedajes[hospedaje_id].ciudad);
  $("#hospedaje_nombre").val(datos_hospedajes[hospedaje_id].nombre);
  $("#hospedaje_habitaciones").val(datos_hospedajes[hospedaje_id].cantidad_habitaciones);
  $("#hospedaje_tipo").val(datos_hospedajes[hospedaje_id].tipo);
  $("#hospedaje_checkin").val(datos_hospedajes[hospedaje_id].horario_checkin);
  $("#hospedaje_checkout").val(datos_hospedajes[hospedaje_id].horario_checkout);
  $("#btn_crear_hospedaje").text('Actualizar Hospedaje');
}
function actualizar_hospedaje(hospedaje_id) {
  return $.ajax({
    url: "/ctic-travel/controllers/HospedajeController.php",
    type: "POST",
    data: `action=actualizar_hospedaje&hospedaje_id=${hospedaje_id}&${$("#form_hospedaje").serialize()}`,
    success: function (response) {
      let hospedajes = JSON.parse(response);
      if (hospedajes !== 0)
        generar_tabla_hospedajes(hospedajes);
      $("#form_hospedaje")[0].reset();
      sw_edita_hospedaje  = 0;
      $("#btn_crear_hospedaje").text('Crear Hospedaje');
    },
    error: function (response) {
      alert("Error al crear el hospedaje.");
    },
  });
}
function eliminar_hospedaje(hospedaje_id) {
  return $.ajax({
    url: "/ctic-travel/controllers/HospedajeController.php",
    type: "POST",
    data: `action=eliminar_hospedaje&hospedaje_id=${hospedaje_id}`,
    success: function (response) {
      let hospedajes = JSON.parse(response);
      if (hospedajes !== 0)
        generar_tabla_hospedajes(hospedajes);
      $("#form_hospedaje")[0].reset();
      $("#btn_crear_hospedaje").text('Crear Hospedaje');
      sw_edita_hospedaje  = 0;
    },
    error: function (response) {
      alert("Error al crear el hospedaje.");
    },
  });
}
