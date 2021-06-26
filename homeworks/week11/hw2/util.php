<?php

  function escape($str) {
    return htmlspecialchars($str, ENT_QUOTES);
  }

  function print_article($row, $identity) {
    $author_str = (empty($identity['username']))? '' : sprintf('
      <div class="block--post--author">
        <div>
          <form method="POST" action="update_post.php">
            <input type="hidden" name="id" value="%s">
            <input type="hidden" name="title" value="%s">
            <input type="hidden" name="content" value="%s">
            <button>編輯</button>
          </form>
        </div>
        <div>
          <form method="POST" action="article_delete.php">
            <input type="hidden" name="id" value="%s">
            <button>刪除</button>
          </form>
        </div>
      </div>', 
      $row['id'], $row['title'], $row['content'], $row['id']);
    $str = sprintf(
      '<div class="block--post">
        <div class="block--post--title"><a href="?article=%d">%s</a></div>
        <div class="block--post--content">%s</div>
        %s
        <div class="block--post--info">%s, %s</div>
      </div>', $row['id'], escape($row['title']), $row['content'], $author_str, $row['category'], $row['created_at']);
    echo $str;
  }

?>