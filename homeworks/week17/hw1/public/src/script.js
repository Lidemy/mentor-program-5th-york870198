const fetch = require('node-fetch')

const mainLeft = $('.main--left')

let id, category // 從ejs傳入

window.onload = (function() {
  fetch(`https://${window.location.host}/api/article?id=${id}&category=${category}`)
    .then((res) => res.json())
    .then((json) => {
      json.articles.forEach((e) => {
        renderArticle(e, json.session)
      })
    })
})

function renderArticle(article, username) {
  const authorStr = (!username)
    ? ''
    : `<div class="block--post--author">
      <div>
        <form method="POST" action="article/update">
          <input type="hidden" name="id" value="${article.id}">
          <input type="hidden" name="title" value="${article.title}">
          <input type="hidden" name="content" value="${article.content}">
          <button>編輯</button>
        </form>
      </div>
      <div>
        <form method="POST" action="/article?_method=DELETE">
          <input type="hidden" name="id" value="${article.id}">
          <button>刪除</button>
        </form>
      </div>
    </div>`
  const str =
    `<div class="block--post">
      <div class="block--post--title"><a href="/article/${article.id}">${article.title}</a></div>
      <div class="block--post--content">${article.content}</div>
      ${authorStr}
      <div class="block--post--info">${article.category}, ${article.createdAt}</div>
    </div>`
  mainLeft.append(str)
}
