<?php
$host = "localhost";
$user = "root";
$password = "123456";
$db = "login";

$conn = new mysqli($host, $user, $password, $db);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if (isset($_POST["submit"])) {
    $uname = $_POST['username'];
    $password = $_POST['password'];

    $sql = "SELECT * FROM loginform WHERE User = '".$uname."' AND Pass = '".$password."' LIMIT 1";
    $result = $conn->query($sql);

    if ($result->num_rows == 1) {
        echo "You have successfully logged in.";
        exit();
    } else {
        echo "You have entered an incorrect password.";
    }
}

$conn->close();
?>
