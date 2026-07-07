<?php
include '../config/database.php';
$full_name = $_POST['username'];
$email = $_POST['email'];
$password = $_POST['password'];

// Check if email already exists
$check_email = "SELECT * FROM users WHERE email='$email'";
$result = mysqli_query($conn, $check_email);
if(mysqli_num_rows($result) > 0){
    echo "Email already exists";
} else {
    $insert = "INSERT INTO users (full_name, email, password, age, weight, height)
               VALUES ('$full_name', '$email', '$password', 0, 0.00, 0.00)";
    if(mysqli_query($conn, $insert)){
        echo "Registration successful";
    } else {
        echo "Error: " . mysqli_error($conn);
    }
}
?>