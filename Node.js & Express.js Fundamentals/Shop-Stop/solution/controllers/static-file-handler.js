const fs = require('fs');

let getContentType = (url) => {
    let contentTypes = {
        '.css': 'text/css',
        '.html': 'text/html',
        '.js': 'application/javascript',
        '.ico': 'image/x-icon',
        '.jpg': 'image/jpeg',
        '.png': 'image/png',
        '.bin': 'application/octet-stream'
    }

    for (let type in contentTypes) {
        if (url.endsWith(type)) {
            return contentTypes[type];
        }
    }
}

module.exports = (req, res) => {
    fs.readFile('.' + req.path, (err, data) => {
        if (err || !req.path.startsWith('/content/')) {
            console.log(err);
            res.writeHead(404);
            res.write('404 Page Not Found!');
            res.end();
            return;
        }

        let path = req.path;
        if (path.endsWith('.css') || path.endsWith('.html') || path.endsWith('.ico') ||
            path.endsWith('.js') || path.endsWith('.png') || path.endsWith('.jpg') ||
            path.endsWith('.bin')) {

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