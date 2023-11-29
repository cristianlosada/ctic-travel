async function generar_reporte_pdf() {
  try {
    // Consultar destinos
    const response_destino = await consultar_destinos_reportes();
    const datos_destino    = JSON.parse(response_destino);
    // consultar hospedajes
    const response_hospedaje = await consultar_hospedajes_reportes();
    const datos_hospedaje    = JSON.parse(response_hospedaje);
    // consultar planes_turisticos
    const response_planes_turisticos = await consultar_planes_turisticos_reportes();
    const datos_planes_turisticos    = JSON.parse(response_planes_turisticos);
    // Verificar si hay datos
    if (datos_destino.length === 0 && datos_hospedaje.length === 0 && datos_planes_turisticos.length === 0) {
      alert('No hay datos disponibles para generar el reporte.');
      return;
    }
    // Crear el documento PDF
    const pdf = new jsPDF({ putOnlyUsedFonts: true, orientation: 'landscape' });
    pdf.setFontSize(30);
    // Agregar título
    pdf.text(10, 15, 'Reporte de Destinos disponibles en el sistema:');
    // Definir columnas del reporte
    const headers_destino = [
      { id: 'ID', name: 'ID', prompt: 'ID', width: 15, height: 5, align: 'center', padding: 0 },
      { id: 'Pais', name: 'pais_des', prompt: 'Pais', width: 70, height: 5, align: 'center', padding: 0 },
      { id: 'Departamento', name: 'departamento_des', prompt: 'Departamento', width: 70, height: 5, align: 'center', padding: 0 },
      { id: 'Ciudad', name: 'municipio_des', prompt: 'Ciudad', width: 70, height: 5, align: 'center', padding: 0 },
      { id: 'Destino', name: 'lugar_atractivo', prompt: 'Destino', width: 70, height: 5, align: 'center', padding: 0 },
      { id: 'Interes', name: 'informacion_adicional', prompt: 'Interes', width: 70, height: 5, align: 'center', padding: 0 },
    ];
    // Crear tabla con datos
    pdf.table(10, 25, datos_destino.map((item, index) => ({ ID: (index + 1).toString(), ...item })), headers_destino, { autoSize: false });
    pdf.addPage();
    pdf.setFontSize(30);
    // Agregar título
    pdf.text(10, 15, 'Reporte de Hospedajes disponibles en el sistema:');
    const headers_hospedaje = [
      { id: 'ID', name: 'ID', prompt: 'ID', width: 15, height: 5, align: 'center', padding: 0 },
      { id: 'Pais', name: 'pais_des', prompt: 'Pais', width: 40, height: 5, align: 'center', padding: 0 },
      { id: 'Departamento', name: 'departamento_des', prompt: 'Departamento', width: 50, height: 5, align: 'center', padding: 0 },
      { id: 'Ciudad', name: 'municipio_des', prompt: 'Ciudad', width: 40, height: 5, align: 'center', padding: 0 },
      { id: 'Nombre', name: 'nombre', prompt: 'Nombre', width: 70, height: 5, align: 'center', padding: 0 },
      { id: 'Tipo', name: 'tipo', prompt: 'Tipo Hospedaje', width: 50, height: 5, align: 'center', padding: 0 },
      { id: 'Habitaciones', name: 'cantidad_habitaciones', prompt: '# Hab.', width: 40, height: 5, align: 'center', padding: 0 },
      { id: 'CheckIn', name: 'horario_checkin', prompt: 'CheckIn', width: 30, height: 5, align: 'center', padding: 0 },
      { id: 'CheckOut', name: 'horario_checkout', prompt: 'CheckOut', width: 35, height: 5, align: 'center', padding: 0 },
    ];
    // Crear tabla con datos
    pdf.table(10, 25, datos_hospedaje.map((item, index) => ({ ID: (index + 1).toString(), ...item })), headers_hospedaje, { autoSize: false });
    pdf.addPage();
    pdf.setFontSize(30);
    // Agregar título
    pdf.text(10, 15, 'Reporte de Planes Turisticos disponibles en el sistema:');
    const headers_planes_turisticos = [
      { id: 'ID',                            name: 'ID',              prompt: 'ID', width: 15, height: 5, align: 'center', padding: 0 },
      { id: 'Precio',                        name: 'precio',          prompt: 'Precio', width: 40, height: 5, align: 'center', padding: 0 },
      { id: 'Duracion_Dias',                 name: 'dias',            prompt: 'Dias', width: 50, height: 5, align: 'center', padding: 0 },
      { id: 'Duracion_Noches',               name: 'noches',          prompt: 'Noches', width: 40, height: 5, align: 'center', padding: 0 },
      { id: 'Tipo_Transporte',               name: 'tipo_transporte', prompt: 'Transporte', width: 70, height: 5, align: 'center', padding: 0 },
      { id: 'Cantidad_Paquetes_Habilitados', name: 'habilitados',     prompt: 'Habilitados', width: 50, height: 5, align: 'center', padding: 0 },
      { id: 'Cantidad_vendidos',             name: 'vendidos',        prompt: 'Vendidos', width: 50, height: 5, align: 'center', padding: 0 },
      { id: 'Cantidad_Restante',             name: 'restante',        prompt: 'Restantes', width: 50, height: 5, align: 'center', padding: 0 },
    ];
    // Crear tabla con datos
    pdf.table(10, 25, datos_planes_turisticos.map((item, index) => ({ ID: (index + 1).toString(), ...item })), headers_planes_turisticos, { autoSize: false });
    // Guardar el documento PDF
    pdf.save('reporte_general_gestion_turistica.pdf');
  } catch (error) {
    console.error('Error al generar el reporte:', error);
    alert('Error al generar el reporte.');
  }
}
