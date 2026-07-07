<?php
include '../config/database.php';
$email = $_POST['username']; // form field name is still "username" but we use it as email
$password = $_POST['password'];

$sql = "SELECT * FROM users WHERE email='$email' AND password='$password'";
$result = mysqli_query($conn, $sql);
if (mysqli_num_rows($result) > 0) {
    echo "Login successful";
} else {
    echo "Invalid email or password";
}
?>   