FROM node:20-alpine

# 作業ディレクトリを作成
WORKDIR /app

# パッケージファイルをコピーして依存関係をインストール
COPY package.json package-lock.json ./
RUN npm install

# Prisma schemaやソースコードをコピー
COPY . .

# ポートを開ける（NestJSのデフォルトポート）
EXPOSE 4000

# NestJSのビルド
RUN npm run build

# 本番起動用
CMD ["npm", "run", "start:prod"]

# prisma generate + dev起動は docker-compose.yml 側に書いてあるので不要
# ここではビルドだけでOK
