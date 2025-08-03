FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

EXPOSE 3000

# 開発用なら
# CMD ["npm", "run", "dev"]

# 本番用なら（環境によって切り替えてOK）
RUN npm run build
CMD ["npm", "start"]
