import { setCookie, getCookie } from '../cookieUtils.ts';

interface DeviceInfo {
  isMobile: boolean;
  platform: string;
  device: string;
}

interface ConnectionInfo {
  type: string;
  downlink: string | number;
  rtt: string | number;
}

interface LogData {
  userId: string;
  visitTime: string;
  ipAddress: string;
  userAgent: string;
  timeZone: string;
  deviceInfo: DeviceInfo;
  connectionInfo: ConnectionInfo;
}

(function () {
  // Генерация уникального ID
  const generateId = (): string => Math.random().toString(36).substring(2) + Date.now().toString(36);
  const apiURL = import.meta.env.VITE_API_URL;

  // Получение или установка userId
  let userId: string | null = getCookie('userId');
  if (!userId) {
    userId = generateId();
    setCookie('userId', userId, 30);
  }

  const visitTime: string = new Date().toISOString();
  setCookie('visitTime', visitTime, 30);

  const userAgent: string = navigator.userAgent;
  setCookie('userAgent', userAgent, 30);

  const timeZone: string = Intl.DateTimeFormat().resolvedOptions().timeZone;
  setCookie('timeZone', timeZone, 30);

  const isMobile: boolean = /Mobi|Android/i.test(navigator.userAgent);
  const deviceInfo: DeviceInfo = {
    isMobile,
    platform: navigator.platform || 'unknown',
    device: isMobile ? (navigator.userAgent.match(/(iPhone|iPad|Android|Mobile)/i)?.[0] || 'unknown') : 'desktop',
  };
  setCookie('deviceInfo', JSON.stringify(deviceInfo), 30);

  const connection: any = navigator.connection || navigator.mozConnection || navigator.webkitConnection || {};
  const connectionInfo: ConnectionInfo = {
    type: connection.effectiveType || 'unknown',
    downlink: connection.downlink || 'unknown',
    rtt: connection.rtt || 'unknown',
  };
  setCookie('connectionInfo', JSON.stringify(connectionInfo), 30);

  // Получение IP-адреса
  let ipAddress: string = getCookie('ipAddress') || 'unknown';
  fetch('https://api.ipify.org?format=json')
    .then((response: Response) => response.json())
    .then((data: { ip: string }) => {
      ipAddress = data.ip;
      setCookie('ipAddress', ipAddress, 30);
      sendData();
    })
    .catch(() => sendData());

  // Отправка данных
  function sendData(): void {
    fetch(`${apiURL}/api/v1/launch-control/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({}),
    }).catch(() => {});

    // Отправка через sendBeacon при закрытии страницы
    window.addEventListener('unload', () => {
      navigator.sendBeacon(`${apiURL}/api/v1/launch-control/`, JSON.stringify({}));
    });
  }
})();