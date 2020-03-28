const http = require('http');
const path = require('path');
const express = require('express');
const socketio = require('socket.io');

// Server Bileşenleri
const app = express();
const server = http.createServer(app);
const io = socketio(server)

// Date Bileşenleri
const date = new Date();
const hours = date.getHours();
const minutes = date.getMinutes();


// Static dosyamızı tanımlıyoruz
app.use(express.static(path.join(__dirname, 'public')));

// Kullanıcı bağlandığında çalışır
io.on('connection', socket => {
    console.log(`Yeni Bağlantı... (${hours}:${minutes})` );
})

// Port 
const PORT = 3000 || process.env.PORT;

// Server'ı kullanılmaya hazırlar
server.listen(PORT, () => console.log(`Server running on ${PORT}`));