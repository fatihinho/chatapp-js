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

function getNow() {
    return date.getDate();
}

function getDay() {
    return date.getDay();
}

function getMonth() {
    return date.getMonth();
}

function getFullYear() {
    return date.getFullYear();
}

module.exports = {
    getHours,
    getMinutes,
    getSeconds,
    getNow,
    getDate,
    getDay,
    getMonth,
    getFullYear
};