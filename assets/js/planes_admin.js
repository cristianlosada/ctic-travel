let sw_edita_planes = 0;
let datos_planes    = {};
function agregar_validaciones_formulario_planes() {
  $("#form_planes")[0].reset();
  $("#planes_paquetes").on("keypress", function(event) {
    var keyCode = event.which;
    // Solo permitir números y limitar a tres dígitos
    if (keyCode < 48 || keyCode > 57 || $(this).val().length >= 5)
      event.preventDefault();
  });
  $("#planes_duracion_noche").on("keypress", function(event) {
    var keyCode = event.which;
    // Solo permitir números y limitar a tres dígitos
    if (keyCode < 48 || keyCode > 57 || $(this).val().length >= 3)
      event.preventDefault();
  });
  $("#planes_duracion_dias").on("keypress", function(event) {
    var keyCode = event.which;
    // Solo permitir números y limitar a tres dígitos
    if (keyCode < 48 || keyCode > 57 || $(this).val().length >= 3)
      event.preventDefault();
  });
  $("#planes_precio").on("keypress", function(event) {
    var keyCode = event.which;
    // Solo permitir números y limitar a tres dígitos
    if (keyCode < 48 || keyCode > 57 || $(this).val().length >= 12)
      event.preventDefault();
  });
  $("#btn_cancelar_planes").click(function () {
    $("#form_planes")[0].reset();
    $("#btn_crear_planes").text("Crear Planes Turisticos");
    $("form#form_planes .error").remove();
    sw_edita_planes = 0;
  });
  $("#btn_crear_planes").click(function () {
    // Obtener los valores de los campos
    var destinos = $("#planes_destinos").val();
    var hospedajes = $("#planes_hospedajes").val();
    var precio = $("#planes_precio").val();
    var duracion_dias = $("#planes_duracion_dias").val();
    var duracion_noche = $("#planes_duracion_noche").val();
    var transporte = $("#planes_transporte").val();
    var paquetes = $("#planes_paquetes").val();
    var errorCount = 0;
    $("form#form_planes .error").remove();

    // Validar los campos
    if (!destinos || destinos.length === 0) {
      $("#planes_destinos")
        .parent()
        .append(
          "<span class='error text-danger'>Seleccione al menos un destino turístico.</span>"
        );
      errorCount++;
    }
    if (!hospedajes || hospedajes.length === 0) {
      $("#planes_hospedajes")
        .parent()
        .append(
          "<span class='error text-danger'>Seleccione al menos un hospedaje.</span>"
        );
      errorCount++;
    }
    if (!precio) {
      $("#planes_precio")
        .parent()
        .append(
          "<span class='error text-danger'>Ingrese el precio del paquete.</span>"
        );
      errorCount++;
    }
    if (!duracion_dias) {
      $("#planes_duracion_dias")
        .parent()
        .append(
          "<span class='error text-danger'>Ingrese la duración de dias del paquete.</span>"
        );
      errorCount++;
    }
    if (!duracion_noche) {
      $("#planes_duracion_noche")
        .parent()
        .append(
          "<span class='error text-danger'>Ingrese la duración de noches del paquete.</span>"
        );
      errorCount++;
    }
    if (!transporte) {
      $("#planes_transporte")
        .parent()
        .append(
          "<span class='error text-danger'>Seleccione el tipo de transporte.</span>"
        );
      errorCount++;
    }
    if (!paquetes) {
      $("#planes_paquetes")
        .parent()
        .append(
          "<span class='error text-danger'>Ingrese la cantidad de paquetes habilitados.</span>"
        );
      errorCount++;
    }
    if (errorCount === 0) {
      if (sw_edita_planes == 0)
        crear_planes_turistico();
      else
        actualizar_planes(sw_edita_planes);
    }
  });
}
async function cargar_datos_select_planes() {
  let destinos = await consultar_destinos();
  destinos     = JSON.parse(destinos);
  // Agregar opciones de destinos
  for (const key in destinos)
    $("#planes_destinos").append($("<option>", {value: key, text: destinos[key].lugar_atractivo,}));
  let hospedajes = await consultar_hospedajes();
  hospedajes     = JSON.parse(hospedajes);
  // Agregar opciones de hospedajes
  for (const key in hospedajes)
    $("#planes_hospedajes").append($("<option>", {value: key, text: hospedajes[key].nombre,}));
}
function generar_tabla_planes(planes) {
  html = ``;
  if (Object.keys(planes).length > 0) {
    cont = 0;
    for (i in planes) {
      cont++;
      html += ` <tr>
                  <td>${cont}</td>
                  <td>
                    
                  </td>
                  <td>${cont}</td>
                  <td>$${planes[i].precio}</td>
                  <td>${planes[i].duracion_dias}</td>
                  <td>${planes[i].duracion_noches}</td>
                  <td>${planes[i].tipo_transporte}</td>
                  <td>${planes[i].cantidad_paquetes_habilitados}</td>
                  <td>
                    <button class="btn btn-info" onclick="editar_planes(${planes[i].id})">Editar</button>
                    <button class="btn btn-danger" onclick="eliminar_planes(${planes[i].id})">Eliminar</button>
                  </td>
                </tr>`;
    }
  }
  else
    html += `<tr><td colspan="7">No se encontraron registros.</td></tr>`;
  $(`#datos_planes`).html(html);
}
function consultar_planes() {
  return $.ajax({
    url: "/ctic-travel/controllers/PlanesTurismoController.php",
    type: "POST",
    data: "action=consultar_planes_turisticos",
    success: function (response) {
      let planes = JSON.parse(response);
      if (planes !== 0) {
        generar_tabla_planes(planes);
        datos_planes = planes;
      }
    },
    error: function (response) {
      alert("Error al crear el planes.");
    },
  });
}
function consultar_planes_turisticos_reportes() {
  return $.ajax({
    url: "/ctic-travel/controllers/PlanesTurismoController.php",
    type: "POST",
    data: "action=consultar_planes_turisticos_reportes",
    success: function (response) {
      let planes = JSON.parse(response);
    },
    error: function (response) {
      alert("Error al crear el planes.");
    },
  });
}
// function validar_campos_planes() {
  function crear_planes_turistico() {
    return $.ajax({
      url: "/ctic-travel/controllers/PlanesTurismoController.php",
      type: "POST",
      data: `action=crear_planes&${$("#form_planes").serialize()}`,
      success: function (response) {
        let planes = JSON.parse(response);
        if (planes != 0) {
          generar_tabla_planes(planes);
          datos_planes = planes;
        }
        $("#form_planes")[0].reset();
        $("#btn_crear_planes").text('Crear Plan Turismo');
      },
      error: function (response) {
        alert("Error al crear el planes.");
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
  function eliminar_planes(plan_turistico_id) {
    return $.ajax({
      url: "/ctic-travel/controllers/PlanesTurismoController.php",
      type: "POST",
      data: `action=eliminar_plan_turismo&plan_turistico_id=${plan_turistico_id}`,
      success: function (response) {
        let planes = JSON.parse(response);
        if (planes !== 0)
          generar_tabla_destinos(planes);
        $("#btn_crear_destino").text('Crear Plan Turistico');
        sw_edita_destino  = 0;
      },
      error: function (response) {
        alert("Error al crear los planes.");
      },
    });
  }
