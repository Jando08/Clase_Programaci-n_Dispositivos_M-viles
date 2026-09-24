<?php

function cargarEnv(string $ruta): void {
    if (!is_file($ruta)) {
        return;
    }
    foreach (file($ruta, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $linea) {
        $linea = trim($linea);
        if ($linea === "" || str_starts_with($linea, "#") || !str_contains($linea, "=")) {
            continue;
        }
        [$clave, $valor] = array_map("trim", explode("=", $linea, 2));
        $clave = trim($clave, "\"'");
        $valor = trim($valor, "\"'");
        $_ENV[$clave] = $valor;
        putenv("{$clave}={$valor}");
    }
}

function env(string $clave, string $defecto = ""): string {
    $valor = getenv($clave);
    if ($valor === false || $valor === "") {
        $valor = $_ENV[$clave] ?? "";
    }
    return $valor === "" ? $defecto : $valor;
}

cargarEnv(__DIR__ . "/.env");

function desencriptarPassword(string $token): array {
    $clave = base64_decode(env("ENCRYPTION_KEY"), true);
    if ($clave === false || strlen($clave) !== 32) {
        return [false, "Clave de encriptación inválida"];
    }
    $raw = base64_decode($token, true);
    if ($raw === false || strlen($raw) < 29) {
        return [false, "plain"];
    }
    $iv  = substr($raw, 0, 12);
    $tag = substr($raw, 12, 16);
    $ct  = substr($raw, 28);
    $claro = openssl_decrypt($ct, "aes-256-gcm", $clave, OPENSSL_RAW_DATA, $iv, $tag);
    if ($claro === false) {
        return [false, "bad_token"];
    }
    return [true, $claro];
}

header("Content-Type: application/json; charset=utf-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode([
        "success" => false,
        "message" => "Método no permitido"
    ]);
    exit;
}

$rawInput = file_get_contents("php://input");
$input = json_decode($rawInput, true);

if (!is_array($input)) {
    $input = $_POST;
}

$usuario = trim((string)($input["usuario"] ?? $input["email"] ?? ""));
$passwordOriginal = (string)($input["password"] ?? "");

[$desencriptada, $password] = desencriptarPassword($passwordOriginal);
if (!$desencriptada && $password === "bad_token") {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Contraseña encriptada no válida"
    ]);
    exit;
}
if ($password === "plain") {
    $password = $passwordOriginal;
}

if ($usuario === "" || $password === "") {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Usuario y contraseña requeridos"
    ]);
    exit;
}

$host = env("SUPABASE_HOST");
$port = env("SUPABASE_PORT", "5432");
$db   = env("SUPABASE_DB", "postgres");
$user = env("SUPABASE_USER");
$pass = env("SUPABASE_PASS");

try {
    $pdo = new PDO(
        "pgsql:host={$host};port={$port};dbname={$db}",
        $user, $pass,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false
        ]
    );
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Error de conexión a Supabase"
    ]);
    exit;
}

try {
    $stmt = $pdo->prepare(
        "SELECT id, correo, password, estatus FROM usuarios WHERE correo = :correo LIMIT 1"
    );

    $stmt->execute([":correo" => $usuario]);

    $usuarioDB = $stmt->fetch();

    if (!$usuarioDB || !password_verify($password, $usuarioDB["password"])) {
        http_response_code(401);
        echo json_encode([
            "success" => false,
            "message" => "Credenciales incorrectas"
        ]);
        exit;
    }

    unset($usuarioDB["password"]);

    echo json_encode([
        "success" => true,
        "message" => "Login correcto",
        "user" => $usuarioDB
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Error al procesar el login"
    ]);
    exit;
}

/*
Credenciales y clave de encriptación en .env (NO subir a git):
  SUPABASE_HOST / SUPABASE_PORT / SUPABASE_DB / SUPABASE_USER / SUPABASE_PASS
  ENCRYPTION_KEY = openssl rand -base64 32

La contraseña llega encriptada con AES-256-GCM desde el frontend:
  token = base64( iv(12B) || tag(16B) || ciphertext )
  iv de 12 bytes aleatorios por petición.

Tabla en Supabase (PostgreSQL):
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    correo VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    estatus BOOLEAN DEFAULT true
);

Para guardar contraseña segura:
$passwordHash = password_hash($password, PASSWORD_BCRYPT);
INSERT INTO usuarios (correo, password, estatus) VALUES (:correo, :password, true);
*/
