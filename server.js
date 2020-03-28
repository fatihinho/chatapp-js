/* Server Side */

const http = require('http');
const path = require('path');
const express = require('express');
const socketio = require('socket.io');
const formatMessages = require('./utils/messages');


// Server Bileşenleri
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const PORT = 3000 || process.env.PORT;

const chatBot = 'ChatBot';


// Static dosyamızı tanımlıyoruz
app.use(express.static(path.join(__dirname, 'public')));

// Kullanıcı bağlandığında çalışır
io.on('connection', socket => {
    console.log('Yeni Bağlantı...');

    // Client tarafına, belirli bir kişiye mesaj gönderir
    socket.emit('message', formatMessages(chatBot, 'Sohbet\'e Hoşgeldin!'));

    // Client tarafına, toplu bir mesaj gönderir 
    socket.broadcast.emit('message', formatMessages(chatBot, 'Sohbet\'e bir kullanıcı katıldı'));

    // Kullanıcı ayrıldığında çalışır
    socket.on('disconnect', () => {
        io.emit('message', formatMessages(chatBot, 'Bir kullanıcı sohbet\'ten ayrıldı'));
    });

    // Client'tan mesajı alır
    socket.on('chatMessage', msg => {
       io.emit('message', formatMessages('user', msg)); 
    });
});

// Server Başlar
server.listen(PORT, () => console.log(`Server running on ${PORT}`));