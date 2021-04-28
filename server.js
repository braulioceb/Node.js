const http = require('http');
const port = 3000;
const server = http.createServer(function (req, res){
    const {url, method} = req;
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<h1>Server Create </h1>');
});

server.listen(port, () => {
    console.log(`server runing at port ${port}`)    
});