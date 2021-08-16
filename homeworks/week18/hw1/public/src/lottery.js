const fetch = require('node-fetch')

async function drawLottery() {
  let pool
  let sum
  let result
  try {
    const poolFetch = await fetch(`http://${window.location.host}/lottery/api`)
    const sumFetch = await fetch(`http://${window.location.host}/lottery/api/sum`)
    pool = await poolFetch.json()
    sum = await sumFetch.json()
  } catch (err) {
    console.log('fetch failed', err)
  }
  if (pool.lotteries.length === 0) {
    return {
      name: '銘謝惠顧',
      img: ''
    }
  } else {
    let random = Math.floor(Math.random() * sum.sum)
    for (let i = 0; i < pool.lotteries.length; i++) {
      random -= pool.lotteries[i].rate
      if (random < 0) {
        result = JSON.stringify(pool.lotteries[i])
        break
      }
    }
    return result
  }
}

window.onload = () => {
  const gachaResult = $('.gacha--result')
  $('.gachaButton').click(async() => {
    const result = await drawLottery()
    const resultObj = JSON.parse(result)
    gachaResult.html(`${resultObj.name} <img src="${resultObj.img}">`)
  })
}
