import http2 from 'http2';
import fs from 'fs';

const PORT = 8443;

const server = http2.createSecureServer({
    key: fs.readFileSync('server/timbo-privkey.pem'),
    cert: fs.readFileSync('server/timbo-cert.pem')
});

server.on('error', (err) => console.error(err));

server.on('stream', (stream, headers) =>{
    // stream is a Duplex
    stream.respond({
        'content-type': 'text/html; charset=utf-8',
        ':status': 200
    });
    stream.end('<h1> Hello World</h1>');
});
console.log('Hosting server at: ' + PORT);
server.listen(PORT);