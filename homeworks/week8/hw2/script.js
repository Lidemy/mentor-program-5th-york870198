window.onload = function() {
  const main = document.querySelector('main')
  window.addEventListener('click', (e) => {
    console.log(e.target)
    if (e.target.classList.contains('btn-game')) {
      main.innerHTML = ''
      getStreamsByGame(e.target.innerText)
    }
  })
  function getTopGames() {
    const request = new XMLHttpRequest()
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        const resBody = JSON.parse(request.responseText)
        const games = resBody.top
        const topGames = []
        for (let i = 0; i < games.length; i++) {
          const { name } = games[i].game
          topGames.push(name)
        }
        const gameList = document.querySelector('.gameList')
        topGames.forEach((e) => {
          const GameName = document.createElement('div')
          GameName.classList.add('btn-game')
          GameName.innerText = e
          gameList.appendChild(GameName)
        })
      } else {
        console.log('err')
        alert('系統不穩定，請再試一次。')
      }
    }
    request.onerror = function() {
      console.log('error')
    }
    request.open('GET', 'https://api.twitch.tv/kraken/games/top?limit=5', true)
    request.setRequestHeader('Client-ID', '1x2e3xv1332ob39zi2fs70s2pohif6')
    request.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json')
    request.send()
  }
  function getStreams() {
    const request = new XMLHttpRequest()
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        const resBody = JSON.parse(request.responseText)
        resBody.streams.forEach((el) => {
          createStreamCard(el)
        })
      } else {
        console.log('err')
        alert('系統不穩定，請再試一次。')
      }
    }
    request.onerror = function() {
      console.log('error')
    }
    request.open('GET', 'https://api.twitch.tv/kraken/streams/?limit=20', true)
    request.setRequestHeader('Client-ID', '1x2e3xv1332ob39zi2fs70s2pohif6')
    request.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json')
    request.send()
  }
  function getStreamsByGame(gameName) {
    const request = new XMLHttpRequest()
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        const resBody = JSON.parse(request.responseText)
        resBody.streams.forEach((el) => {
          createStreamCard(el)
        })
      } else {
        console.log('err')
        alert('系統不穩定，請再試一次。')
      }
    }
    request.onerror = function() {
      console.log('error')
    }
    request.open('GET', `https://api.twitch.tv/kraken/streams/?game=${gameName}&limit=20`, true)
    request.setRequestHeader('Client-ID', '1x2e3xv1332ob39zi2fs70s2pohif6')
    request.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json')
    request.send()
  }
  function createStreamCard(stream) {
    const card = document.createElement('div')
    card.classList.add('streamCard')
    card.innerHTML = `<div class="preview"><img src="${stream.preview.medium}"></div><div class="streamDescription"><div class="channelIcon"><img src="${stream.channel.logo}"></div><div class="streamInfo"><div class="streamTitle">${stream.channel.status}</div><div class="channelName">${stream.channel.display_name}</div></div></div>`
    main.appendChild(card)
  }
  getTopGames()
  getStreams()
}
