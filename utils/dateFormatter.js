const date = new Date();

function getHours() {
    return date.getHours();
}

function getMinutes() {
    return date.getMinutes();
}

function getSeconds() {
    return date.getSeconds();
}

module.exports = {
    getHours,
    getMinutes,
    getSeconds
};