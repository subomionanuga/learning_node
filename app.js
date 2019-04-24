const http = require('http');
const fs = require('fs');

// function listener(req, res) {
    
// }

const server = http.createServer(function(req, res) {
    const url = req.url;
    if (url === '/') {
        res.write('<html>')
        res. write('<head><title>Enter message</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Submit</button></body>');
        res.write ('</html>');
        return res.end();
    } else if (url === '/message') {
        const body = [];
        req.on('data', function(chunk) {
            body.push(chunk)
        });
        req.on('end', function() {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFileSync('message.txt', message, err => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        })
        // res.write('<html>')
        // res. write('<head><title>Entered Message</title></head>');
        // res.write('<body><h1>Your message entry was successful</h1></body>');
        // res.write('</html>');
        // return res.end();
    }
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>')
    res. write('<head><title>My first page</title></head>');
    res.write('<body><h1>Hello from Node.js</h1></body>');
    res.write('</html>');
    res.end();
});

server.listen(3000);