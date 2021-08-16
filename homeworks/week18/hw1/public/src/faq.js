const fetch = require('node-fetch')

const faqDisplay = $('.questions')

const questions = document.querySelector('.questions')
questions.addEventListener('click', (e) => {
  if (e.target.classList.contains('question--text')) {
    e.target.classList.toggle('showed')
  }
})

window.onload = (() => {
  fetch(`http://${window.location.host}/faq/api`)
    .then((res) => res.json())
    .then((json) => {
      json.faqs.forEach((e) => {
        renderFaqCard(e, json.session)
      })
    })
})

function renderFaqCard(faq) {
  const faqHTML = `
    <div class="question">
      <div class="question--title">Q:</div>
      <div class="question--text">
        ${faq.title}
        <div class="answer">${faq.description}</div>
      </div>
    </div>`
  faqDisplay.append(faqHTML)
}
