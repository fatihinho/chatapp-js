/* Server Side */

const http = require('http');
const path = require('path');
const express = require('express');
const socketio = require('socket.io');
const formatMessages = require('./utils/messages');
const { joinUser, getCurrentUser, userLeave, getRoomUsers } = require('./utils/users');


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

    // Client'tan username, room parametrelerini alarak işlemler gerçekleştirir
    socket.on('joinRoom', ({ username, room }) => {
        const user = joinUser(socket.id, username, room);
        
        // Socket'teki mevcut id'li kullanıcı ile mevcut odayı birbirine bind eder
        socket.join(user.room);

        // Client tarafına, belirli bir kişiye mesaj gönderir
        socket.emit('message', formatMessages(chatBot, `Sohbet\'e Hoşgeldin ${username}!`));
    
        // Client tarafına, belirli bir odaya, toplu bir mesaj gönderir 
        socket.broadcast.to(user.room).emit('message', formatMessages(chatBot, `${username} katıldı!`));

        // Sidebar'a oda ismini ve o odadaki kullanıcıları yazdırmak için verileri Client'a gönderir
        io.to(user.room).emit('roomUsers', { 
            room: user.room,
            users: getRoomUsers(user.room)
        });
    });
     
    // Client'tan mesajı alır
    socket.on('chatMessage', msg => {
        const user = getCurrentUser(socket.id);
        io.to(user.room).emit('message', formatMessages(user.username, msg)); 
    });
   
    // Kullanıcı ayrıldığında çalışır
    socket.on('disconnect', () => {
        const user = userLeave(socket.id);
        if (user) {
            io.to(user.room).emit('message', formatMessages(chatBot, `${user.username} ayrıldı!`));
            
            // Ayrılık gerçekleştiğinde sidebar'ı günceller
            io.to(user.room).emit('roomUsers', { 
                room: user.room,
                users: getRoomUsers(user.room)
            });
        }
    });
});

// Server Başlar
server.listen(PORT, () => console.log(`Server running on ${PORT}`));