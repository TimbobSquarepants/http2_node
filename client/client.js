import http2 from 'http2';
import fs from 'fs';

/*
*
*
*
*
*
*/

// Setup the client to connect to Edge Function
const proxy = http2.connect('https://timbo-htpc:8451', {
    ca: fs.readFileSync('certs/timbo-cert.pem')
});
proxy.on('error', (err) => console.log(err));

// Set Data Variables
var body = "Data from the client"
var headers = {
    ':method': 'POST',
    ':path': '/backend',
    
};

// Converting Strings to JSON maybe look at some time later.

// var data = JSON.stringify({
//     payload: 'Testing out Edge Functions'
// });
const req = proxy.request(headers);

// Sending Data to the edge function.
for (let index = 0; index < 1000; index++) {
    req.setEncoding('utf-8');
    req.write(body);
    console.log(index);
    req.push();
    
}
req.end();
