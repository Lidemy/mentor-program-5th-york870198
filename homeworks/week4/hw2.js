const got = require('got')

const args = process.argv

switch (args[2]) {
  case 'list':
    listing()
    break
  case 'read':
    reading(args[3])
    break
  case 'delete':
    deleting(args[3])
    break
  case 'create':
    creating(args[3])
    break
  case 'update':
    updating(args[3], args[4])
    break
}

function listing() {
  (async() => {
    try {
      const response = await got('https://lidemy-book-store.herokuapp.com/books?_limit=20')
      const resBody = JSON.parse(response.body)
      for (let i = 0; i < resBody.length; i++) {
        console.log(`${resBody[i].id} ${resBody[i].name}`)
      }
    } catch (error) {
      console.log(error.response.body)
    }
  })()
}

function reading(id) {
  if (id) {
    (async() => {
      try {
        const response = await got(`https://lidemy-book-store.herokuapp.com/books/${id}`)
        const resBody = JSON.parse(response.body)
        console.log(`${resBody.id} ${resBody.name}`)
      } catch (error) {
        console.log(error.response.body)
      }
    })()
  } else {
    console.log('請在 read 指令後加上想要查詢的 id')
  }
}

function deleting(id) {
  if (id) {
    (async() => {
      try {
        await got.delete(`https://lidemy-book-store.herokuapp.com/books/${id}`)
        console.log(`刪除 id ${id} 的書籍`)
      } catch (error) {
        console.log(error.response.body)
      }
    })()
  } else {
    console.log('請在 delete 指令後加上想要刪除的 id')
  }
}

function creating(bookName) {
  if (bookName) {
    (async() => {
      const { body } = await got.post('https://lidemy-book-store.herokuapp.com/books', {
        json: {
          name: bookName
        },
        responseType: 'json'
      })
      console.log(body)
    })()
  } else {
    console.log('請在 create 指令後加上想要新增的書名')
  }
}

function updating(id, bookName) {
  if (id && bookName) {
    (async() => {
      const { body } = await got.patch(`https://lidemy-book-store.herokuapp.com/books/${id}`, {
        json: {
          name: bookName
        },
        responseType: 'json'
      })
      console.log(body)
    })()
  } else {
    console.log('請在 update 指令後加上想要編輯的 id 與想要修改為的書名')
  }
}
