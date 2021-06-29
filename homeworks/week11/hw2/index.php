<?php
  session_start();
  require_once('conn.php');
  require_once('util.php');
  $login_panel = 
    '<form method="POST" action="login.php">
      <div>帳號<input class="input--login" type="text" name="username"></div>
      <div>密碼<input class="input--login" type="password" name="password"></div>
      <div><button>登入</button></div>
    </form>';
  $config_panel = 
    '<form method="GET" action="index.php">
      <div><button>首頁</button></div>
    </form>
    <form method="GET" action="new_post.php">
      <div><button>發文</button></div>
    </form>
    <form method="POST" action="logout.php">
      <div><button>登出</button></div>
    </form>';
  $limit = (empty($_GET['show']))? 'LIMIT 5' : '';
?>

<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <link rel="stylesheet" type="text/css" href="style.css">
  <title>A blog, sort of.</title>
</head>
<body>
<div class="wrapper">
  <div class="banner">
    <h1>To post or not to post, that is the question.</h1>
  </div>
  <div class="main">
    <div class="main--left">
      <?php
        if (empty($_GET['article'])) {
          $sql = 'SELECT * FROM fay_blog_articles WHERE deleted_at IS NULL ORDER BY created_at DESC ' . $limit;
          $stmt = $conn->prepare($sql);
          $result = $stmt->execute();
          if (!$result) {
            die($conn->error . '<br><a href="index.php">回首頁</a>');
          }
          $result = $stmt->get_result();
          while($row = $result->fetch_assoc()) {
            print_article($row, $_SESSION);
          }
        } else {
          if(is_numeric($_GET['article'])) {
            $sql = 'SELECT * FROM fay_blog_articles WHERE deleted_at IS NULL AND id=?';
            $stmt = $conn->prepare($sql);
            $stmt->bind_param('d', $_GET['article']);
            $result = $stmt->execute();
            if (!$result) {
              die($conn->error . '<br><a href="index.php">回首頁</a>');
            }
            $result = $stmt->get_result();
            $row = $result->fetch_assoc();
            if($row){
              print_article($row, $_SESSION);
            } else {
              echo '文章不存在';
            }
          } else {
            $sql = 'SELECT * FROM fay_blog_articles WHERE deleted_at IS NULL AND category=? ORDER BY created_at DESC';
            $stmt = $conn->prepare($sql);
            $stmt->bind_param('s', $_GET['article']);
            $result = $stmt->execute();
            if (!$result) {
              die($conn->error . '<br><a href="index.php">回首頁</a>');
            }
            $result = $stmt->get_result();
            while($row = $result->fetch_assoc()) {
              print_article($row, $_SESSION);
            }
          }
          
        }
        
      ?>
    </div>
    <div class="main--right">
      <div class="main--right--panel">
        <div class="block--hint">
        <?php
          if(empty($_GET['errCode'])){
            echo '做點什麼？';
          } else {
            echo '<span class="block--hint--warning">';
            switch ($_GET['errCode']) {
              case 1:
                echo '請輸入帳密';
                break;
              case 2:
                echo '帳密不正確';
                break;
              case 3:
                echo '請先登入';
                break;
              case 4:
                echo '請輸入標題';
                break;
              default:
                // code...
                break;
            }
            echo '</span>';
          }
        ?>
        </div>
        <?php
          if(empty($_SESSION['username'])){
            echo $login_panel;
          } else {
            echo $config_panel;
          }
        ?>
      </div>
      <div class="main--right--category">
        <div>
          <h3>分類顯示：</h3>
        </div>
        <div class="block--category"><a href="?show=all">全部文章</a></div>
        <div class="block--category"><a href="?article=筆記">筆　　記</a></div>
        <div class="block--category"><a href="?article=遊戲">遊　　戲</a></div>
        <div class="block--category"><a href="?article=飲食">飲　　食</a></div>
        <div class="block--category"><a href="?article=影劇">影　　劇</a></div>
      </div>
    </div>
  </div>
  <div class="footer"></div>
</div>
</body>
</html>