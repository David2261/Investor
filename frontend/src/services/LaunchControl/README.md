# Руководство по использованию трекера данных пользователя

Этот проект предоставляет решение для сбора данных о пользователях веб-сайта с использованием TypeScript и cookies, с последующей отправкой данных на сервер Django через API (`/api/v1/launch-control/`). Данные записываются в лог-файл на сервере. Решение разработано с учетом незаметности для пользователя и соответствия требованиям конфиденциальности.

## Содержание
- [Описание](#описание)
- [Собираемые данные](#собираемые-данные)
- [Требования](#требования)
- [Установка](#установка)
- [Интеграция](#интеграция)
- [Использование](#использование)
- [Формат логов](#формат-логов)
- [Рекомендации по незаметности](#рекомендации-по-незаметности)
- [Этические и правовые аспекты](#этические-и-правовые-аспекты)
- [Ограничения](#ограничения)

## Описание
Клиентская часть (`client-tracker.ts`) собирает данные о пользователе (время визита, IP-адрес, User-Agent, часовой пояс, информацию об устройстве и соединении) и сохраняет их в cookies. Серверная часть (Django `ClientMetricsView`) извлекает эти cookies из запросов и записывает данные в лог-файл `__logs__/user.log`. Код оптимизирован для незаметной работы, минимизации следов в DevTools и совместимости с современными браузерами.

## Собираемые данные
- **userId**: Уникальный идентификатор пользователя (генерируется случайно).
- **visitTime**: Время захода на сайт (ISO-формат, например, `2025-05-30T03:46:00.000Z`).
- **ipAddress**: IP-адрес пользователя (через внешний API `ipify.org`).
- **userAgent**: Информация о браузере и устройстве (например, `Mozilla/5.0...`).
- **timeZone**: Часовой пояс (например, `Europe/Warsaw`).
- **deviceInfo**: Информация об устройстве:
  - `isMobile`: Мобильное устройство или нет (`true`/`false`).
  - `platform`: Платформа (например, `Win32`).
  - `device`: Тип устройства (например, `desktop`, `iPhone`, `Android`).
- **connectionInfo**: Информация о соединении:
  - `type`: Тип соединения (например, `4g`, `wifi`).
  - `downlink`: Скорость загрузки (Мбит/с).
  - `rtt`: Время отклика (мс).

## Требования
- **Клиентская часть**:
  - Node.js (v16 или выше).
  - TypeScript (`tsc` для компиляции).
  - Браузер с поддержкой `fetch`, `navigator.connection`, `Intl.DateTimeFormat`, `navigator.sendBeacon`.
- **Серверная часть**:
  - Django (v3.x или выше).
  - Python 3.8+.
  - Доступ к папке `__logs__` для записи логов.
- **Инструменты (опционально)**:
  - Terser для обфускации JavaScript (`npm install --save-dev terser`).
  - Бандлер (Vite или Webpack) для сборки React-приложения.

## Установка
1. **Клонируйте репозиторий** (или добавьте файлы в ваш проект):
   ```bash
   git clone <ваш-репозиторий>
   cd <ваш-репозиторий>
   ```

2. **Установите зависимости**:
   Для клиентской части:
   ```bash
   npm install
   npm install --save-dev typescript terser
   ```
   Для серверной части:
   ```bash
   pip install django djangorestframework
   ```

3. **Настройте файлы**:
   - Разместите `client-tracker.ts` и `cookieUtils.ts` в папке `src/utils/`.
   - Убедитесь, что Django view `ClientMetricsView` настроен в `urls.py`:
     ```python
     from django.urls import path
     from .views import ClientMetricsView

     urlpatterns = [
         path('api/v1/launch-control/', ClientMetricsView.as_view(), name='client-metrics'),
     ]
     ```

4. **Скомпилируйте TypeScript**:
   ```bash
   tsc src/utils/client-tracker.ts
   tsc src/utils/cookieUtils.ts
   ```

5. **Обфусцируйте код (опционально)**:
   ```bash
   npx terser src/utils/client-tracker.js -o public/scripts/client-tracker.min.js --mangle --compress
   npx terser src/utils/cookieUtils.js -o public/scripts/cookieUtils.min.js --mangle --compress
   ```

## Интеграция
### Клиентская часть
1. **Подключение через `<script>` (рекомендуемый способ)**:
   - В `public/index.html` добавьте:
     ```html
     <!DOCTYPE html>
     <html lang="en">
     <head>
         <meta charset="UTF-8" />
         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
         <title>Your App</title>
     </head>
     <body>
         <div id="root"></div>
         <script async src="/scripts/cookieUtils.min.js"></script>
         <script async src="/scripts/client-tracker.min.js"></script>
     </body>
     </html>
     ```
   - Убедитесь, что `public/scripts/` содержит `client-tracker.min.js` и `cookieUtils.min.js`.

2. **Альтернатива: Импорт в `App.tsx`**:
   - Если хотите интегрировать в React, импортируйте `initTracker` в `App.tsx`:
     ```typescript
     import { useEffect } from 'react';
     import { initTracker } from './utils/client-tracker';
     import './App.css';

     function App() {
       useEffect(() => {
         initTracker();
       }, []);

       return (
         <div className="App">
           <h1>Your App</h1>
         </div>
       );
     }

     export default App;
     ```
   - Убедитесь, что `client-tracker.ts` экспортирует функцию `initTracker` (см. код в предыдущих ответах).

3. **Настройка бандлера**:
   - Для **Vite** добавьте в `vite.config.ts`:
     ```typescript
     import { defineConfig } from 'vite';
     import react from '@vitejs/plugin-react';

     export default defineConfig({
       plugins: [react()],
       build: {
         minify: 'terser',
         terserOptions: {
           mangle: true,
           compress: true,
         },
       },
     });
     ```
   - Для **Webpack** настройте `terser-webpack-plugin` в `webpack.config.js`.

4. **Запустите приложение**:
   ```bash
   npm run dev
   ```

### Серверная часть
1. **Настройте Django**:
   - Убедитесь, что `ClientMetricsView` находится в вашем приложении, и URL `/api/v1/launch-control/` доступен.
   - Проверьте, что папка `__logs__` создается автоматически и имеет права на запись:
     ```python
     log_dir = os.path.join(settings.BASE_DIR, "__logs__")
     os.makedirs(log_dir, exist_ok=True)
     ```

2. **Запустите сервер**:
   ```bash
   python manage.py runserver
   ```

## Использование
1. **Запустите приложение**:
   - Клиент: `npm run dev` (или `npm run build` для продакшена).
   - Сервер: `python manage.py runserver`.

2. **Проверьте работу**:
   - Откройте приложение в браузере.
   - В DevTools → Network убедитесь, что запросы отправляются на `/api/v1/launch-control/` с cookies (`userId`, `visitTime`, `ipAddress`, и т.д.).
   - Проверьте файл `__logs__/user.log` на сервере. Пример записи:
     ```json
     {
       "userId": "k3j9f8h2g7t1637283912",
       "visitTime": "2025-05-30T03:46:00.000Z",
       "ipAddress": "192.168.1.1",
       "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
       "timeZone": "Europe/Warsaw",
       "deviceInfo": {
         "isMobile": false,
         "platform": "Win32",
         "device": "desktop"
       },
       "connectionInfo": {
         "type": "4g",
         "downlink": 10,
         "rtt": 50
       },
       "logTime": "2025-05-30T03:46:00.123456"
     }
     ```

3. **Ошибки**:
   - Если cookies не отправляются, проверьте, включены ли cookies в браузере и настроен ли CORS на сервере.
   - Ошибки записываются в `__logs__/error.log`.

## Формат логов
Логи записываются в `__logs__/user.log` в формате JSON, по одной записи на строку. Каждая запись содержит:
- `userId`: Уникальный ID пользователя.
- `visitTime`: Время визита (ISO).
- `ipAddress`: IP-адрес (или `unknown`, если не удалось получить).
- `userAgent`: Информация о браузере.
- `timeZone`: Часовой пояс.
- `deviceInfo`: Объект с информацией об устройстве.
- `connectionInfo`: Объект с информацией о соединении.
- `logTime`: Время записи лога на сервере.

## Рекомендации по незаметности
1. **Обфускация кода**:
   ```bash
   npx terser src/utils/client-tracker.js -o public/scripts/client-tracker.min.js --mangle --compress
   ```
2. **Удаление логов ошибок**:
   В `cookieUtils.ts` замените `console.error` на:
   ```typescript
   catch (error) {}
   ```
3. **Сжатие cookies**:
   Кодируйте значения в base64:
   ```typescript
   setCookie('deviceInfo', btoa(JSON.stringify(deviceInfo)), 30);
   ```
   На сервере декодируйте:
   ```python
   import base64
   deviceInfo = json.loads(base64.b64decode(request.COOKIES.get("deviceInfo")).decode())
   ```
4. **Маскировка**:
   Подключите скрипт через `<script async>` в `index.html`, а не через `App.tsx`.
5. **WebSocket (опционально)**:
   Для большей незаметности замените `fetch` на WebSocket, но это потребует изменения `ClientMetricsView`.

## Этические и правовые аспекты
- **Согласие**: Добавьте баннер согласия на cookies (например, с библиотекой `react-cookie-consent`).
- **Анонимизация**: Хешируйте `userId` и `ipAddress`:
  ```typescript
  const hash = (str: string): string => btoa(str).slice(0, 10);
  setCookie('userId', hash(userId), 30);
  setCookie('ipAddress', hash(ipAddress), 30);
  ```
- **Прозрачность**: Укажите в политике конфиденциальности, какие данные собираются.

## Ограничения
- **Блокировка cookies**: Если cookies отключены, используйте `localStorage`:
  ```typescript
  if (!navigator.cookieEnabled) {
    localStorage.setItem('userId', userId);
  }
  ```
  Это потребует изменения `ClientMetricsView` для чтения данных из тела запроса.
- **Размер cookies**: Ограничение ~4 КБ на домен. Сжимайте данные или используйте `localStorage`.
- **IP-адрес**: Зависимость от `ipify.org`. Можно извлечь IP на сервере через `request.META.get('REMOTE_ADDR')`.

## Поддержка
Если нужны доработки (добавление данных, изменение формата, интеграция с другими системами), свяжитесь с разработчиком или создайте issue в репозитории.