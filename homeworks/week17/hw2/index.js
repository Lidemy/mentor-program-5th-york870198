const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const session = require('express-session')
const SessionStore = require('express-session-sequelize')(session.Store)
const methodOverride = require('method-override')

const app = express()

const db = require('./models')
const middleware = require('./middlewares')

const { User, Pool } = db

const sequelizeSessionStore = new SessionStore({
  db: db.sequelize
})

app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(session({
  secret: process.env.HASH_SECRET || 'secretForTest',
  store: sequelizeSessionStore,
  resave: false,
  saveUninitialized: false
}))

app.get('/', (req, res) => {
  let currentUser = ''
  if (req.session.username) {
    currentUser = req.session.username
  }
  res.render('index', { currentUser })
})

app.get('/control', middleware.checkLogin, (req, res) => {
  res.render('control')
})

app.post('/control', middleware.checkLogin, async(req, res) => {
  await Pool.create(req.body)
  res.redirect('/control')
})

app.put('/control', middleware.checkLogin, async(req, res) => {
  await Pool.update(req.body, {
    where: {
      id: req.body.id
    }
  })
  res.redirect('/control')
})

app.delete('/control', middleware.checkLogin, async(req, res) => {
  await Pool.destroy({
    where: {
      id: req.body.id
    }
  })
  res.redirect('/control')
})

app.get('/api/pool', async(req, res) => {
  const pool = await Pool.findAll({})
  res.send(pool)
})

app.get('/api/draw', async(req, res) => {
  const pool = await Pool.findAll({})
  let draw = 0
  let result
  let poolCount = 0
  pool.forEach((e) => {
    poolCount += e.rate
  })
  draw = Math.floor((Math.random() * poolCount))
  for (let i = pool.length - 1; i >= 0; i--) {
    draw -= pool[i].rate
    if (draw < 0) {
      result = pool[i]
      break
    }
  }
  res.send(result)
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
    res.redirect('/')
  })
})

app.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/')
  })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Listening on ${PORT}`))
