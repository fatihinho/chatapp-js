/* Client Side */

const socket = io();

const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');


// Server tarafından mesaj alır
socket.on('message', message => {
    console.log(message);
    outputMessage(message);

    // Scroll Down - Mesaj yazıldıkça mesajları takip eder
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Kullanıcı mesajlarını buton ile göndermek için tutar
chatForm.addEventListener('submit', e => {
    e.preventDefault();

    // Input text'inden mesajı alır
    const message = e.target.elements.msg.value;

    // Server'a mesajı yollar
    socket.emit('chatMessage', message);

    // Mesaj input box'ı temizler
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
});

// Chat kutusuna mesajı ekler
function outputMessage(message) {
    // Yeni bir div elementi oluşturur ve içini uygun bir şekilde doldurur
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta"> ${message.username}<span> ${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>`

    // Html dosyasındaki class adı "chat-messages" olan elemente div'i ekler
    chatMessages.appendChild(div);
}