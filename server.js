const http = require('http');
const path = require('path');
const express = require('express');
const socketio = require('socket.io');

// Server bileşenleri
const app = express();
const server = http.createServer(app);
const io = socketio(server)

// Static dosyamızı tanımlıyoruz
app.use(express.static(path.join(__dirname, 'public')));

// Kullanıcı bağlandığında çalışır
io.on('connection', socket => {
    console.log('Yeni Bağlantı...');
})

// Port 
const PORT = 3000 || process.env.PORT;

// Server'ı kullanılmaya hazırlar
server.listen(PORT, () => console.log(`Server running on ${PORT}`));