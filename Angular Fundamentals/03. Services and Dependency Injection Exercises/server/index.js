const fs = require('fs')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const url = require('url')
const qs = require('qs')
const port = 5000

const db = require('./Pokemon-Db/dbReader')

let credentials

app = express()
app.use(cors())
app.use(bodyParser.json())

let auth = (req, res, next) => {
  let auth = req.headers.authorization
  auth == credentials ? next() : res.send(401, { errMsg: 'err' })
}

app.get('/', (req, res) => {
  res.send('works')
})

app.post('/login', (req, res) => {
  let payload = req.body
  if (payload.username === '' || payload.password === '') {
    res.send(400, {
      errMessage: 'Invalid username or password'
    })
  } else {
    credentials = payload.username + payload.password
    res.send(200, {
      username: payload.username,
      authtoken: credentials
    })
  }
})
// sort users by param
app.get('/pokedex', (req, res) => {
  let searchedName = qs.parse(url.parse(req.url).query).pokename.toLowerCase()
  let response = db.filter(pokemon =>
    pokemon.ename.toLowerCase().includes(searchedName)
  )
  res.send(response.slice(0, 10))
})

app.get('/pokemon', auth, (req, res) => {
  let searchedId = qs.parse(url.parse(req.url).query).pokemonId
  let targetPokemon = db.find(x => x.id === searchedId)
  let name = targetPokemon.ename
  let imgPath = 'img?path=' + searchedId + name + '.png'
  res.send({ img: imgPath, data: targetPokemon })
})

app.get('/img', (req, res) => {
  let imgName = qs.parse(url.parse(req.url).query).path
  console.log(imgName);
  res.sendFile(__dirname + '/Pokemon-DB/img/' + imgName)
})

app.all('*', (req, res) => {
  res.send('err')
})

app.use(express.static('./Pokemon-DB/img/'));

app.listen(port)
console.log('Server works on port :' + port)
