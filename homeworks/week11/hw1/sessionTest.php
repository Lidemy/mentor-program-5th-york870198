<?php
  session_start(); //啟動session功能，這會在伺服器創造session的tmp檔案
  $_SESSION['user'] = 'marine'; //直接設定內容，這會寫入上述檔案
?>

<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title></title>
</head>
<body>
<?php
  echo  $_SESSION['user']; //可以直接用 $_SESSION 呼叫存入的值
  session_destroy(); //因為會在伺服器端產生檔案，所以要記得找時機把檔案清除
?>
</body>
</html>