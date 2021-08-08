const fetch = require('node-fetch')

const pool = $('.pool')

window.onload = (function() {
  fetch(`https://${window.location.host}/api/pool`)
    .then((res) => res.json())
    .then((json) => {
      json.forEach((e) => {
        renderGoods(e)
      })
    })
})

function renderGoods(good) {
  const str =
      `<form action="control?_method=PUT" method="POST">
        <div class="row border border-info">
          <input type="hidden" name="id" value="${good.id}">
          <div class="col-2"><input class="form-control" type="text" name="name" value="${good.name}"></div>
          <div class="col-3"><input class="form-control" type="url" name="pictureAddress" value="${good.pictureAddress}"> </div>
          <div class="col-4"><input class="form-control" type="text" name="description" value="${good.description}"></div>
          <div class="col-1"><input class="form-control" type="number" name="rate" value="${good.rate}"></div>
          <div class="col-1"><button>修改</button></div>
        </form>
          <div class="col-1">
            <form action="control?_method=DELETE" method="POST">
              <input type="hidden" name="id" value="${good.id}">
              <button>刪除</button>
            </form>
          </div>
        </div>`
  pool.append(str)
}
