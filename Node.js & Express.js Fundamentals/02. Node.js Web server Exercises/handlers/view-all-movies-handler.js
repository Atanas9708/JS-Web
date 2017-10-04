const fs = require('fs');
const db = require('./../config/dataBase');

module.exports = (req, res) => {
    if (req.path === '/viewAllMovies' && req.method === 'GET'){
        fs.readFile('views/viewAll.html', (err, data) => {
            if (err) {
                console.log(err);
                return;
            }

            let movieResult = '';
            let id = 0;
            for (let obj of db.sort((a, b) => b.movieYear - a.movieYear)) {
                let decodedUri = unescape(obj.moviePoster);
                movieResult += `<a href="/movies/details/${id}"><div class="movie">
                <img class="moviePoster" src="${decodedUri}"/>          
              </div></a>`;
              id++;
            }

            data = data.toString()
            .replace('<div id="replaceMe">{{replaceMe}}</div>', movieResult);

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