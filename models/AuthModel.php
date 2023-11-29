<?php
require_once "../utils/database.php";
class AuthModel {
  private $con;
  public function __construct() {
    $this->con = new Database();
  }
  public function register_users() {
    $email          = $_POST['email'];
    $password       = $_POST['password'];
    $name           = $_POST['name'];
    $valida_usuario = $this->obtener_usuario($email);
    if ($valida_usuario !== '')
      return '1';
    $reg_usuario = $this->registrar_usuario_nuevo($email, base64_decode($password), $name);
    $reg_rol     = $this->registrar_usuario_rol($email);
    if ($reg_rol === 1 && $reg_usuario === 1) {
      session_start();
      $_SESSION['user_role'] = $this->obtener_roles($email);
      $_SESSION["user"]      = $email;
      $_SESSION["name"]      = $name;
      return $_SESSION['user_role'];
    }
    return '0';
  }
  private function registrar_usuario_nuevo($email, $password, $name) {
    $sql = "INSERT INTO users
            (
              name,
              email,
              password
            )
            VALUES
            (
              :name,
              :email,
              :password
            )";
    //Asignación de reemplazo de parámetros
    $params = [
      ':name'     => $name,
      ':email'    => $email,
      ':password' => password_hash($password, PASSWORD_BCRYPT)
    ];
    $stmt = $this->con->query($sql, $params);
    if ($stmt->rowCount() > 0)
      return 1;
    else
      return 0;
  }
  /**
   * asigna el rol
   */
  private function registrar_usuario_rol($usuario) {
    $sql = "INSERT INTO roles
            (
              rol,
              usuario
            )
            VALUES
            (
              :rol,
              :usuario
            )";
    //Asignación de reemplazo de parámetros
    $params = [
      ':rol'     => 'client',
      ':usuario' => $usuario
    ];
    $stmt = $this->con->query($sql, $params);
    if ($stmt->rowCount() > 0)
      return 1;
    else
      return 0;
  }
  public function login() {
    // Verificar si se han enviado datos del formulario
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
      $username = $_POST['username'];
      $password = $_POST['password'];

      // Realizar lógica de autenticación aquí
      if ($this->authenticate($username, base64_decode($password))) {
        $_SESSION['user_role'] = $this->obtener_roles($username);
        $this->redirectToDashboard($_SESSION['user_role']);
      } else {
        // Autenticación fallida, mostrar mensaje de error
        $_SESSION['error'] = 'Credenciales incorrectas. Inténtalo de nuevo.';
        //   header('Location: /ctic-travel/login.php');
        echo 'error';
      }
    } else
      echo 'error';
  }
  public function logout() {
    session_start();
    session_destroy();
    header("Location: /ctic-travel/login.php");
    exit();
  }

  // Lógica para verificar las credenciales en la base de datos
  private function authenticate($username, $password)
  {
    try {
      // Preparar la consulta usando sentencias preparadas para prevenir la inyección SQL
      $sql = "SELECT
                *
              FROM
                users
              WHERE  
                email = :username";
      $params = [':username' => $username];
      $stmt   = $this->con->query($sql, $params);
      $pass   = '';
      $name   = '';
      while ($rows = $stmt->fetch()) {
        $pass = $rows['password'];
        $name = $rows['name'];
      }
      if ($pass === '')
        return false;
      else {
        if (password_verify($password, $pass)) {
          // Credenciales válidas, realizar acciones necesarias
          session_start();
          $_SESSION["user"] = $username;
          $_SESSION["name"] = $name;
          return true;
        } else
          return false;
      }
    } catch (PDOException $e) {
      // Manejar errores de la base de datos según sea necesario
      echo "Error de la base de datos: " . $e->getMessage();
    }
    return false;
  }
  // consultar los roles
  private function obtener_roles($username) {
    try {
      $sql = "SELECT
                    *
                FROM
                    roles
                WHERE  
                    usuario = :username";
      $params = [':username' => $username];
      $stmt   = $this->con->query($sql, $params);
      $rol = '';
      while ($rows = $stmt->fetch())
        $rol = $rows['rol'];
      $stmt = null;
    } catch (PDOException $e) {
      // Manejar errores de la base de datos según sea necesario
      echo "Error de la base de datos: " . $e->getMessage();
    }
    return $rol;
  }
  private function obtener_usuario($username) {
    try {
      $sql = "SELECT
                    *
                FROM
                    users
                WHERE  
                    email = :username";
      $params = [':username' => $username];
      $stmt   = $this->con->query($sql, $params);
      $email = '';
      while ($rows = $stmt->fetch())
        $email = $rows['email'];
      $stmt = null;
      return $email;
    } catch (PDOException $e) {
      // Manejar errores de la base de datos según sea necesario
      echo "Error de la base de datos: " . $e->getMessage();
    }
  }
  // Redirigir según el rol
  private function redirectToDashboard($role) {
    echo json_encode($role);
  }
}
?>