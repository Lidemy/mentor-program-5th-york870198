const fetch = require('node-fetch')

const menuDisplay = $('.block--menu--display')

window.onload = (() => {
  fetch(`http://${window.location.host}/menu/api`)
    .then((res) => res.json())
    .then((json) => {
      json.menus.forEach((e) => {
        renderMenuCard(e, json.session)
      })
    })
})

function renderMenuCard(menu) {
  const menuHTML = `
    <div class="card block--menu--card">
      <img class="card-img-top block--menu--img" src="${menu.picture}">
      <div class="card-body">
        <div class="card-title text-center">${menu.name} | $${menu.price}</div>
      </div>
    </div>`
  menuDisplay.append(menuHTML)
}
