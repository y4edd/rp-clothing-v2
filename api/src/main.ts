import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as YAML from 'yaml';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  // Swagger/OpenAPI のメタ情報を定義
  const config = new DocumentBuilder()
    .setTitle('サンプルAPI')
    .setDescription('サンプルAPIの紹介')
    .setVersion('1.0')
    .build();

  // Nest アプリから Swagger 用ドキュメントを生成（JS オブジェクト形式）
  const document = SwaggerModule.createDocument(app, config);

  // YAML 形式に変換してファイルに書き出し、openapi.yaml生成
  const yamlDoc = YAML.stringify(document);
  fs.writeFileSync('./openapi.yaml', yamlDoc, 'utf8');
  logger.log('openapi.yaml生成');

  // Swagger UI を `/docs` にセットアップ
  SwaggerModule.setup('docs', app, document);

  // サーバー起動
  const port = process.env.PORT ?? 8080;
  await app.listen(port);

  // ログ出力
  logger.log(`API URL is here: http://localhost:${port}`);
  logger.log(`Docs is here: http://localhost:${port}/docs`);
}
bootstrap();
