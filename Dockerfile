FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY . .

EXPOSE 3000

ENV PORT=3000
ENV DB_PATH=/app/database/academic.db

CMD ["node", "server.js"]
