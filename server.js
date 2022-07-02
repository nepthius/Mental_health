const http = require('http');
const fs  = require('fs');

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html')

    let path = './webpage/'

    //reroutes user to their desired url and updates status code accordingly
    switch(req.url){
        case '/':
            path += 'index.html'
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html'
            res.statusCode = 200;
            break;
        case '/about-me':
            res.statusCode = 301;
            res.setHeader('Location', '/about')
            res.end()
        default:
            path += '404.html';
            res.statusCode = 404;
            break;
    }

    //reads path and displays corresponding file
    fs.readFile(path, (err, data) => {
        if(err){
            console.log("error")
            res.end()
        }
        else{
            res.write(data)
            res.end()
        }
    })
});

server.listen(3000, 'localhost', () => {
    console.log("listening for requests on port 3000...")
})
