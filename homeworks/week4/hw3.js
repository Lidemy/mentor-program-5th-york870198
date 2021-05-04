const got = require('got')

const args = process.argv;

(async() => {
  try {
    const response = await got(`https://restcountries.eu/rest/v2/name/${args[2]}`)
    const resBody = JSON.parse(response.body)
    resBody.forEach((e) => {
      console.log('============')
      console.log(`國家：${e.name}`)
      console.log(`首都：${e.capital}`)
      console.log(`貨幣：${e.currencies[0].code}`)
      console.log(`國碼：${e.callingCodes[0]}`)
    })
  } catch (error) {
    if (error.response) {
      console.log('找不到國家資訊。')
    } else {
      console.log('出了點問題。')
    }
  }
})()
