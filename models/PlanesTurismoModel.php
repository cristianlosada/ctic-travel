<?php
require_once "../utils/database.php";
class PlanesTurismoModel {
  private $con;
  public function __construct() {
    $this->con = new Database();
  }
  public function crear_planes_turisticos() {
    $sw_plan_turistico = $this->insertar_planes_turisticos();
    if ($sw_plan_turistico !== 0) {
      foreach ($_POST['planes_destinos'] as $destino)
        $this->insertar_destino_plan_turistico($sw_plan_turistico, $destino);
      foreach ($_POST['planes_hospedajes'] as $hospedaje)
        $this->insertar_hospedaje_plan_turistico($sw_plan_turistico, $hospedaje);
      return $this->consultar_planes_turisticos();
    }
    return 0;
  }
  public function insertar_planes_turisticos() {
    try {
      $sql = "INSERT INTO planes_turisticos_principal
              (
                precio,
                duracion_dias,
                duracion_noches,
                tipo_transporte,
                cantidad_paquetes_habilitados
              )
              VALUES
              (
                :precio,
                :duracion_dias,
                :duracion_noches,
                :tipo_transporte,
                :cantidad_paquetes
              )";
      //Asignación de reemplazo de parámetros
      $params = [
      ':precio'            => $_POST['planes_precio'],
      ':duracion_dias'     => $_POST['planes_duracion_dias'],
      ':duracion_noches'   => $_POST['planes_duracion_noche'],
      ':tipo_transporte'   => $_POST['planes_transporte'],
      ':cantidad_paquetes' => $_POST['planes_paquetes'],
      ];
      $stmt = $this->con->query($sql, $params);
      if ($stmt->rowCount() > 0)
        return $this->con->getPDO()->lastInsertId(); 
      else
        return 0;
    } catch (PDOException $e) {
      // Manejar errores de la base de datos según sea necesario
      echo "Error de la base de datos: " . $e->getMessage();
    }
  }
  public function insertar_destino_plan_turistico($plan_turimo_id, $destino_id) {
    try {
      $sql = "INSERT INTO planes_destinos
              (
                plan_principal_id,
                destino_id,
                fecha
              )
              VALUES
              (
                :plan_principal_id,
                :destino_id,
                now()
              )";
      //Asignación de reemplazo de parámetros
      $params = [
      ':plan_principal_id' => $plan_turimo_id,
      ':destino_id'        => $destino_id
      ];
      $stmt = $this->con->query($sql, $params);
      if ($stmt->rowCount() > 0)
        return 1;     
      else
        return 0;
    } catch (PDOException $e) {
      // Manejar errores de la base de datos según sea necesario
      echo "Error de la base de datos: " . $e->getMessage();
    }
  }
  public function insertar_hospedaje_plan_turistico($plan_turimo_id, $hospedaje_id) {
    try {
      $sql = "INSERT INTO planes_hospedajes
              (
                plan_principal_id,
                hospedaje_id,
                fecha
              )
              VALUES
              (
                :plan_principal_id,
                :hospedaje_id,
                now()
              )";
      //Asignación de reemplazo de parámetros
      $params = [
        ':plan_principal_id' => $plan_turimo_id,
        ':hospedaje_id'      => $hospedaje_id
      ];
      $stmt = $this->con->query($sql, $params);
      if ($stmt->rowCount() > 0)
        return 1;     
      else
        return 0;
    } catch (PDOException $e) {
      // Manejar errores de la base de datos según sea necesario
      echo "Error de la base de datos: " . $e->getMessage();
    }
  }
  public function consultar_planes_turisticos() {
    try {
      $sql = "SELECT
                pla_tur_pri.id,
                pla_tur_pri.precio,
                pla_tur_pri.duracion_dias,
                pla_tur_pri.duracion_noches,
                pla_tur_pri.tipo_transporte,
                pla_tur_pri.cantidad_paquetes_habilitados,
                COUNT(pla_usu.plan_turistico_id)                                               AS vendidos,
                (pla_tur_pri.cantidad_paquetes_habilitados - COUNT(pla_usu.plan_turistico_id)) AS restante
              FROM
                planes_turisticos_principal AS pla_tur_pri
                LEFT JOIN planes_usuarios   AS pla_usu     ON (pla_tur_pri.id = pla_usu.plan_turistico_id)
              WHERE
                pla_tur_pri.estado = 1
              GROUP BY
                pla_tur_pri.precio,
                pla_tur_pri.duracion_dias,
                pla_tur_pri.duracion_noches,
                pla_tur_pri.tipo_transporte,
                pla_tur_pri.cantidad_paquetes_habilitados;";
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
  public function consultar_planes_turisticos_reportes() {
    try {
      $sql = "SELECT
                pla_tur_pri.precio,
                pla_tur_pri.duracion_dias                                                      AS dias,
                pla_tur_pri.duracion_noches                                                    AS noches,
                pla_tur_pri.tipo_transporte,
                pla_tur_pri.cantidad_paquetes_habilitados                                      AS habilitados,
                COUNT(pla_usu.plan_turistico_id)                                               AS vendidos,
                (pla_tur_pri.cantidad_paquetes_habilitados - COUNT(pla_usu.plan_turistico_id)) AS restante
              FROM
                planes_turisticos_principal AS pla_tur_pri
                INNER JOIN planes_usuarios  AS pla_usu     ON (pla_tur_pri.id = pla_usu.plan_turistico_id)
              WHERE
                pla_tur_pri.estado = 1
              GROUP BY
                pla_tur_pri.precio,
                pla_tur_pri.duracion_dias,
                pla_tur_pri.duracion_noches,
                pla_tur_pri.tipo_transporte,
                pla_tur_pri.cantidad_paquetes_habilitados;";
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
  public function eliminar_plan_turismo() {
    try {
      $sql      = "UPDATE planes_turisticos_principal SET estado = '0' WHERE id = :id;";
      $params   = [':id' => $_POST['plan_turistico_id']];
      $stmt     = $this->con->query($sql, $params);;
      if ($stmt->rowCount() > 0)
        return $this->consultar_planes_turisticos();      
      else
        return 0;
    } catch (PDOException $e) {
      return "Error de la base de datos: " . $e->getMessage();
    }
    return 0;
  }
}
?>