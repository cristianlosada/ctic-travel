<?php
require_once "../utils/database.php";
class DestinoModel {
  private $con;
  public function __construct() {
    $this->con = new Database();
  }
  public function crear_destino() {
    try {
      $sql = "INSERT INTO destinos
              (
                pais,
                departamento,
                ciudad,
                lugar_atractivo,
                informacion_adicional
              )
              VALUES
              (
                :pais,
                :departamento,
                :ciudad,
                :lugar_atractivo,
                :informacion_adicional
              )";
      //Asignación de reemplazo de parámetros
      $params = [
      ':pais'                  => $_POST['destino_pais'],
      ':departamento'          => $_POST['destino_departamento'],
      ':ciudad'                => $_POST['destino_ciudad'],
      ':lugar_atractivo'       => $_POST['destino_lugar'],
      ':informacion_adicional' => $_POST['destino_lugares_atractivos']
      ];
      $stmt = $this->con->query($sql, $params);
      if ($stmt->rowCount() > 0)
        return $this->consultar_destinos();      
      else
        return 0;
    } catch (PDOException $e) {
      // Manejar errores de la base de datos según sea necesario
      echo "Error de la base de datos: " . $e->getMessage();
    }
    return 0;
  }
  public function consultar_destinos() {
    try {
      $sql = "SELECT
                destinos.*,
                municipios.id        AS municipio_id,
                municipios.nombre    AS municipio_des,
                departamentos.id     AS departamento_id,
                departamentos.nombre AS departamento_des,
                paises.id            AS pais_id,
                paises.nombre        AS pais_des
              FROM
                destinos
                INNER JOIN municipios    ON destinos.ciudad       = municipios.id
                INNER JOIN departamentos ON destinos.departamento = departamentos.id
                INNER JOIN paises        ON destinos.pais         = paises.id
              WHERE
                destinos.estado = '1'
              ORDER BY
                destinos.pais,
                destinos.departamento,
                destinos.ciudad;";
      $params   = [];
      $stmt     = $this->con->query($sql, $params);
      $datos    = [];
      $destinos = $stmt->fetchAll(PDO::FETCH_ASSOC);
      foreach ($destinos as $rows)
        $datos[$rows['id']] = $rows;
      $stmt = null;
      return $datos;
    } catch (PDOException $e) {
      echo "Error de la base de datos: " . $e->getMessage();
    }
    return 0;
  }
  public function consultar_destinos_reportes() {
    try {
      $sql = "SELECT
                destinos.*,
                municipios.id        AS municipio_id,
                municipios.nombre    AS municipio_des,
                departamentos.id     AS departamento_id,
                departamentos.nombre AS departamento_des,
                paises.id            AS pais_id,
                paises.nombre        AS pais_des
              FROM
                destinos
                INNER JOIN municipios    ON destinos.ciudad       = municipios.id
                INNER JOIN departamentos ON destinos.departamento = departamentos.id
                INNER JOIN paises        ON destinos.pais         = paises.id
              WHERE
                destinos.estado = '1'
              ORDER BY
                destinos.pais,
                destinos.departamento,
                destinos.ciudad;";
      $params   = [];
      $stmt     = $this->con->query($sql, $params);
      $datos    = [];
      $destinos = $stmt->fetchAll(PDO::FETCH_ASSOC);
      foreach ($destinos as $rows)
        $datos[] = $rows;
      $stmt = null;
      return $datos;
    } catch (PDOException $e) {
      echo "Error de la base de datos: " . $e->getMessage();
    }
    return 0;
  }
  public function eliminar_destinos() {
    try {
      $sql      = "UPDATE destinos SET estado = 0 WHERE id = :id;";
      $params   = [':id' => $_POST['destino_id']];
      $stmt     = $this->con->query($sql, $params);
      $datos    = [];
      if ($stmt->rowCount() > 0)
        return $this->consultar_destinos();      
      else
        return 0;
    } catch (PDOException $e) {
      return "Error de la base de datos: " . $e->getMessage();
    }
    return 0;
  }
  public function actualizar_destinos() {
    try {
      $sql      = " UPDATE
                      destinos
                    SET
                      pais                  = :pais,
                      departamento          = :departamento,
                      ciudad                = :ciudad,
                      lugar_atractivo       = :lugar_atractivo,
                      informacion_adicional = :informacion_adicional
                    WHERE id = :id;";
      $params   = [
        ':id'                    => $_POST['destino_id'],
        ':pais'                  => $_POST['destino_pais'],
        ':departamento'          => $_POST['destino_departamento'],
        ':ciudad'                => $_POST['destino_ciudad'],
        ':lugar_atractivo'       => $_POST['destino_lugar'],
        ':informacion_adicional' => $_POST['destino_lugares_atractivos']
      ];
      $stmt     = $this->con->query($sql, $params);
      if ($stmt->rowCount() > 0)
        return $this->consultar_destinos();      
      else
        return 0;
    } catch (PDOException $e) {
      return "Error de la base de datos: " . $e->getMessage();
    }
    return 0;
  }
}
?>