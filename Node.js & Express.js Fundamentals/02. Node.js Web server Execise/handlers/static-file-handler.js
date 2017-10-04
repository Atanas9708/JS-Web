const fs = require('fs');

let getContentType = (url) => {    
    let contentTypes = {
        '.css': 'text/css',
        '.html': 'text/html',
        '.js': 'application/javascript',
        '.jpg': 'image/jpeg',
        '.png': 'image/png',
        '.ico': 'image/x-icon'
    }

    for (let type in contentTypes){
        if (url.endsWith(type)){
            return contentTypes[type];
        }
    }
}

module.exports = (req, res) => {
    fs.readFile('.' + req.path, (err, data) => {

        if (err || !req.path.startsWith('/public/')) {
            res.writeHead(404);
            res.write('404 Not Found!');
            res.end();
            return;
        }

        let path = req.path;
        if (path.endsWith('.js') || path.endsWith('.html') ||
            path.endsWith('.css') || path.endsWith('.png') ||
            path.endsWith('.jpg') || path.endsWith('.ico')) {

            res.writeHead(200, {
                'Content-Type': getContentType(path)
            });
            res.write(data);
            res.end();
        } else {
            res.writeHead(403);
            res.write('Forbidden!');
            res.end();
        }
    })
}