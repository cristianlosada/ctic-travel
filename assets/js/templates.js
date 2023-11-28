function template_crear_hospedajes() {
  let html = ``;
  html = `<div class="container mt-4">
            <h4 class="display-5 text-center">Gestionar Hospedajes</h4>
            <form id="form_hospedaje" method="post">
              <div class="row mb-4">
                <div class="col-md-4">
                  <div class="mb-3">
                    <label for="nombre">Nombre del Hospedaje:</label>
                    <input type="text" name="hospedaje_nombre" id="hospedaje_nombre" class="form-control">
                  </div>
                  <div class="mb-3">
                    <label for="tipo">Tipo de Hospedaje:</label>
                    <select name="hospedaje_tipo" id="hospedaje_tipo" class="form-control">
                      <option value="hotel">Hotel</option>
                      <option value="hospedaje">Hospedaje</option>
                      <option value="residencia">Residencia</option>
                      <option value="apto_privado">Apartamento Privado</option>
                      <option value="habitacion_compartida">Habitación en Casa Compartida</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="mb-3">
                    <label for="habitaciones">Cantidad de Habitaciones:</label>
                    <input type="number" name="hospedaje_habitaciones" id="hospedaje_habitaciones" class="form-control">
                  </div>
                  <div class="mb-3">
                    <label for="checkin">Horario de Check-in:</label>
                    <input type="time" name="hospedaje_checkin" id="hospedaje_checkin" class="form-control">
                  </div>
                  <div class="mb-3">
                    <label for="checkout">Horario de Check-out:</label>
                    <input type="time" name="hospedaje_checkout" id="hospedaje_checkout" class="form-control">
                  </div>
                </div>
                <div class="col-md-4"> 
                  <div class="mb-3">
                    <label for="pais">País</label>
                    <select class="form-control" id="hospedaje_pais" name="hospedaje_pais">
                      <option value="">Selecciona un país</option>
                    </select>
                  </div>
                  <div class="mb-3">
                    <label for="departamento">Departamento</label>
                    <select class="form-control" id="hospedaje_departamento" name="hospedaje_departamento">
                      <option value="">Selecciona un departamento</option>
                    </select>
                  </div>
                  <div class="mb-3">
                    <label for="ciudad">Ciudad o municipio</label>
                    <select class="form-control" id="hospedaje_ciudad" name="hospedaje_ciudad">
                      <option value="">Selecciona un municipio</option>
                    </select>
                  </div>
                </div>
              </div>
            </form>
            <button id="btn_crear_hospedaje" class="btn btn-primary">Crear Hospedaje</button>
            <button id="btn_cancelar_hospedaje" class="btn btn-danger">Cancelar</button>
          </div>
          <div class="container mt-4">
          <h3>Listado de Hospedajes</h3>

          <!-- Tabla para mostrar los hospedajes -->
          <table class="table table-responsive">
              <thead>
                  <tr>
                      <th>ID</th>
                      <th>Ubicacion</th>
                      <th>Nombre</th>
                      <th>Tipo Hospedaje</th>
                      <th># Habitaciones</th>
                      <th>Check-In</th>
                      <th>Check-Out</th>
                      <th></th>
                  </tr>
              </thead>
              <tbody id="datos_hospedajes">
              </tbody>
          </table>
      </div>`;
  return html;
}
function template_crear_destinos() {
  let html = ``;
  html = `<div class="container mt-4">
  <h4 class="display-5 text-center">Gestionar Destino Turístico</h4>

  <form id="form_destino" method="post">
      <div class="row mb-4">
          <div class="col-md-6">
              <label for="pais">País</label>
              <select class="form-control" id="destino_pais" name="destino_pais">
                <option value="">Selecciona un país</option>
              </select>
          </div>
          <div class="col-md-6">
              <label for="departamento">Departamento</label>
              <select class="form-control" id="destino_departamento" name="destino_departamento">
              <option value="">Selecciona un departamento</option>
              </select>
          </div>
      </div>
      <div class="row mb-4">
          <div class="col-md-6">
              <label for="ciudad">Ciudad o municipio</label>
              <select class="form-control" id="destino_ciudad" name="destino_ciudad">
                <option value="">Selecciona un municipio</option>
              </select>
          </div>
          <div class="col-md-6">
              <label for="lugar">Lugar</label>
              <input type="text" class="form-control" id="destino_lugar" name="destino_lugar">
          </div>
      </div>
      <div class="row mb-4">
          <div class="col-md-12">
              <label for="lugares_atractivos">Lugares atractivos</label>
              <textarea class="form-control" id="destino_lugares_atractivos" name="destino_lugares_atractivos" rows="3"></textarea>
          </div>
      </div>
    </form>
    <button id="btn_crear_destino" class="btn btn-primary">Crear Destino</button>
    <button id="btn_cancelar_destino" class="btn btn-danger">Cancelar</button>
  </div>
  <div class="container mt-4">
          <h3>Listado de Destinos Turísticos</h3>

          <!-- Tabla para mostrar los destinos -->
          <table class="table">
              <thead>
                  <tr>
                      <th>ID</th>
                      <th>País</th>
                      <th>Departamento</th>
                      <th>Ciudad/Municipio</th>
                      <th>Lugar Atractivo</th>
                      <th>Informacion General</th>
                      <th></th>
                  </tr>
              </thead>
              <tbody id="datos_destinos">
              </tbody>
          </table>
      </div>
`;
  return html;
}
function template_crear_planes() {
  let html = ``;
  html = `<div class="container mt-4">
  <h4 class="display-5 text-center">Gestionar Planes Turísticos</h4>
  <form id="form_planes" method="post">
      <div class="row mb-4">
          <div class="col-md-6">
              <div class="mb-3">
                  <label for="destinos">Destinos Turísticos:</label>
                  <select name="planes_destinos[]" id="planes_destinos" class="form-control" multiple>
                      <!-- Agrega opciones de destinos turísticos dinámicamente si es necesario -->
                      <option value="destino1">Destino 1</option>
        <option value="destino2">Destino 2</option>
        <option value="destino3">Destino 3</option>
                  </select>
              </div>
              <div class="mb-3">
                  <label for="hospedajes">Hospedajes:</label>
                  <select name="planes_hospedajes[]" id="planes_hospedajes" class="form-control" multiple>
                      <!-- Agrega opciones de hospedajes dinámicamente si es necesario -->
                  </select>
              </div>
              <div class="mb-3">
                  <label for="precio">Precio del Paquete:</label>
                  <input type="number" name="planes_precio" id="planes_precio" class="form-control">
              </div>
          </div>
          <div class="col-md-6">
              <div class="mb-3">
                  <label for="duracion">Duración (días y noches):</label>
                  <input type="text" name="planes_duracion" id="planes_duracion" class="form-control">
              </div>
              <div class="mb-3">
                  <label for="transporte">Tipo de Transporte:</label>
                  <select name="planes_transporte" id="planes_transporte" class="form-control">
                      <option value="aereo">Aéreo</option>
                      <option value="terrestre">Terrestre</option>
                  </select>
              </div>
              <div class="mb-3">
                  <label for="paquetes">Cantidad de Paquetes Habilitados:</label>
                  <input type="number" name="planes_paquetes" id="planes_paquetes" class="form-control">
              </div>
          </div>
      </div>
  </form>
  <button id="btn_crear_planes" class="btn btn-primary">Crear Plan Turístico</button>
  <button id="btn_cancelar_planes" class="btn btn-danger">Cancelar</button>
</div>

<div class="container mt-4">
  <h3>Listado de Planes Turísticos</h3>
  <!-- Tabla para mostrar los planes turísticos -->
  <table class="table table-responsive">
      <thead>
          <tr>
              <th>ID</th>
              <th>Destinos Turísticos</th>
              <th>Hospedajes</th>
              <th>Precio</th>
              <th>Duración</th>
              <th>Tipo de Transporte</th>
              <th>Paquetes Habilitados</th>
              <th></th>
          </tr>
      </thead>
      <tbody id="datos_planes_turisticos">
          <!-- Aquí se mostrarán dinámicamente los datos de los planes turísticos -->
      </tbody>
  </table>
</div>
`;
  return html;
}
function template_estadisticas() {
  let html = ``;
  html = `<div class="container mt-4">
  <h1 class="display-5 text-center">Estadísticas</h1>

  <div class="row mb-5">
      <div class="col-md-6">
          <h2>Destinos turísticos</h2>
          <div class="card">
              <div class="card-body">
                  <ul>
                      <li>Número de destinos turísticos: <strong>100</strong></li>
                      <li>Países con más destinos turísticos: <strong>Colombia</strong></li>
                      <li>Lugares más visitados: <strong>Bogotá, Medellin, Cali</strong></li>
                  </ul>
              </div>
          </div>
      </div>
      <div class="col-md-6">
          <h2>Hospedajes</h2>
          <div class="card">
              <div class="card-body">
                  <ul>
                      <li>Número de hospedajes: <strong>500</strong></li>
                      <li>Tipos de hospedaje más populares: <strong>hoteles, hostales, apartamentos</strong></li>
                      <li>Precio promedio de un hospedaje: <strong>$400.000 COP</strong></li>
                  </ul>
              </div>
          </div>
      </div>
  </div>
  <div class="row mb-4">
      <div class="col-md-6">
          <h2>Planes turísticos</h2>
          <div class="card">
              <div class="card-body">
                  <ul>
                      <li>Número de planes turísticos: <strong>200</strong></li>
                      <li>Duración promedio de un plan turístico: <strong>5 días</strong></li>
                      <li>Precio promedio de un plan turístico: <strong>$2.000.000 COP</strong></li>
                  </ul>
              </div>
          </div>
      </div>
      <div class="col-md-6">
          <button class="btn btn-primary float-right mb-3" onclick="generar_reporte_pdf();">Descargar estadísticas en PDF</button>
      </div>
  </div>
</div>

`;
  return html;
}
