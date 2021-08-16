const express = require('express')

const app = express()

const path = require('path')
const bodyParser = require('body-parser')
const ejsMate = require('ejs-mate')
const bcrypt = require('bcrypt')
const session = require('express-session')
const SessionStore = require('express-session-sequelize')(session.Store)
const methodOverride = require('method-override')

const db = require('./models')
const middleware = require('./middlewares')

const { User, Menu, Lottery, Faq } = db

const sequelizeSessionStore = new SessionStore({
  db: db.sequelize
})

app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'public')))
app.engine('ejs', ejsMate)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(session({
  secret: process.env.HASH_SECRET || 'secretForTest',
  resave: false,
  store: sequelizeSessionStore,
  saveUninitialized: false
}))

app.get('/', (req, res) => {
  let currentUser = ''
  if (req.session.username) {
    currentUser = req.session.username
  }
  res.render('index', {
    currentUser,
    style: 'style'
  })
})

app.get('/lottery', (req, res) => {
  let currentUser = ''
  if (req.session.username) {
    currentUser = req.session.username
  }
  res.render('lottery', {
    currentUser,
    style: 'lotteryStyle'
  })
})

app.get('/faq', (req, res) => {
  let currentUser = ''
  if (req.session.username) {
    currentUser = req.session.username
  }
  res.render('faq', {
    currentUser,
    style: 'faqStyle'
  })
})

app.get('/menu', (req, res) => {
  let currentUser = ''
  if (req.session.username) {
    currentUser = req.session.username
  }
  res.render('menu', {
    currentUser,
    style: 'style'
  })
})

app.get('/control', middleware.checkLogin, (req, res) => {
  let currentUser = ''
  if (req.session.username) {
    currentUser = req.session.username
  }
  res.render('control', {
    currentUser,
    style: 'style'
  })
})

app.get('/login', (req, res) => {
  let currentUser = ''
  console.log(req.session)
  console.log(req.session.username)

  if (req.session.username) {
    currentUser = req.session.username
    return res.redirect('/control')
  }
  res.render('login', {
    currentUser,
    style: 'style'
  })
})

app.post('/login', async(req, res) => {
  const userlogin = await User.findOne({ where: { username: req.body.username } })
  if (userlogin === null) {
    res.redirect('/')
  }
  bcrypt.compare(req.body.password, userlogin.password).then((result) => {
    if (result) {
      req.session.username = userlogin.username
    }
    res.redirect('/control')
  })
})

app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/')
  })
})

app.post('/menu', middleware.checkLogin, async(req, res) => {
  await Menu.create(req.body)
  res.redirect('/control')
})

app.put('/menu', middleware.checkLogin, async(req, res) => {
  if (req.body.action === 'update') {
    await Menu.update(req.body, {
      where: {
        id: req.body.id
      }
    })
    res.redirect('/control')
  } else {
    await Menu.destroy({
      where: {
        id: req.body.id
      }
    })
    res.redirect('/control')
  }
})

app.post('/lottery', middleware.checkLogin, async(req, res) => {
  await Lottery.create(req.body)
  res.redirect('/control')
})

app.put('/lottery', middleware.checkLogin, async(req, res) => {
  if (req.body.action === 'update') {
    await Lottery.update(req.body, {
      where: {
        id: req.body.id
      }
    })
    res.redirect('/control')
  } else {
    await Lottery.destroy({
      where: {
        id: req.body.id
      }
    })
    res.redirect('/control')
  }
})

app.post('/faq', middleware.checkLogin, async(req, res) => {
  await Faq.create(req.body)
  res.redirect('/control')
})

app.put('/faq', middleware.checkLogin, async(req, res) => {
  if (req.body.action === 'update') {
    await Faq.update(req.body, {
      where: {
        id: req.body.id
      }
    })
    res.redirect('/control')
  } else {
    await Faq.destroy({
      where: {
        id: req.body.id
      }
    })
    res.redirect('/control')
  }
})

app.get('/menu/api', async(req, res) => {
  const menus = await Menu.findAll({
    order: [['id', 'ASC']],
    attributes: {
      exclude: ['createdAt', 'updatedAt']
    }
  })
  res.send({ menus })
})

app.get('/lottery/api', async(req, res) => {
  const lotteries = await Lottery.findAll({
    order: [['id', 'ASC']],
    attributes: {
      exclude: ['createdAt', 'updatedAt']
    }
  })
  res.send({ lotteries })
})

app.get('/lottery/api/sum', async(req, res) => {
  const sum = await Lottery.sum('rate')
  res.send({ sum })
})

app.get('/faq/api', async(req, res) => {
  const faqs = await Faq.findAll({
    order: [['id', 'ASC']],
    attributes: {
      exclude: ['createdAt', 'updatedAt']
    }
  })
  res.send({ faqs })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Listening on ${PORT}`))
