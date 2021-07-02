<?php
  require_once('conn.php');
  if(empty($_GET['limit'])) {
    $sql = "SELECT * FROM `fay_week12hw2_bulletin` ORDER BY id ASC";
    $stmt = $conn->prepare($sql);
  } else {
    if(!is_numeric($_GET['limit']) || !is_numeric($_GET['offset'])) {
      echo 'wrong input';
      die();
    }
    $sql = "SELECT * FROM `fay_week12hw2_bulletin` ORDER BY id DESC LIMIT ? OFFSET ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('dd', $_GET['limit'], $_GET['offset']);
  }
  $result = $stmt->execute();
  $result = $stmt->get_result();
  if (!$result) {
    die($conn->error);
  }

  $arr = array();
  while ($row = $result->fetch_assoc()) {
    array_push($arr,$row);
  }

  echo json_encode($arr,JSON_UNESCAPED_UNICODE);
  exit();
?>