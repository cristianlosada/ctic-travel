<?php
require_once "../utils/database.php";
class HospedajeModel {
  private $con;
  public function __construct() {
    $this->con = new Database();
  }
  public function crear_hospedaje() {
    try {
      $sql = "INSERT INTO hospedajes
              (
                nombre,
                tipo,
                cantidad_habitaciones,
                horario_checkin,
                horario_checkout,
                pais,
                departamento,
                ciudad
              )
              VALUES
              (
                :nombre,
                :tipo,
                :cantidad_habitaciones,
                :horario_checkin,
                :horario_checkout,
                :pais,
                :departamento,
                :ciudad
              )";
      //Asignación de reemplazo de parámetros
      $params = [
      ':pais'                  => $_POST['hospedaje_pais'],
      ':departamento'          => $_POST['hospedaje_departamento'],
      ':ciudad'                => $_POST['hospedaje_ciudad'],
      ':horario_checkout'      => $_POST['hospedaje_checkout'],
      ':horario_checkin'       => $_POST['hospedaje_checkin'],
      ':nombre'                => $_POST['hospedaje_nombre'],
      ':tipo'                  => $_POST['hospedaje_tipo'],
      ':cantidad_habitaciones' => $_POST['hospedaje_habitaciones'],
      ];
      $stmt = $this->con->query($sql, $params);
      if ($stmt->rowCount() > 0)
        return $this->consultar_hospedajes();      
      else
        return 0;
    } catch (PDOException $e) {
      // Manejar errores de la base de datos según sea necesario
      echo "Error de la base de datos: " . $e->getMessage();
    }
    return 0;
  }
  public function consultar_hospedajes() {
    try {
      $sql = "SELECT
                hospedajes.*,
                municipios.id        AS municipio_id,
                municipios.nombre    AS municipio_des,
                departamentos.id     AS departamento_id,
                departamentos.nombre AS departamento_des,
                paises.id            AS pais_id,
                paises.nombre        AS pais_des
              FROM
                hospedajes
                INNER JOIN municipios    ON hospedajes.ciudad       = municipios.id
                INNER JOIN departamentos ON hospedajes.departamento = departamentos.id
                INNER JOIN paises        ON hospedajes.pais         = paises.id
              WHERE
                hospedajes.estado = '1'
              ORDER BY
                hospedajes.pais,
                hospedajes.departamento,
                hospedajes.ciudad;";
      $params   = [];
      $stmt     = $this->con->query($sql, $params);
      $datos    = [];
      $hospedajes = $stmt->fetchAll(PDO::FETCH_ASSOC);
      foreach ($hospedajes as $rows)
        $datos[$rows['id']] = $rows;
      $stmt = null;
      return $datos;
    } catch (PDOException $e) {
      echo "Error de la base de datos: " . $e->getMessage();
    }
    return 0;
  }
  public function consultar_hospedajes_reportes() {
    try {
      $sql = "SELECT
                hospedajes.*,
                municipios.id        AS municipio_id,
                municipios.nombre    AS municipio_des,
                departamentos.id     AS departamento_id,
                departamentos.nombre AS departamento_des,
                paises.id            AS pais_id,
                paises.nombre        AS pais_des
              FROM
                hospedajes
                INNER JOIN municipios    ON hospedajes.ciudad       = municipios.id
                INNER JOIN departamentos ON hospedajes.departamento = departamentos.id
                INNER JOIN paises        ON hospedajes.pais         = paises.id
              WHERE
                hospedajes.estado = '1'
              ORDER BY
                hospedajes.pais,
                hospedajes.departamento,
                hospedajes.ciudad;";
      $params   = [];
      $stmt     = $this->con->query($sql, $params);
      $datos    = [];
      $hospedajes = $stmt->fetchAll(PDO::FETCH_ASSOC);
      foreach ($hospedajes as $rows)
        $datos[] = $rows;
      $stmt = null;
      return $datos;
    } catch (PDOException $e) {
      echo "Error de la base de datos: " . $e->getMessage();
    }
    return 0;
  }
  public function eliminar_hospedajes() {
    try {
      $sql      = "UPDATE hospedajes SET estado = 0 WHERE id = :id;";
      $params   = [':id' => $_POST['hospedaje_id']];
      $stmt     = $this->con->query($sql, $params);
      $datos    = [];
      if ($stmt->rowCount() > 0)
        return $this->consultar_hospedajes();      
      else
        return 0;
    } catch (PDOException $e) {
      return "Error de la base de datos: " . $e->getMessage();
    }
    return 0;
  }
  public function actualizar_hospedajes() {
    try {
      $sql      = " UPDATE
                      hospedajes
                    SET
                      pais                  = :pais,
                      departamento          = :departamento,
                      ciudad                = :ciudad,
                      tipo                  = :tipo,
                      nombre                = :nombre,
                      cantidad_habitaciones = :cantidad_habitaciones,
                      horario_checkin       = :horario_checkin,
                      horario_checkout      = :horario_checkout  
                    WHERE id = :id;";
      $params   = [
        ':id'                    => $_POST['hospedaje_id'],
        ':pais'                  => $_POST['hospedaje_pais'],
        ':departamento'          => $_POST['hospedaje_departamento'],
        ':ciudad'                => $_POST['hospedaje_ciudad'],
        ':tipo'                  => $_POST['hospedaje_tipo'],
        ':nombre'                => $_POST['hospedaje_nombre'],
        ':cantidad_habitaciones' => $_POST['hospedaje_habitaciones'],
        ':horario_checkin'       => $_POST['hospedaje_checkin'],
        ':horario_checkout'      => $_POST['hospedaje_checkout']
      ];
      $stmt     = $this->con->query($sql, $params);
      if ($stmt->rowCount() > 0)
        return $this->consultar_hospedajes();      
      else
        return 0;
    } catch (PDOException $e) {
      return "Error de la base de datos: " . $e->getMessage();
    }
    return 0;
  }
}
?>