let commentsLoaded = 0

$(document).ready(() => {
  getComments(5, printComments)
  $('#more').click(() => {
    getComments(5, printComments)
  })
})

function getComments(limit, callback) {
  $.ajax({
    method: 'GET',
    url: `getCommentsAPI.php?limit=${limit}&offset=${commentsLoaded}`
  })
    .done(callback)
  commentsLoaded += limit
  checkCommentsAll(hideMoreButton)
}

function checkCommentsAll(callback) {
  $.ajax({
    method: 'GET',
    url: 'getCommentsAPI.php'
  })
    .done(callback)
}

function hideMoreButton(data) {
  const result = JSON.parse(data).length
  if (commentsLoaded >= result) {
    $('#more').hide()
  }
}

function printComments(data) {
  const comments = JSON.parse(data)
  comments.forEach((comment) => {
    $('.main').append(
      `<div class="block--comment col-12 col-lg-8 bg-info p-3">
        <div class="block--comment--info border p-1 d-flex justify-content-between">
          <div class="block--comment--info--name p-1">${comment.name}</div>
          <div class="block--comment--info--time p-1">${comment.time}</div>
        </div>
        <div class="block--comment--content border p-4">${comment.content}</div>
      </div>`
    )
  })
}
