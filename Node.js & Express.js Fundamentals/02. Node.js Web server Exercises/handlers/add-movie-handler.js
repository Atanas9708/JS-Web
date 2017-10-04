const fs = require('fs');
const qs = require('querystring');
const db = require('./../config/dataBase');
let getSubmitForm = (req, res) => {
    fs.readFile('views/addMovie.html', (err, data) => {
        if (err) {
            console.log(err);
            return;
        }

        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.write(data);
        res.end();
    })
}

module.exports = (req, res) => {
    if (req.path === '/addMovie' && req.method === 'GET') {
        getSubmitForm(req, res);
    } else if (req.path === '/addMovie' && req.method === 'POST') {

        let body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            body = Buffer.concat(body).toString();
            let movieBody = qs.parse(body);
    
            let validFormatFlag = true;

            for (let movie in movieBody) {
                if (movieBody[movie] === '') {
                    validFormatFlag = false;
                }
            }

            fs.readFile('views/addMovie.html', 'utf8', (err, data) => {
                if (err) {
                    console.log(err);
                    return;
                }
        
                res.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                if (validFormatFlag){
                    data = data.replace('<div id="replaceMe">{{replaceMe}}</div>',
                    '<div id="succssesBox"><h2 id="succssesMsg">Movie Added</h2></div>');
                    db.push(movieBody);
                } else {
                    data = data.replace('<div id="replaceMe">{{replaceMe}}</div>',
                    '<div id="errBox"><h2 id="errMsg">Please fill all fields</h2></div>');
                }
                res.write(data);
                res.end();
            })
        });

    } else {
        return true;
    }
}