const form = document.querySelector('form')
const requiredInputs = document.querySelectorAll('input.requiring')
const requiredRadios = [...document.querySelectorAll('input[type=radio]')]

form.addEventListener('submit', (e) => {
  let ok = true
  requiredInputs.forEach((el) => {
    const targetDiv = `#${el.id}+div`
    if (el.value === '') {
      ok = false
      document.querySelector(targetDiv).classList.add('alerting')
    } else {
      document.querySelector(targetDiv).classList.remove('alerting')
    }
  })
  const result = requiredRadios.reduce((a, b) => (a.checked ? a : b))
  if (!result.checked) {
    ok = false
    document.querySelector('#radioAlert').classList.add('alerting')
  } else {
    document.querySelector('#radioAlert').classList.remove('alerting')
  }

  if (ok) {
    alert(`暱稱：${requiredInputs[0].value}\n電子郵件：${requiredInputs[1].value}\n電話號碼：${requiredInputs[2].value}\n報名類型：${result.dataset.description}\n如何得知活動：${requiredInputs[3].value}`)
  } else {
    e.preventDefault()
  }
})
