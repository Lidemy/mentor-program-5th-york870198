<?php
  session_start();
  require_once('conn.php');
  if(empty($_SESSION['username'])){
    header('Location: index.php?errCode=3');
    die();
  }

  $id = $_POST['id'];

  $stmt = $conn->prepare("DELETE FROM fay_blog_articles WHERE id=?;");
  $stmt->bind_param('d', $id);
  $result = $stmt->execute();
  if (!$result) {
    die($conn->error . '<br><a href="index.php">回首頁</a>');
  }

  header("Location: index.php");

?>