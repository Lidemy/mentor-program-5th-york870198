<?php
  session_start();
  require_once('conn.php');
  if($_SESSION['position'] != 'admin'){
    header('Location: index.php?errCode=8');
    die();
  }
  
  $id = $_POST['id'];
  $position = $_POST['position'];
  $sql = sprintf("UPDATE fay_users SET position='%s' WHERE id=%d", $position, $id);
  $result = $conn->query($sql);
  if (!$result) {
    die($conn->error . '<br><a href="index.php">回首頁</a>');
  }

  echo "更新使用者成功";

  header("Location: adminInterface.php");
?>