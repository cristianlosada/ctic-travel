let div_crear_destino        = $(`#div_crear_destino`);
let div_crear_hospedaje      = $(`#div_crear_hospedaje`);
let div_crear_plan_turistico = $(`#div_crear_plan_turistico`);
let div_estadistica          = $(`#div_estadistica`);
let div_bienvenida           = $(`#div_bienvenida`);
let data_paises              = {};
let data_departamentos       = {};
let data_municipios          = {};
$("#btn_index").click(function () {
  div_bienvenida.removeAttr(`hidden`);
  div_crear_hospedaje.attr(`hidden`, true);
  div_crear_destino.attr(`hidden`, true);
  div_estadistica.attr(`hidden`, true);
  div_crear_plan_turistico.attr(`hidden`, true);
});
$("#btn_menu_crear_destino").click(async function () {
  div_crear_destino.removeAttr(`hidden`);
  div_crear_hospedaje.attr(`hidden`, true);
  div_crear_plan_turistico.attr(`hidden`, true);
  div_estadistica.attr(`hidden`, true);
  div_bienvenida.attr(`hidden`, true);
  div_crear_destino.html(await template_crear_destinos());
  await cargar_datos_select();
  await consultar_destinos();
  await agregar_validaciones_formulario_destino();
  interval_destino = setInterval(consultar_destinos, 30000);
});
$("#btn_menu_crear_hospedaje").click(async function () {
  div_crear_destino.attr(`hidden`, true);
  div_crear_hospedaje.removeAttr(`hidden`);
  div_crear_plan_turistico.attr(`hidden`, true);
  div_estadistica.attr(`hidden`, true);
  div_bienvenida.attr(`hidden`, true);
  div_crear_hospedaje.html(template_crear_hospedajes());
  await cargar_datos_select();
  await consultar_hospedajes();
  await agregar_validaciones_formulario_hospedaje();
  interval_hospedaje = setInterval(consultar_hospedajes, 30000);
});
$("#btn_menu_crear_plan_turistico").click(async function () {
  div_crear_destino.attr(`hidden`, true);
  div_crear_hospedaje.attr(`hidden`, true);
  div_crear_plan_turistico.removeAttr(`hidden`);
  div_estadistica.attr(`hidden`, true);
  div_bienvenida.attr(`hidden`, true);
  div_crear_plan_turistico.html(template_crear_planes());
  await cargar_datos_select_planes();
  await consultar_planes();
  await agregar_validaciones_formulario_planes();
});
$("#btn_menu_ver_estadisticas").click(function () {
  div_crear_destino.attr(`hidden`, true);
  div_crear_hospedaje.attr(`hidden`, true);
  div_crear_plan_turistico.attr(`hidden`, true);
  div_estadistica.removeAttr(`hidden`);
  div_bienvenida.attr(`hidden`, true);
  div_estadistica.html(template_estadisticas());
});
$("#logoutBtn").click(function() {
  // Mostrar una confirmación antes de cerrar la sesión
  if (confirm("¿Estás seguro de que deseas cerrar sesión?"))
    cerrar_sesion();
});
  
// funcion que consulta los paises, departamentos y ciudades
consultar_paises();
function cargar_datos_select() {
  var pais_select = $("#destino_pais");
  for (i in data_paises)
    pais_select.append('<option value="'+data_paises[i].pais_id+'">' +data_paises[i].pais+"</option>");
  pais_select.on("change", function () {
    let pais_seleccionado_id = $(this).val();
    filtro_departamentos = {};
    filtro_departamentos = data_departamentos[pais_seleccionado_id];
    let departamento_select = $("#destino_departamento");
    for (i in filtro_departamentos)
      departamento_select.append('<option value="' + filtro_departamentos[i].departamento_id +'">' + filtro_departamentos[i].departamento +"</option>" );
    departamento_select.on("change", function () {
      let departamento_seleccionado_id = $(this).val();
      filtro_municipios = {};
      filtro_municipios =
        data_municipios[pais_seleccionado_id][departamento_seleccionado_id];
      var municipio_select = $("#destino_ciudad");
      municipio_select.empty();
      for (i in filtro_municipios)
        municipio_select.append('<option value="' + filtro_municipios[i].municipio_id +'">' + filtro_municipios[i].municipio +"</option>");
    });
  });
  //hospedajes
  var pais_select_hospedaje = $("#hospedaje_pais");
  for (i in data_paises)
    pais_select_hospedaje.append('<option value="'+data_paises[i].pais_id+'">' +data_paises[i].pais+"</option>");
  pais_select_hospedaje.on("change", function () {
    let pais_seleccionado_id = $(this).val();
    filtro_departamentos = {};
    filtro_departamentos = data_departamentos[pais_seleccionado_id];
    let departamento_select = $("#hospedaje_departamento");
    for (i in filtro_departamentos)
      departamento_select.append('<option value="' + filtro_departamentos[i].departamento_id +'">' + filtro_departamentos[i].departamento +"</option>" );
    departamento_select.on("change", function () {
      let departamento_seleccionado_id = $(this).val();
      filtro_municipios = {};
      filtro_municipios =
        data_municipios[pais_seleccionado_id][departamento_seleccionado_id];
      var municipio_select = $("#hospedaje_ciudad");
      municipio_select.empty();
      for (i in filtro_municipios)
        municipio_select.append('<option value="' + filtro_municipios[i].municipio_id +'">' + filtro_municipios[i].municipio +"</option>");
    });
  });
}
// }
function consultar_paises() {
  return $.ajax({
    type: "POST",
    url: "/ctic-travel/controllers/AdminController.php",
    data: {
      action: "consultar_paises",
    },
    success: function (response) {
      var jsonData = JSON.parse(response);
      data_paises = jsonData.pais;
      data_departamentos = jsonData.departamento;
      data_municipios = jsonData.municipio;
    },
  });
}
// cierre de sesion
function cerrar_sesion() {
  return $.ajax({
    type: "POST",
    url: "/ctic-travel/controllers/AuthController.php",
    data: {
      action: 'logout'
    },
    success: function(response) {
      window.location.href = `/ctic-travel/login.php`;
    },
    error: function(request, status, error) {
      window.location.href = `/ctic-travel/login.php`;
    },
  });
}
