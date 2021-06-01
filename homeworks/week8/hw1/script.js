window.onload = (function() {
  const background = document.querySelector('.main')
  const gachaWindow = document.querySelector('.gachaWindow')
  const prizeWindow = document.querySelector('.prizeWindow')
  const prizeText = document.querySelector('.prizeText')

  window.addEventListener('click', (e) => {
    if (e.target.classList.contains('gachaButton')) {
      doGacha(e)
    }
  })

  const doGacha = function(e) {
    const request = new XMLHttpRequest()
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        const response = JSON.parse(request.responseText)
        switch (response.prize) {
          case 'FIRST':
            background.id = 'bg_1'
            gachaWindow.classList.add('hidden')
            prizeWindow.classList.remove('hidden')
            prizeText.innerText = '恭喜你中頭獎了！日本東京來回雙人遊！'
            break
          case 'SECOND':
            background.id = 'bg_2'
            gachaWindow.classList.add('hidden')
            prizeWindow.classList.remove('hidden')
            prizeText.innerText = '二獎！90 吋電視一台！'
            break
          case 'THIRD':
            background.id = 'bg_3'
            gachaWindow.classList.add('hidden')
            prizeWindow.classList.remove('hidden')
            prizeText.innerText = '恭喜你抽中三獎：知名 YouTuber 簽名握手會入場券一張，bang！'
            break
          case 'NONE':
            background.id = 'bg_4'
            gachaWindow.classList.add('hidden')
            prizeWindow.classList.remove('hidden')
            prizeText.innerText = '銘謝惠顧'
            break
          default:
            alert('系統不穩定，請再試一次。')
        }
      } else {
        console.log('err')
        alert('系統不穩定，請再試一次。')
      }
    }
    request.onerror = function() {
      console.log('error')
    }
    request.open('GET', 'https://dvwhnbka7d.execute-api.us-east-1.amazonaws.com/default/lottery', true)
    request.send()
  }
})
