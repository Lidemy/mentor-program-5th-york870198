<?php
  session_start();
  require_once('conn.php');
  if (empty($_SESSION['username'])) {
    header('Location: index.php?errCode=3');
    die();
  }
?>

<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <link rel="stylesheet" type="text/css" href="style.css">
  <script src="https://cdn.ckeditor.com/4.16.1/standard/ckeditor.js"></script>
  <title>A blog, sort of.</title>
</head>
<body>
<div class="wrapper">
  <div class="banner">
    <h1>To post or not to post, that is the question.</h1>
  </div>
  <div class="main">
    <form method="POST" action="article_add.php">
      <input type="text" name="title" placeholder="標題">
      <select name="category">
        <option>筆記</option>
        <option>遊戲</option>
        <option>飲食</option>
        <option>影劇</option>
      </select>
      <textarea name="editorDemo"></textarea>
      <button>送出</button>
    </form>
    <script type="text/javascript">CKEDITOR.replace('editorDemo');</script>
  </div>
  <div class="footer"></div>
</div>
</body>

</html>