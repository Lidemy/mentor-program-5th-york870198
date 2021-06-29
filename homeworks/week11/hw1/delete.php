<?php
  require_once('conn.php');

  $id = $_GET['id'];
  $sql = sprintf("delete from fay_users where id=%s", $id);
  $result = $conn->query($sql);
  if (!$result) {
    die($conn->error . '<br><a href="index.php">回首頁</a>');
  }
  if($conn->affected_rows >= 1) {
    echo "刪除使用者成功";
  } else {
    echo "查無資料";
  }

  header("Location: index.php");
?>