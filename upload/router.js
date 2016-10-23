const route = (handle, pathname, response, request) => {
    console.log('about to route a request for' + pathname);
    if(typeof handle[pathname] === 'function') {
        handle[pathname](response, request);
    }else {
        console.log('no request handle found for ' + pathname);
        response.writeHead(404, {'Conten-Type': 'text/plain'});
        response.write('404 not found');
        response.end();
    }
}

module.exports = {
    route: route
}