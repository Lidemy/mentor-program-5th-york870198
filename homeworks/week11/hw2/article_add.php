<?php
  session_start();
  require_once('conn.php');

  if (empty($_SESSION['username'])) {
    header('Location: index.php?errCode=3');
    die();
  }

  $title = $_POST['title'];
  $content = $_POST['editorDemo'];
  $category = $_POST['category'];

  if (!empty($title)) {
    $sql = "insert into fay_blog_articles(title, content, category) values(?,?,?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('sss', $title, $content, $category);
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