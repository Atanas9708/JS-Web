const fs = require('fs');
const db = require('./../config/dataBase');
const url = require('url');
const qs = require('querystring');
const formidable = require('formidable');
const shortid = require('shortid');

function getHeaders(res, data) {
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  res.write(data);
  res.end();
}

let viewAll = (req, res) => {
  let getDb = db.getDb().filter(m => m.privacy === 'on')
  .sort((a, b) => b.dateStamp - a.dateStamp);

  fs.readFile('views/viewAll.html', 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    let memeResult = '';
    for (let meme of getDb) {
      memeResult += `<div class="meme">
      <a href="/getDetails?id=${meme.id}">
      <img class="memePoster" src="${meme.memeSrc}"/></div>`
    }

    data = data.toString()
      .replace('<div id="replaceMe">{{replaceMe}}</div>', memeResult);

    getHeaders(res, data);
  })

}

let getDetails = (req, res) => {
  let id = qs.parse(url.parse(req.url).query).id;
  let targetedMeme = db.getDb().find(m => m.id === id);

  let resultMeme = `<div class="content">
  <img src="${targetedMeme.memeSrc}" alt=""/>
  <h3>Title  ${targetedMeme.title}</h3>
  <p> ${targetedMeme.description}</p>
  <button><a href="${targetedMeme.posterSrc}">Download Meme</a></button>
  </div>`;

  fs.readFile('views/details.html', (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    data = data.toString()
    .replace('<div id="replaceMe">{{replaceMe}}</div>', resultMeme);

    getHeaders(res, data);
  })
}

let viewAddMeme = (req, res) => {
  fs.readFile('views/addMeme.html', (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    getHeaders(res, data);
  })
}

let addMeme = (req, res) => {
  let form = new formidable.IncomingForm();
  let isValid = true;
  let memePath = `./public/memeStorage/${Math.ceil(db.getDb().length / 10)}`
  
  form.on('error', (err) => {
    console.log(err);
    return;
  }).on('fileBegin', (name, file) => {
    console.log(name);
    console.log(file.path);
  })
  form.parse(req, (err, file) => {
    file.path = memePath +
    
  })
  
}

module.exports = (req, res) => {
  if (req.pathname === '/viewAllMemes' && req.method === 'GET') {
    viewAll(req, res)
  } else if (req.pathname === '/addMeme' && req.method === 'GET') {
    viewAddMeme(req, res)
  } else if (req.pathname === '/addMeme' && req.method === 'POST') {
    addMeme(req, res)
  } else if (req.pathname.startsWith('/getDetails') && req.method === 'GET') {
    getDetails(req, res)
  } else {
    return true
  }
}
