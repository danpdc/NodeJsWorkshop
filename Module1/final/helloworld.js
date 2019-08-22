const http = require('http');

const server = http.createServer((req, res) => {
    res.end('Hello world');
});

server.listen(7894, () => {
    console.log('Server is running and listening on port 7894');
});