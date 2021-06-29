<?php
  session_start();
  require_once('conn.php');

  if (empty($_SESSION['username'])) {
    header('Location: index.php?errCode=3');
    die();
  }

  $id = $_POST['id'];
  $title = $_POST['title'];
  $content = $_POST['editorDemo'];
  $category = $_POST['category'];

  if (!empty($title)) {
    $sql = "UPDATE fay_blog_articles SET title=?, content=?, category=? WHERE id=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('sssd', $title, $content, $category, $id);
    $result = $stmt->execute();
    if (!$result) {
      die($conn->error . '<br><a href="index.php">回首頁</a>');
    }
  } else {
    header('Location: index.php?errCode=4');
    die();
  }

  header("Location: index.php");
?>