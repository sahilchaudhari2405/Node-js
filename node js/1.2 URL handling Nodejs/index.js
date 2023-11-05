const http = require('http');
const fs = require('fs');
const url = require("url");
const { parse } = require('path');
const server = http.createServer((req, res) => {
    if(req.url==="/favicon.ico"){
       return res.end();
    }
    const log = `${Date.now()}: ${req.url} new request\n`;
    const MyUrl = url.parse(req.url ,true);
    console.log(MyUrl);
    fs.appendFile('log.txt',log, (err, data) => {
        switch (MyUrl.pathname) {
            case '/':
                res.end("home page");
                break;
            case '/about':
                const qr = MyUrl.query.sahil;
                res.end(`hii i am sahil${qr}`);
                break;
            default:
                res.end("404 Not Found");
        }
    })

});
server.listen(3001, () => console.log("server start"));