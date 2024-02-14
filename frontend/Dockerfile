FROM node:18-alpine as build

WORKDIR /usr/src/app

ADD *.json ./
# Устанавливаем все пакеты и зависимости указанные в json
RUN npm install --global yarn
RUN yarn install

# Добавляем каталоги public и src. 
# можно воспользоваться командой COPY . . но если вы синхронизировали node_modules,
# то будете ждать пока зальётся этот каталог целиком. 
# да и потом могут возникнуть проблемы.
ADD ./public ./public
ADD ./src ./src
