const fs = require('fs');
const db = require('./../config/dataBase');
const path = require('path');

module.exports = (req, res) => {
    if (req.headers.statusheader === 'Full'){
        let filePath = path.normalize(path.join(__dirname, 'views/status.html'));
        fs.readFile('views/status.html', (err, data) => {
            if (err){
                console.log(err);
                return;
            }

            let movieCount = db.length;
            data = data.toString()
            .replace('{{replaceMe}}', `There are currently ${movieCount} movies in the database.`);

            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.write(data);
            res.end();
        })
    } else {
        return true;
    }
}