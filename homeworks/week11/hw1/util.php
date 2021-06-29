<?php

  function escape($str) {
    return htmlspecialchars($str, ENT_QUOTES);
  }

  function getNickname($user) {
    global $conn;
    $sql = "SELECT `nickname` FROM `fay_users` WHERE username = '" . $user . "'";
    $res = $conn->query($sql);
    $nickname = $res->fetch_assoc();
    return (!empty($nickname))? $nickname['nickname'] : $user;
  }
?>