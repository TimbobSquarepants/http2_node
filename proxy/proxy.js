import fs from 'fs';
import http2 from 'http2';


let backend_port = 8543;
let backend_address = 'https://timbo-htpc:';

const proxy_server = http2.createSecureServer({
    key: fs.readFileSync('certs/timbo-privkey.pem'),
    cert: fs.readFileSync('certs/timbo-cert.pem')
});
const backend_connection = http2.connect(backend_address + backend_port, {
    ca : fs.readFileSync('certs/timbo-cert.pem')
});

// General Error catching
proxy_server.on('error', (err) => console.error(err));
backend_connection.on('error', (err) => console.error(err));

proxy_server.on('stream', (stream, headers) => {

    stream.respond({
        'content-type': 'text/html; charset=utf-8',
        ':status': 200,
    });

    const path = headers[':path'];
    stream.setEncoding('utf8');
    stream.on('error', (err) => console.error(err));
    if(path === '/backend'){

        let headers = {
            ':path' : '/',
            ':method': 'POST'
        }
        let data = '';
        stream.on('data', (chunk) => {
            data += chunk;
        });
        stream.on('end', () => {
            const req = backend_connection.request(headers);
            req.write(data);
            req.end();
            console.log(`\n${data}`);
        })
        stream.end();
    }
    else if(path === '/something_else'){
        console.log('some other path');
    }
});

let proxy_server_port = 8451;
proxy_server.listen(proxy_server_port);
console.log('Listening on port : ' + proxy_server_port );