const express = require('express');
const WebSocket = require('ws');
const cors = require('cors')
const http = require('http');

const app = express();
const server = http.createServer(app);


const wss = new WebSocket.Server({ server, path: '/ws' });


let sseClients = [];

app.use(cors())

app.use(express.static('public'));


wss.on('connection', (ws) => {
  console.log('New WebSocket client connected');


  ws.send(JSON.stringify({ message: 'Welcome to the BPM WebSocket Server' }));


  ws.on('message', (message) => {
    parsed_message = JSON.parse(message);
    console.log('Received message:', parsed_message);


    sendToSSEClients(parsed_message);
  });


  ws.on('close', () => {
    console.log('WebSocket client disconnected');
  });
});

app.get('/sse', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  

  sseClients.push(res);

  req.on('close', () => {
    sseClients = sseClients.filter(client => client !== res);
    console.log('SSE client disconnected');
  });
});

function sendToSSEClients(data) {
  // Send data to all SSE clients
  sseClients.forEach(client => {
    client.write(`data: ${JSON.stringify(data)}\n\n`);
  });
}

server.listen(8080, () => {
  console.log('Server is running on http://localhost:8080');
});
