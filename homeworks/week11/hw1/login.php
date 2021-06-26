<?php
  session_start();
  require_once('conn.php');
  if (empty($_POST['username']) || empty($_POST['password'])) {
    header('Location: index.php?errCode=3');
    die();
  }
  function randomString($n = 10) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charLength = strlen($characters);
    $output = '';
    for ($i=0; $i<$charLength; $i++) {
      $output .= $characters[rand(0, $charLength - 1)];
    }
    return $output;
  }

  $username = $_POST['username'];
  $password = $_POST['password'];
  $sql = "SELECT `username`, `password`, `position` FROM `fay_users` WHERE username=?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("s", $username);
  $result = $stmt->execute();
  if (!$result) {
    die($conn->error . '<br><a href="index.php">回首頁</a>');
  }
  $result = $stmt->get_result();
  $row = $result->fetch_assoc();
  if(password_verify($password, $row['password'])) {
    $_SESSION['username'] = $row['username'];
    $_SESSION['position'] = $row['position'];
  } else {
    header('Location: index.php?errCode=4');
    die();
  }


  header("Location: index.php");
?>