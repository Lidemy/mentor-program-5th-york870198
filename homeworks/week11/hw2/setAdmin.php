<?php
  session_start();
  require_once('conn.php');
  $sql = 'insert into fay_blog_admins(username, password) values (?,?)';
  $stmt = $conn->prepare($sql);
  $username = 'fay';
  $password = password_hash('123', PASSWORD_DEFAULT);
  $stmt->bind_param('ss', $username, $password);
  $stmt->execute();
?>