const http = require('http');
const fs = require('fs');
const server = http.createServer((req, res) => {
    const log = `${Date.now()}: ${req.url} new request\n`;
    fs.appendFile('log.txt',log, (err, data) => {
        switch (req.url) {
            case '/':
                res.end("home page");
                break;
            case '/about':
                res.end("hii i am sahil");
                break;
            default:
                res.end("404 Not Found");
        }
    })

});
server.listen(3000, () => console.log("server start"));