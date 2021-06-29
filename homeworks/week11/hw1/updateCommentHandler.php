<?php
  session_start();
  require_once('util.php');
  require_once('conn.php');
  $currentUsername = NULL;
  if (!empty($_SESSION['username'])) {
    $currentUsername = $_SESSION['username'];
  } else {
    header('Location: index.php?errCode=5');
    die();
  }

  $uid = $_POST['uid'];
  $content = $_POST['content'];
  $sql = "UPDATE fay_comments SET content=? WHERE uid=?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('sd', $content, $uid);
  $result = $stmt->execute();
  if (!$result) {
    die($conn->error . '<br><a href="index.php">回首頁</a>');
  }

  header("Location: index.php");
?>