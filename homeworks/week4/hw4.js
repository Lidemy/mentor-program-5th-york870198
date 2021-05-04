const got = require('got')

async function twitchAPI() {
  try {
    const response = await got('https://api.twitch.tv/kraken/games/top', {
      headers: {
        'Client-ID': '1x2e3xv1332ob39zi2fs70s2pohif6',
        Accept: 'application/vnd.twitchtv.v5+json'
      }
    })
    const resBody = JSON.parse(response.body)
    const games = resBody.top
    for (let i = 0; i < games.length; i++) {
      const { name } = games[i].game
      const { viewers } = games[i]
      console.log(`${viewers} ${name}`)
    }
  } catch (error) {
    console.log(error.response.body)
  }
}

twitchAPI()
