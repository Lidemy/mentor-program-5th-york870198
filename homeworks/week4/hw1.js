const got = require('got')

async function getBookList() {
  try {
    const response = await got('https://lidemy-book-store.herokuapp.com/books?_limit=10')
    try {
      const resBody = JSON.parse(response.body)
      for (let i = 0; i < resBody.length; i++) {
        console.log(`${resBody[i].id} ${resBody[i].name}`)
      }
    } catch (error) {
      console.log(error)
      console.log('回傳的東西不是 JSON，或者有其他問題。')
    }
  } catch (error) {
    console.log(error)
    console.log('出錯了，反正不外乎是 404')
  }
}

getBookList()
