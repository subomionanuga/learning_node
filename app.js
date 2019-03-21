const http = require('http');

function listener(req, res) {
    console.log(req);
}

const server = http.createServer(listener);


server.listen(3000);