<?php
  session_start();
  require_once('conn.php');
  if (empty($_POST['nickname'])) {
    header('Location: index.php?errCode=6');
    die();
  }

  if (!empty($_SESSION['username'])) {
    $currentUsername = $_SESSION['username'];
  } else {
    header('Location: index.php?errCode=5');
    die();
  }

  $content = $_POST['content'];
  $nickname = $_POST['nickname'];
  $username = $_SESSION['username'];

  $sql2 = "UPDATE `fay_users` SET `nickname`=? WHERE `username`=?";
  $stmt2 = $conn->prepare($sql2);
  $stmt2->bind_param('ss', $nickname, $username);
  $result = $stmt2->execute();
  if (!$result) {
    die($conn->error . '<br><a href="index.php">回首頁</a>');
  }

  if (!empty($_POST['content'])) {
    if($_SESSION['position'] == 'banned') {
      header('Location: index.php?errCode=8');
      die();
    }
    
    $sql = "insert into fay_comments(user, content) values(?,?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ss', $username, $content);
    $result = $stmt->execute();
    if (!$result) {
      die($conn->error . '<br><a href="index.php">回首頁</a>');
    }
  }

  echo "新增留言成功";

  header("Location: index.php");
?>