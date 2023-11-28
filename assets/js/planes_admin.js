function cargar_datos_select_planes() {
  
}
function agregar_validaciones_formulario_planes() {
  $("#form_planes")[0].reset();
  $("#btn_cancelar_planes").click(function () {
    $("#form_planes")[0].reset();
    $("#btn_crear_planes").text('Crear Destino');
    sw_edita_planes  = 0;
  });
  $("#btn_crear_planes").click(function () {
    var errorCount         = 0;
    var pais               = $("#planes_pais").val();
    var departamento       = $("#planes_departamento").val();
    var ciudad             = $("#planes_ciudad").val();
    var lugar              = $("#planes_lugar").val();
    var lugares_atractivos = $("#planes_lugares_atractivos").val();
    if (!pais) {
      $("#planes_pais")
        .parent()
        .append("<span class='error text-danger'>Seleccione un país.</span>");
      errorCount++;
    } else $("#planes_pais").parent().find(".error").remove();
    if (!departamento) {
      $("#planes_departamento")
        .parent()
        .append(
          "<span class='error text-danger'>Seleccione un departamento.</span>"
        );
      errorCount++;
    } else $("#planes_departamento").parent().find(".error").remove();
    if (!ciudad) {
      $("#planes_ciudad")
        .parent()
        .append(
          "<span class='error text-danger'>Seleccione una ciudad o municipio.</span>"
        );
      errorCount++;
    } else $("#planes_ciudad").parent().find(".error").remove();
    if (!lugar) {
      $("#planes_lugar")
        .parent()
        .append("<span class='error text-danger'>Ingrese un lugar.</span>");
      errorCount++;
    } else $("#planes_lugar").parent().find(".error").remove();
    if (!lugares_atractivos) {
      $("#planes_lugares_atractivos")
        .parent()
        .append(
          "<span class='error text-danger'>Ingrese lugares atractivos.</span>"
        );
      errorCount++;
    } else $("#planes_lugares_atractivos").parent().find(".error").remove();
    if (errorCount === 0) {
      if (sw_edita_planes == 0)
        crear_planes_turistico();
      else
        actualizar_planes(sw_edita_planes);
    }
  });
}