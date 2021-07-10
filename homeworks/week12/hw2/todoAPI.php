<?php
  require_once('conn.php');
  if($_SERVER['REQUEST_METHOD'] === 'GET'){
    $sql = 'SELECT * FROM `fay_todo_saved` WHERE id=?';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $_GET['id']);
    $result = $stmt->execute();
    if (!$result) {
      die($conn->error);
    }
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    echo $row['list'];
    exit();

  } else if($_SERVER['REQUEST_METHOD'] === 'POST') {
    $sql = 'INSERT INTO `fay_todo_saved`(`list`) VALUES (?)';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $_POST['data']);
    $result = $stmt->execute();
    if (!$result) {
      die($conn->error);
    }
    echo mysqli_insert_id($conn);
    exit();
    
  }
?>