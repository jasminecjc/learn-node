const http = require('http');
const url = require('url');

const start = (route, handle) => {
    http.createServer((request, response) => {
        let pathname = url.parse(request.url).pathname;
        let postData = '';
        console.log('request from' + pathname + 'received');

        route(handle, pathname, response, request);

    }).listen(8888);
}

console.log('server has started');

module.exports = {
    start: start
}