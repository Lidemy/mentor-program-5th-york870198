<?php
  session_start();
  require_once('conn.php');
  if (empty($_POST['username']) || empty($_POST['password'])) {
    header('Location: index.php?errCode=1');
    die();
  }

  $username = $_POST['username'];
  $password = $_POST['password'];
  $sql = "SELECT `username`, `password`FROM `fay_blog_admins` WHERE username=?";
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
  } else {
    header('Location: index.php?errCode=2');
    die();
  }

  header("Location: index.php");
?>