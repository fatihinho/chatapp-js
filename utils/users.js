const users = [];

// Sohbet'e kullanıcı katıldığında bilgilerini tutar
function joinUser(id, username, room) {
    const user = {
        id, 
        username, 
        room 
    };
    users.push(user);
    return user;
}

// Sohbet'teki kullanıcıyı id bilgisine göre çeker
function getCurrentUser(id) {
    return users.find(user => user.id === id);
}

// Sohbet'ten ayrılan kullanıcıyı siler
function userLeave(id) {
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
}

// Sohbet'teki istenilen bir odadaki kullanıcıları çeker
function getRoomUsers(room) {
    return users.filter(user => user.room === room);
}

module.exports = {
    joinUser,
    getCurrentUser,
    userLeave,
    getRoomUsers
}