const got = require('got')

async function linking() {
  try {
    const response = await got('https://lidemy-book-store.herokuapp.com/books?_limit=10')
    const resBody = JSON.parse(response.body)
    for (let i = 0; i < resBody.length; i++) {
      console.log(`${resBody[i].id} ${resBody[i].name}`)
    }
  } catch (error) {
    console.log(error.response.body)
  }
}

linking()
