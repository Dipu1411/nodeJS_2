const http = require('http');

const server = http.createServer((req, res) => {
    res.send("server created successfully");
});

server.listen(3000, () => {
    console.log("server is running on port 3000");
});