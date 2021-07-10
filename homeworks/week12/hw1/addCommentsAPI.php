<?php
  require_once('conn.php');
  require_once('util.php');

  $sql = "INSERT INTO `fay_week12hw2_bulletin`(`name`, `content`) VALUES(?,?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ss', escape($_POST['name']), escape($_POST['content']));
  $result = $stmt->execute();
  if (!$result) {
    die($conn->error);
  }
  header("Location: index.php");
  exit();
?>