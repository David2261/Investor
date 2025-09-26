FROM node:22 AS builder

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build

# --- Продакшен nginx ---
FROM nginx:1.24-alpine

COPY --from=builder /app/dist /usr/share/nginx/html

# Копируем кастомный nginx конфиг, если нужен
# COPY ./nginx/react.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
