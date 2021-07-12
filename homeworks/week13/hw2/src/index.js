import $ from 'jquery'
import { getComments } from './api.js'
import { getTemplate } from './template.js'

let siteKey = ''
let apiUrl = ''
let containerSelector = ''

export default function init(options) {
  siteKey = options.siteKey
  apiUrl = options.apiUrl
  containerSelector = $(options.containerSelector)
  const formTemplate = getTemplate(siteKey)
  containerSelector.append(formTemplate)
  getComments(apiUrl, siteKey, 5, $(`.main--${siteKey} .block--comment`).length, printComments)
  console.log(siteKey)
  $(`.more--${siteKey}`).click(() => {
    getComments(apiUrl, siteKey, 5, $(`.main--${siteKey} .block--comment`).length, printComments)
  })
}

function hideMoreButton(siteKey) {
  $(`.more--${siteKey}`).hide()
}

function showMoreButton(siteKey) {
  $(`.more--${siteKey}`).show()
}

function printComments(data) {
  const comments = JSON.parse(data)
  comments.forEach((comment, index) => {
    $(`.main--${comment.site_key}`).append(
      `<div class="block--comment col-12 col-lg-8 bg-info p-3">
        <div class="block--comment--info border p-1 d-flex justify-content-between">
          <div class="block--comment--info--name p-1">${comment.name}</div>
          <div class="block--comment--info--time p-1">${comment.time}</div>
        </div>
        <div class="block--comment--content border p-4">${comment.content}</div>
      </div>`
    )
    if (index < 4) {
      hideMoreButton(comment.site_key)
    } else {
      showMoreButton(comment.site_key)
    }
  })
}
