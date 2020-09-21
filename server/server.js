import http2 from 'http2';
import fs from 'fs';

const PORT = 8543;

const server = http2.createSecureServer({
    key: fs.readFileSync('timbo-privkey.pem'),
    cert: fs.readFileSync('timbo-cert.pem')
});

server.on('error', (err) => console.error(err));

server.on('stream', (stream, headers) =>{
    console.log("recieved Connection");
    // stream is a Duplex
    stream.respond({
        'content-type': 'text/html; charset=utf-8',
        ':status': 200,
    });
    console.log(headers['origin']);
    console.log(headers)
  
    
    let data = '';
    stream.on('error', (error) => console.error(error));

    stream.on('data', (chunk) => {data += chunk;});

    stream.on('end', () =>{
        console.log(`\n${data}`);
    });
});
console.log('Hosting server at: ' + PORT);
server.listen(PORT);