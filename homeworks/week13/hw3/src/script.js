const fetch = require('node-fetch')

const inputHeader = {
  'Client-ID': '1x2e3xv1332ob39zi2fs70s2pohif6',
  Accept: 'application/vnd.twitchtv.v5+json'
}

window.onload = function() {
  const main = document.querySelector('main')
  window.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-game')) {
      main.innerHTML = ''
      sendRequestByFetch(`https://api.twitch.tv/kraken/streams/?game=${e.target.innerText}&limit=20`, inputHeader, getStreamsByGame)
    }
  })

  function sendRequestByFetch(address, header, callback) {
    fetch(address, {
      method: 'get',
      headers: header
    })
      .then((res) => res.json())
      .then(callback)
  }

  function getTopGames(resBody) {
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
  }

  function getStreams(resBody) {
    resBody.streams.forEach((el) => {
      createStreamCard(el)
    })
  }

  function getStreamsByGame(resBody) {
    resBody.streams.forEach((el) => {
      createStreamCard(el)
    })
  }

  function createStreamCard(stream) {
    const card = document.createElement('div')
    card.classList.add('streamCard')
    card.innerHTML = `<div class="preview"><img src="${stream.preview.medium}"></div><div class="streamDescription"><div class="channelIcon"><img src="${stream.channel.logo}"></div><div class="streamInfo"><div class="streamTitle">${stream.channel.status}</div><div class="channelName">${stream.channel.display_name}</div></div></div>`
    main.appendChild(card)
  }
  sendRequestByFetch('https://api.twitch.tv/kraken/games/top?limit=5', inputHeader, getTopGames)
  sendRequestByFetch('https://api.twitch.tv/kraken/streams/?limit=20', inputHeader, getStreams)
}
