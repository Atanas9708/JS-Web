const fs = require('fs');
const db = require('./../config/dataBase');
const url = require('url');
const qs = require('querystring');
const formidable = require('formidable');
const shortid = require('shortid');
const util = require('util');

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
      <img class="memePoster" src="${meme.memeSrc}"/></div>`;
    }

    data = data.toString()
      .replace('<div id="replaceMe">{{replaceMe}}</div>', memeResult);

    getHeaders(res, data);
  });

}

let getDetails = (req, res) => {
  let id = qs.parse(url.parse(req.url).query).id;
  let targetedMeme = db.getDb().find(m => m.id === id);
  console.log(targetedMeme);
  let resultMeme = `<div class="content">
  <img src="${targetedMeme.memeSrc}" alt=""/>
  <h3>Title  ${targetedMeme.title}</h3>
  <p> ${targetedMeme.description}</p>
  <button><a href="${targetedMeme.memeSrc}" download>Download Meme</a></button>
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
  let memeGenerator = (id, title, memeSrc, description, privacy) => {
    return {
      id: id,
      title: title,
      memeSrc: memeSrc,
      description: description,
      privacy: privacy,
      dateStamp: Date.now()
    }
  }

  let validateFileds = (title, desc) => {
    if (title !== '' && desc !== ''){
      return true;
    }
    return false;
  }

  let form = new formidable.IncomingForm();
  let dbLength = Math.ceil(db.getDb().length / 10);
  let fileName = shortid.generate();
  let memePath = `./public/memeStorage/${dbLength}/${fileName}.jpg`;

  fs.access(`./public/memeStorage/${dbLength}`, (err) => {
    if (err){
      fs.mkdirSync(`./public/memeStorage/${dbLength}`);
    }

    form
    .on('error', (err) => {
      console.log(err);
    })
    .on('fileBegin', (name, file) => {
      file.path = memePath;
    })

    form.parse(req, (err, fields, files) => {
      let validFields = validateFileds(fields.memeTitle, fields.memeDescription);
      if (!validFields || files.meme.size === 0){
        viewAddMeme(req, res, 'err');
        return;
      }
      let memeId = shortid.generate();
      let meme = memeGenerator (
        memeId,
        fields.memeTitle,
        memePath,
        fields.memeDescription,
        fields.status
      );
      db.add(meme);
      db.save().then(() => {
        viewAll(req, res);
      });
    });
  });
}


module.exports = (req, res) => {
  if (req.pathname === '/viewAllMemes' && req.method === 'GET') {
    viewAll(req, res);
  } else if (req.pathname === '/addMeme' && req.method === 'GET') {
    viewAddMeme(req, res);
  } else if (req.pathname === '/addMeme' && req.method === 'POST') {
    addMeme(req, res);
  } else if (req.pathname.startsWith('/getDetails') && req.method === 'GET') {
    getDetails(req, res);
  } else {
    return true;
  }
}