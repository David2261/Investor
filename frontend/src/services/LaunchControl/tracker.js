"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cookieUtils_1 = require("../cookieUtils");
(function () {
    var _a;
    // Генерация уникального ID
    var generateId = function () { return Math.random().toString(36).substring(2) + Date.now().toString(36); };
    var apiURL = import.meta.env.VITE_API_URL;
    // Получение или установка userId
    var userId = (0, cookieUtils_1.getCookie)('userId');
    if (!userId) {
        userId = generateId();
        (0, cookieUtils_1.setCookie)('userId', userId, 30);
    }
    var visitTime = new Date().toISOString();
    (0, cookieUtils_1.setCookie)('visitTime', visitTime, 30);
    var userAgent = navigator.userAgent;
    (0, cookieUtils_1.setCookie)('userAgent', userAgent, 30);
    var timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    (0, cookieUtils_1.setCookie)('timeZone', timeZone, 30);
    var isMobile = /Mobi|Android/i.test(navigator.userAgent);
    var deviceInfo = {
        isMobile: isMobile,
        platform: navigator.platform || 'unknown',
        device: isMobile ? (((_a = navigator.userAgent.match(/(iPhone|iPad|Android|Mobile)/i)) === null || _a === void 0 ? void 0 : _a[0]) || 'unknown') : 'desktop',
    };
    (0, cookieUtils_1.setCookie)('deviceInfo', JSON.stringify(deviceInfo), 30);
    var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection || {};
    var connectionInfo = {
        type: connection.effectiveType || 'unknown',
        downlink: connection.downlink || 'unknown',
        rtt: connection.rtt || 'unknown',
    };
    (0, cookieUtils_1.setCookie)('connectionInfo', JSON.stringify(connectionInfo), 30);
    // Получение IP-адреса
    var ipAddress = (0, cookieUtils_1.getCookie)('ipAddress') || 'unknown';
    fetch('https://api.ipify.org?format=json')
        .then(function (response) { return response.json(); })
        .then(function (data) {
        ipAddress = data.ip;
        (0, cookieUtils_1.setCookie)('ipAddress', ipAddress, 30);
        sendData();
    })
        .catch(function () { return sendData(); });
    // Отправка данных
    function sendData() {
        fetch("".concat(apiURL, "/api/v1/launch-control/"), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({}),
        }).catch(function () { });
        // Отправка через sendBeacon при закрытии страницы
        window.addEventListener('unload', function () {
            navigator.sendBeacon("".concat(apiURL, "/api/v1/launch-control/"), JSON.stringify({}));
        });
    }
})();
