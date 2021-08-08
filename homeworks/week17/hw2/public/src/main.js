const fetch = require('node-fetch')

const pic = $('.pic')
const name = $('.name')
const description = $('.description')

window.onload = (function() {
  $('.draw').click(drawLottery)
})

function drawLottery() {
  fetch(`https://${window.location.host}/api/draw`)
    .then((res) => res.json())
    .then((json) => {
      pic.attr('src', json.pictureAddress)
      name.text(json.name)
      description.text(json.description)
    })
}
