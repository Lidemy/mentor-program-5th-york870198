<?php
  require_once('conn.php');
  require_once('util.php');
  session_start();
  $currentUsername = NULL;
  if (!empty($_SESSION['username'])) {
    $currentUsername = $_SESSION['username'];
  } else {
    header('Location: index.php?errCode=5');
    die();
  }

  $stmt = $conn->prepare("SELECT * FROM fay_users WHERE username=?;");
  $stmt->bind_param('s',$currentUsername);
  $result = $stmt->execute();
  if (!$result) {
    die($conn->error);
  }
  $result = $stmt->get_result();
  $row = $result->fetch_assoc();
  if($row['position'] != 'admin'){
    header('Location: index.php?errCode=8');
    die();
  }
?>

<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <link rel="stylesheet" type="text/css" href="style.css">
  <title><?php echo $currentUsername ?> 的管理者空間</title>
</head>
<body>
  <div class="wrapper">
    <div class="banner">
      <a href="index.php">回留言板</a>
    </div>
    <div class="main">
      <?php
        $stmt = $conn->prepare("SELECT * FROM fay_users ORDER BY id ASC;");
        $result = $stmt->execute();
        if (!$result) {
          die($conn->error);
        }
        $result = $stmt->get_result();
        while ($row = $result->fetch_assoc()) {          
          $sql = sprintf(
            "<div class='main--user'>
              <div class='main--user--info'>
                <div class='main--user--nickName'>%s (@%s)</div>
                <div class='main--user--position'>
                  <form method='POST' action='updateUser.php'>
                    <select name='position'>
                      <option %s>normal</option>
                      <option %s>banned</option>
                      <option %s>admin</option>
                    </select>
                    <input type='hidden' name = 'id' value='%d'>
                    <button>修改</button>
                  </form>
                
                </div>
                <div class='main--user--time'>%s</div>
              </div>
            </div>"
          ,escape($row['nickname']), escape($row['username']), ($row['position'] == 'normal')? 'selected' : '', ($row['position'] == 'banned')? 'selected' : '', ($row['position'] == 'admin')? 'selected' : '',$row['id'] , $row['created_at']);
          echo $sql;
        }
      ?>
    </div>
  </div>
</body>
</html>