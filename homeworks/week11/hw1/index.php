<?php
  session_start();
  $currentUsername = NULL;
  $currentUserPosition = NULL;
  require_once('conn.php');
  require_once('util.php');
  if (!empty($_SESSION['username'])) {
    $currentUsername = $_SESSION['username'];
    $currentUserPosition = $_SESSION['position'];
  }

  $page = (empty($_GET['page']))? 0: ($_GET['page']-1);
  $items_per_page = 10;
?>


<html>
<head>
  <meta charset="utf-8">
  <title></title>
  <link rel="stylesheet" type="text/css" href="style.css">
  <script type="text/javascript" src="indexScript.js"></script>
</head>
<body>
  <div class="wrapper">
    <div class="banner">
      <div class="banner--logo">Comments</div>
      <div>
        <?php
          if(!empty($_GET['errCode'])) {
            if($_GET['errCode'] === '1') {
              echo '<div class="error">資料不齊</div>';
            } elseif ($_GET['errCode'] === '2') {
              echo '<div class="error">使用者名稱已被註冊</div>';
            } elseif ($_GET['errCode'] === '3') {
              echo '<div class="error">請輸入帳號密碼</div>';
            } elseif ($_GET['errCode'] === '4') {
              echo '<div class="error">密碼錯誤</div>';
            } elseif ($_GET['errCode'] === '5') {
              echo '<div class="error">請先登入</div>';
            } elseif ($_GET['errCode'] === '6') {
              echo '<div class="error">暱稱不可為空</div>';
            } elseif ($_GET['errCode'] === '7') {
              echo '<div class="error">留言不存在</div>';
            } elseif ($_GET['errCode'] === '8') {
              echo '<div class="error">需要合法權限</div>';
            }
          } else if($currentUsername){
            echo (escape($currentUsername));
          }
        ?>
      </div>
      <div>
        <?php
          if($currentUsername) {
            if($_SESSION['position'] == 'admin'){
              echo '<form method="get" action="adminInterface.php"><button class="button--logout">管理</button></form>';  
            }
            echo '<form method="POST" action="logout.php"><button class="button--logout">登出</button></form>';
          } else {
            echo '<button class="button--signup">註冊</button><button class="button--login">登入</button>';
          }
        ?>
        
      </div>
    </div>
    <div class="input">
      <form method="POST" action="addComment.php">
        <input type="text" name="nickname" class="input--content" 
          <?php 
            if(empty($currentUsername)){
              echo 'readonly placeholder="請先登入"';
            } else {
              echo 'placeholder="修改暱稱"';
            }
          ?>
          value=<?php echo escape(getNickname($currentUsername))?> >
        <textarea name = 'content' class="input--content" rows="3" 
        <?php 
          if(empty($currentUsername))
            {echo 'readonly placeholder="請先登入"';
          } else if ($currentUserPosition == 'banned') {
            echo 'readonly placeholder="您已被停權"';
          }else {
            echo 'placeholder="若送出留言為空白則只會修改暱稱"';
          }
        ?>></textarea><br>
        <button>送出</button>
      </form>
    </div>
    <div class="main">
      <?php
        $stmt = $conn->prepare("SELECT * FROM fay_comments left JOIN fay_users ON fay_users.username = fay_comments.user ORDER BY fay_comments.time DESC LIMIT 10 OFFSET ?;");
        $offset_num = $page * $items_per_page;
        $stmt->bind_param('d', $offset_num);
        $result = $stmt->execute();
        if (!$result) {
          die($conn->error);
        }
        $result = $stmt->get_result();

        while ($row = $result->fetch_assoc()) {
          $delete_str = '';
          if ($row['user'] === $currentUsername || $currentUserPosition == 'admin') {
            $delete_str = sprintf(
              '<a href="updateComment.php?id=%d">編輯</a><div><form method="POST" action="deleteComment.php"><input type="hidden" name="uid" value="%d"><button>刪除</button></form></div>', $row['uid'], $row['uid']
            );
          }
          $sql = sprintf(
            "<div class='main--comment'>
              <div class='main--comment--info'>
                <div class='main--comment--nickName'>%s (@%s)</div>
                <div class='main--comment--time'>%s</div>
                %s
              </div>
              <div class='main--comment--content'>%s</div>
            </div>"
          ,escape($row['nickname']), escape($row['username']), $row['time'], $delete_str, escape($row['content']));
          echo $sql;
        }
      ?>
    </div>
    <div class="footer">
      <?php
        $stmt = $conn->prepare('select count(uid) as count from fay_comments');
        $result = $stmt->execute();
        $result = $stmt->get_result();
        $row = $result->fetch_assoc();
        $page_count = ceil(($row['count'] / $items_per_page));

        echo '<a href="index.php?page=1" class="anchor_page">[首頁]</a>';
        for($i = max(min($page-1,$page_count-4), 1); $i<=min(max($page+3, 5),$page_count); $i++){
          $sql = sprintf('<a href="index.php?page=%d" class="anchor_page">[%d]</a>', $i, $i);
          echo ($i == $page+1)? sprintf('<span class="anchor_page">[%d]</span>',$i) : $sql;
        }
        echo sprintf('<a href="index.php?page=%d" class="anchor_page">[末頁]</a>', $page_count);
      ?>
    </div>
  </div>
  <div class="hidden board--signup mask">
    <form method="POST" action="signup.php">
      <div class="card--signup">
        <div>註冊</div>
        <div>
          <input type="text" name="username" placeholder="使用者名稱">
        </div>
        <div>
          <input type="text" name="nickname" placeholder="暱稱">
        </div>
        <div>
          <input type="password" name="password" placeholder="密碼">
        </div>
        <button>送出</button>
      </div>
    </form>
  </div>
  <div class="hidden board--login mask">
    <form method="POST" action="login.php">
      <div class="card--signup">
        <div>登入</div>
        <div>
          <input type="text" name="username" placeholder="使用者名稱">
        </div>
        <div>
          <input type="password" name="password" placeholder="密碼">
        </div>
        <button>登入</button>
      </div>
    </form>
  </div>
</body>
</html>