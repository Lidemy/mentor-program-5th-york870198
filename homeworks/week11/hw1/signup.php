<?php
  require_once('conn.php');
  if (empty($_POST['username']) || empty($_POST['password']) || empty($_POST['nickname'])) {
    header('Location: index.php?errCode=1');
    die();
  }

  $username = $_POST['username'];
  if($_POST['nickname'] !== '') {
    $nickname = $_POST['nickname'];
  } else {
    $nickname = $_POST['username'];
  }
  $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
  $sql = "insert into fay_users(username, password, nickname) values(?, ?, ?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('sss', $username, $password, $nickname);
  $result = $stmt->execute();
  if (!$result) {
    if ($conn->errno === 1062){
      header('Location: index.php?errCode=2');
      die();
    } else {
      die($conn->error . '<br>' . $conn->errno);
    }
  }

  echo "新增使用者成功";

  header("Location: index.php");
?>