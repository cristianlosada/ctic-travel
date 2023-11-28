<?php
require_once "../utils/database.php";
class ClientModel {
  private $con;
  public function __construct() {
    $this->con = new Database();
  }
  public function suscribir_plan_turistico() {
    try {
      $sql = "INSERT INTO planes_usuarios
              (
                usuario_id,
                plan_turistico_id
              )
              VALUES
              (
                :usuario_id,
                :plan_turistico_id
              )";
      //Asignación de reemplazo de parámetros
      session_start();
      $params = [
      ':usuario_id'         => $_SESSION["user"],
      ':plan_turistico_id'  => $_POST['plan_turistico_id'],
      ];
      $stmt = $this->con->query($sql, $params);
      if ($stmt->rowCount() > 0)
        return $this->consultar_planes_turisticos_disponibles();      
      else
        return 0;
    } catch (PDOException $e) {
      // Manejar errores de la base de datos según sea necesario
      echo "Error de la base de datos: " . $e->getMessage();
    }
    return 0;
  }
  public function consultar_planes_turisticos_disponibles() {
    session_start();
    $plan_usuario = $this->consultar_planes_usuarios($_SESSION["user"]);
    try {
      $sql = "SELECT
                pla_tur_pri.id,
                pla_tur_pri.precio,
                pla_tur_pri.duracion_dias,
                pla_tur_pri.duracion_noches,
                pla_tur_pri.tipo_transporte,
                pla_tur_pri.cantidad_paquetes_habilitados,
                dest.id                                 AS destino_id,
                dest.lugar_atractivo,
                dest.informacion_adicional,
                paisd.nombre                            AS pais_destino,
                depd.nombre                             AS departamento_destino,
                mpiod.nombre                            AS municipio_destino,
                hos.id                                  AS hospedaje_id,
                hos.nombre                              AS hospedaje,
                hos.tipo                                AS tipo_hospedaje,
                hos.cantidad_habitaciones               AS habitaciones,
                hos.horario_checkin,
                hos.horario_checkout,
                pais.nombre                             AS pais_hospedaje,
                dep.nombre                              AS departamento_hospedaje,
                mpio.nombre                             AS municipio_hospedaje,
                pla_des.id                              AS plan_destino_id,
                pla_hos.id                              AS plan_hospedaje_id
              FROM
                planes_turisticos_principal AS pla_tur_pri
                LEFT JOIN planes_destinos  AS pla_des     ON (pla_tur_pri.id       = pla_des.plan_principal_id)
                LEFT JOIN planes_hospedajes AS pla_hos    ON (pla_tur_pri.id       = pla_hos.plan_principal_id)
                LEFT JOIN destinos         AS dest        ON (pla_des.destino_id   = dest.id)
                LEFT JOIN hospedajes       AS hos         ON (pla_hos.hospedaje_id = hos.id)
                LEFT JOIN paises           AS pais        ON (hos.pais             = pais.id)
                LEFT JOIN departamentos    AS dep         ON (hos.pais             = dep.id)
                LEFT JOIN municipios       AS mpio        ON (hos.pais             = mpio.id)
                LEFT JOIN paises           AS paisd       ON (dest.pais            = paisd.id)
                LEFT JOIN departamentos    AS depd        ON (dest.pais            = depd.id)
                LEFT JOIN municipios       AS mpiod       ON (dest.pais            = mpiod.id)
              WHERE
                hos.estado = '1';";
      $params   = [];
      $stmt     = $this->con->query($sql, $params);
      $datos    = [];
      $hospedajes = $stmt->fetchAll(PDO::FETCH_ASSOC);
      foreach ($hospedajes as $rows) {
        $datos[$rows['id']][] = $rows;
      }
      $stmt = null;
      return ['planes' => $datos, 'planes_usuarios' => $plan_usuario, 'usuario' => $_SESSION["user"]];
    } catch (PDOException $e) {
      echo "Error de la base de datos: " . $e->getMessage();
    }
    return 0;
  }
  public function consultar_planes_usuarios($usuario) {
    try {
      $sql = "SELECT * FROM planes_usuarios WHERE usuario_id = :usuario;";
      $params   = [':usuario' => $usuario];
      $stmt     = $this->con->query($sql, $params);
      $datos    = [];
      $hospedajes = $stmt->fetchAll(PDO::FETCH_ASSOC);
      foreach ($hospedajes as $rows) {
        $datos[$rows['plan_turistico_id']] = $rows;
      }
      $stmt = null;
      return $datos;
    } catch (PDOException $e) {
      echo "Error de la base de datos: " . $e->getMessage();
    }
    return 0;
  }
}
?>