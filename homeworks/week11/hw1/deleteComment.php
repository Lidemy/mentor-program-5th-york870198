<?php
  session_start();
  require_once('conn.php');
  if(empty($_SESSION['username'])){
    header('Location: index.php?errCode=8');
    die();
  }

  $uid = $_POST['uid'];

  $stmt = $conn->prepare("SELECT * FROM fay_comments left JOIN fay_users ON fay_users.username = fay_comments.user WHERE uid=?;");
  $stmt->bind_param('d', $uid);
  $result = $stmt->execute();
  $result = $stmt->get_result();
  $row = $result->fetch_assoc();

  if($_SESSION['position'] != 'admin' && $row['username'] != $_SESSION['username']){
    header('Location: index.php?errCode=8');
    die();
  }

  $sql = "delete from fay_comments where uid=?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('d',$uid);
  $result = $stmt->execute();
  if (!$result) {
    die($conn->error . '<br><a href="index.php">回首頁</a>');
  }

  header("Location: index.php");

?>