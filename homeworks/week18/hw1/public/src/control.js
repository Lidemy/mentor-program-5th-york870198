const fetch = require('node-fetch')

const menuContainer = $('.menu--container')
const lotteryContainer = $('.lottery--container')
const faqContainer = $('.faq--container')

window.onload = (() => {
  fetch(`http://${window.location.host}/menu/api`)
    .then((res) => res.json())
    .then((json) => {
      json.menus.forEach((e) => {
        renderMenu(e, json.session)
      })
    })
  fetch(`http://${window.location.host}/lottery/api`)
    .then((res) => res.json())
    .then((json) => {
      json.lotteries.forEach((e) => {
        renderLottery(e, json.session)
      })
    })
  fetch(`http://${window.location.host}/faq/api`)
    .then((res) => res.json())
    .then((json) => {
      json.faqs.forEach((e) => {
        renderFaq(e, json.session)
      })
    })
})

function renderMenu(menu) {
  const menuHTML = `
    <div class="p-0">
      <form class="row mt-1" action="/menu?_method=PUT" method="POST">
        <input type="hidden" name="id" value="${menu.id}">
        <div class="col-2 border border-info text-center p-0">
          <input class="form-control" type="text" name="name" value="${menu.name}"></input>
        </div>
        <div class="col-2 border border-info text-center p-0">
          <input class="form-control" type="integer" name="price" value="${menu.price}"></input>
        </div>
        <div class="col-6 border border-info text-center p-0">
          <input class="form-control" type="url" name="picture" value="${menu.picture}"></input>
        </div>
        <div class="col-1 border border-info text-center p-1">
          <input type="submit" name="action" value="update"></input>
        </div>
        <div class="col-1 border border-info text-center p-1">
          <input type="submit" name="action" value="delete"></input>
        </div>
      </form>
    </div>`
  menuContainer.append(menuHTML)
}

function renderLottery(lottery) {
  const lotteryHTML = `
    <div class="p-0">
      <form class="row mt-1" action="/lottery?_method=PUT" method="POST">
        <input type="hidden" name="id" value="${lottery.id}">
        <div class="col-2 border border-info text-center p-0">
          <input class="form-control" type="text" name="name" value="${lottery.name}"></input>
        </div>
        <div class="col-2 border border-info text-center p-0">
          <input class="form-control" type="integer" name="rate" value="${lottery.rate}"></input>
        </div>
        <div class="col-6 border border-info text-center p-0">
          <input class="form-control" type="url" name="img" value="${lottery.img}"></input>
        </div>
        <div class="col-1 border border-info text-center p-1">
          <input type="submit" name="action" value="update"></input>
        </div>
        <div class="col-1 border border-info text-center p-1">
          <input type="submit" name="action" value="delete"></input>
        </div>
      </form>
    </div>`
  lotteryContainer.append(lotteryHTML)
}

function renderFaq(faq) {
  const faqHTML = `
    <div class="p-0">
      <form class="row mt-1" action="/faq?_method=PUT" method="POST">
        <input type="hidden" name="id" value="${faq.id}">
        <div class="col-4 border border-info text-center p-0">
          <input class="form-control" type="text" name="title" value="${faq.title}"></input>
        </div>
        <div class="col-6 border border-info text-center p-0">
          <input class="form-control" type="url" name="description" value="${faq.description}"></input>
        </div>
        <div class="col-1 border border-info text-center p-1">
          <input type="submit" name="action" value="update"></input>
        </div>
        <div class="col-1 border border-info text-center p-1">
          <input type="submit" name="action" value="delete"></input>
        </div>
      </form>
    </div>`
  faqContainer.append(faqHTML)
}
