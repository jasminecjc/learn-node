const querystring = require('querystring');
const fs = require('fs');
const formidable = require('formidable');

const start = (response, request) => {
    console.log('request handle "start" was called');
    let body = `<html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <title>Document</title>
                </head>
                <body>
                    <form action="/upload" method="post" enctype="multipart/form-data">
                        <input type="file" name="upload">
                        <input type="submit" value="submit">
                    </form>
                </body>
                </html>`;
    response.writeHead(200, {'Conten-Type' : 'text/html'});
    response.write(body);
    response.end();
    
}

const upload = (response, request) => {
    console.log('request handle "upload" was called');
    let form = new formidable.IncomingForm();
    form.uploadDir = './upload/tmp';
    form.parse(request, (err, fields, files) => {
        console.log('parse done');
        let body = `<html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <title>Document</title>
                    </head>
                    <body>
                    <img src="/show" />
                    </body>
                    </html>`;
        fs.renameSync(files.upload.path, '/tmp/test.png')
        response.writeHead(200, {'Content-Type' : 'text/html'});
        response.write(body);
        response.end();
        
    })
}

const show = (response) => {
    console.log('request handle "show" was called');
    fs.readFile('/tmp/test.png', "binary", (err, file) => {
        if(err) {
            response.writeHead(500, {'Conten-Type' : 'text/plain'});
            response.write(err);
            response.end();
        }else {
            response.writeHead(200, {'Conten-Type' : 'image/png'});
            response.write(file, "binary");
            response.end();
        }
    })
}

module.exports = {
    start: start,
    upload: upload,
    show: show
}