<?php
require_once "../utils/database.php";
class AdminModel {
  private $con;
  public function __construct() {
    $this->con = new Database();
  }
  public function consultar_paises() {
    try {
      $sql = "SELECT
                municipios.id AS municipio_id,
                municipios.nombre AS municipio,
                departamentos.id AS departamento_id,
                departamentos.nombre AS departamento,
                paises.id            AS pais_id,
                paises.nombre        AS pais
              FROM
                municipios
              INNER JOIN
                departamentos
              ON
                municipios.departamento_id = departamentos.id
              INNER JOIN
                paises
              ON
                departamentos.pais_id = paises.id;";
      $params = [];
      $stmt   = $this->con->query($sql, $params);
      $datos = [];
      while ($rows = $stmt->fetch()) {
        $datos['pais'][$rows['pais_id']]['pais']                                                               = $rows['pais'];
        $datos['pais'][$rows['pais_id']]['pais_id']                                                            = $rows['pais_id'];
        $datos['departamento'][$rows['pais_id']][$rows['departamento_id']]['departamento_id']                  = $rows['departamento_id'];
        $datos['departamento'][$rows['pais_id']][$rows['departamento_id']]['departamento']                     = $rows['departamento'];
        $datos['municipio'][$rows['pais_id']][$rows['departamento_id']][$rows['municipio_id']]['municipio_id'] = $rows['municipio_id'];
        $datos['municipio'][$rows['pais_id']][$rows['departamento_id']][$rows['municipio_id']]['municipio']    = $rows['municipio'];
      }
      $stmt = null;
      return $datos;
    } catch (PDOException $e) {
      // Manejar errores de la base de datos según sea necesario
      echo "Error de la base de datos: " . $e->getMessage();
    }
    return 0;
  }
}
?>