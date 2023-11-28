let sw_edita_destino = 0;
let datos_destinos   = {};
data_paises          = [];
data_departamentos   = [];
data_municipios      = [];
function agregar_validaciones_formulario_destino() {
  $("#form_destino")[0].reset();
  $("#btn_cancelar_destino").click(function () {
    $("#form_destino")[0].reset();
    $("#btn_crear_destino").text('Crear Destino');
    sw_edita_destino  = 0;
  });
  $("#btn_crear_destino").click(function () {
    var errorCount         = 0;
    var pais               = $("#destino_pais").val();
    var departamento       = $("#destino_departamento").val();
    var ciudad             = $("#destino_ciudad").val();
    var lugar              = $("#destino_lugar").val();
    var lugares_atractivos = $("#destino_lugares_atractivos").val();
    if (!pais) {
      $("#destino_pais")
        .parent()
        .append("<span class='error text-danger'>Seleccione un país.</span>");
      errorCount++;
    } else $("#destino_pais").parent().find(".error").remove();
    if (!departamento) {
      $("#destino_departamento")
        .parent()
        .append(
          "<span class='error text-danger'>Seleccione un departamento.</span>"
        );
      errorCount++;
    } else $("#destino_departamento").parent().find(".error").remove();
    if (!ciudad) {
      $("#destino_ciudad")
        .parent()
        .append(
          "<span class='error text-danger'>Seleccione una ciudad o municipio.</span>"
        );
      errorCount++;
    } else $("#destino_ciudad").parent().find(".error").remove();
    if (!lugar) {
      $("#destino_lugar")
        .parent()
        .append("<span class='error text-danger'>Ingrese un lugar.</span>");
      errorCount++;
    } else $("#destino_lugar").parent().find(".error").remove();
    if (!lugares_atractivos) {
      $("#destino_lugares_atractivos")
        .parent()
        .append(
          "<span class='error text-danger'>Ingrese lugares atractivos.</span>"
        );
      errorCount++;
    } else $("#destino_lugares_atractivos").parent().find(".error").remove();
    if (errorCount === 0) {
      if (sw_edita_destino == 0)
        crear_destino_turistico();
      else
        actualizar_destino(sw_edita_destino);
    }
  });
}
function generar_tabla_destinos(destinos) {
  html = ``;
  if (Object.keys(destinos).length > 0) {
    cont = 0;
    for (i in destinos) {
      cont++;
      html += ` <tr>
                  <td>${cont}</td>
                  <td>${destinos[i].pais_des}</td>
                  <td>${destinos[i].departamento_des}</td>
                  <td>${destinos[i].municipio_des}</td>
                  <td>${destinos[i].lugar_atractivo}</td>
                  <td>${destinos[i].informacion_adicional}</td>
                  <td>
                    <button class="btn btn-info" onclick="editar_destino(${destinos[i].id})">Editar</button>
                    <button class="btn btn-danger" onclick="eliminar_destino(${destinos[i].id})">Eliminar</button>
                  </td>
                </tr>`;
    }
  }
  else
    html += `<tr><td colspan="7">No se encontraron registros.</td></tr>`;
  $(`#datos_destinos`).html(html);
}
function consultar_destinos() {
  return $.ajax({
    url: "/ctic-travel/controllers/DestinoController.php",
    type: "POST",
    data: "action=consultar_destinos",
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
function consultar_destinos_reportes() {
  return $.ajax({
    url: "/ctic-travel/controllers/DestinoController.php",
    type: "POST",
    data: "action=consultar_destinos_reportes",
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
// function validar_campos_destinos() {
function crear_destino_turistico() {
  return $.ajax({
    url: "/ctic-travel/controllers/DestinoController.php",
    type: "POST",
    data: `action=crear_destino&${$("#form_destino").serialize()}`,
    success: function (response) {
      let destinos = JSON.parse(response);
      if (destinos != 0) {
        generar_tabla_destinos(destinos);
        datos_destinos = destinos;
      }
      $("#form_destino")[0].reset();
      $("#btn_crear_destino").text('Crear Destino');
    },
    error: function (response) {
      alert("Error al crear el destino.");
    },
  });
}
async function editar_destino(destino_id) {
  await consultar_paises();
  sw_edita_destino  = destino_id;
  edit_pais         = datos_destinos[destino_id].pais;
  edit_departamento = datos_destinos[destino_id].departamento;
  edit_ciudad       = datos_destinos[destino_id].ciudad;
  for (i in data_paises)
    $("#destino_pais").append('<option value="'+data_paises[i].pais_id+'">' +data_paises[i].pais+"</option>");
  $("#destino_pais").val(datos_destinos[destino_id].pais);
  for (i in data_departamentos[edit_pais])
    $("#destino_departamento").append('<option value="' + data_departamentos[edit_pais][i].departamento_id +'">' + data_departamentos[edit_pais][i].departamento +"</option>" );
  $("#destino_departamento").val(datos_destinos[destino_id].departamento);
  for (i in data_municipios[edit_pais][edit_departamento])
    $("#destino_ciudad").append('<option value="' + data_municipios[edit_pais][edit_departamento][i].municipio_id +'">' + data_municipios[edit_pais][edit_departamento][i].municipio +"</option>");
  $("#destino_ciudad").val(datos_destinos[destino_id].ciudad);
  $("#destino_lugar").val(datos_destinos[destino_id].lugar_atractivo);
  $("#destino_lugares_atractivos").val(datos_destinos[destino_id].informacion_adicional);
  $("#btn_crear_destino").text('Actualizar Destino');
}
function actualizar_destino(destino_id) {
  return $.ajax({
    url: "/ctic-travel/controllers/DestinoController.php",
    type: "POST",
    data: `action=actualizar_destino&destino_id=${destino_id}&${$("#form_destino").serialize()}`,
    success: function (response) {
      let destinos = JSON.parse(response);
      if (destinos !== 0)
        generar_tabla_destinos(destinos);
      $("#form_destino")[0].reset();
      sw_edita_destino  = 0;
      $("#btn_crear_destino").text('Crear Destino');
    },
    error: function (response) {
      alert("Error al crear el destino.");
    },
  });
}
function eliminar_destino(destino_id) {
  return $.ajax({
    url: "/ctic-travel/controllers/DestinoController.php",
    type: "POST",
    data: `action=eliminar_destino&destino_id=${destino_id}`,
    success: function (response) {
      let destinos = JSON.parse(response);
      if (destinos !== 0)
        generar_tabla_destinos(destinos);
      $("#form_destino")[0].reset();
      $("#btn_crear_destino").text('Crear Destino');
      sw_edita_destino  = 0;
    },
    error: function (response) {
      alert("Error al crear el destino.");
    },
  });
}
