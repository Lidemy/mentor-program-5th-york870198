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

const { User, Article } = db

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
  if (req.session.userName) {
    currentUser = req.session.userName
  }
  res.render('index', { currentUser })
})

app.get('/article', middleware.checkLogin, (req, res) => {
  res.render('postForm')
})

app.post('/article', middleware.checkLogin, async(req, res) => {
  await Article.create(req.body)
  res.redirect('/')
})

app.post('/article/update', middleware.checkLogin, async(req, res) => {
  res.render('updateForm', req.body)
})

app.put('/article', middleware.checkLogin, async(req, res) => {
  await Article.update(req.body, {
    where: {
      id: req.body.id
    }
  })
  res.redirect('/')
})

app.delete('/article', middleware.checkLogin, async(req, res) => {
  await Article.destroy({
    where: {
      id: req.body.id
    }
  })
  res.redirect('/')
})

app.get('/article/category/:category', (req, res) => {
  const { category } = req.params
  let currentUser = ''
  if (req.session.userName) {
    currentUser = req.session.userName
  }
  res.render('index', {
    currentUser,
    category
  })
})

app.get('/article/:id', (req, res) => {
  const { id } = req.params
  let currentUser = ''
  if (req.session.userName) {
    currentUser = req.session.userName
  }
  res.render('index', {
    currentUser,
    id
  })
})

app.get('/api/article', async(req, res) => {
  // getting all article from db
  const option = {}
  if (req.query.id) {
    option.id = req.query.id
  }
  if (req.query.category) {
    option.category = req.query.category
  }
  const articles = await Article.findAll({
    where: option,
    order: [['id', 'DESC']]
  })
  res.send({
    articles,
    session: req.session.userName
  })
})

app.post('/login', async(req, res) => {
  const userlogin = await User.findOne({ where: { userName: req.body.username } })
  if (userlogin === null) {
    res.redirect('/')
  }
  bcrypt.compare(req.body.password, userlogin.password).then((result) => {
    if (result) {
      req.session.userName = userlogin.userName
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
