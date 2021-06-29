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
  $stmt = $conn->prepare("SELECT * FROM fay_comments WHERE uid=?");
  $stmt->bind_param("d", $_GET['id']);
  $result = $stmt->execute();
  if (!$result) {
    die($conn->error . '<br><a href="index.php">回首頁</a>');
  }
  $result = $stmt->get_result();
  $row = $result->fetch_assoc();
  if (empty($row['content'])) {
    header('Location: index.php?errCode=7');
    die();
  }
?>

<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <link rel="stylesheet" type="text/css" href="style.css">
  <title>修改留言</title>
</head>
<body>
  <div class="wrapper">
    <div class="banner">
      修改留言
    </div>
    <div class="main">
      <div class="input">
      <form method="POST" action="updateCommentHandler.php">
        <input type="text" name="nickname" class="input--content" value=<?php echo escape(getNickname($currentUsername))?> readonly>
        <input type="hidden" name="uid" value=<?php echo $row['uid'] ?>>
        <textarea name = 'content' class="input--content" rows="3"><?php echo escape($row['content'])?></textarea><br>
        <button>送出</button>
      </form>
    </div>
    </div>
  </div>
</body>
</html>