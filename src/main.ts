import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api');

    console.log('Настройка CORS...');
    app.enableCors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        allowedHeaders: ['Authorization', 'Content-Type', 'x-company-id'],
        credentials: true,
    });

    console.log('Настройка валидации...');
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        }),
    );

    console.log('Настройка Swagger...');
    const swaggerConfig = new DocumentBuilder()
        .setTitle('Music Box API')
        .setDescription('REST API музыкального сервиса Music Box')
        .setVersion('1.0')
        .addTag('Auth', 'Авторизация и OTP')
        .addTag('Content', 'Контент, исполнители и поиск')
        .addTag('Playlists', 'Плейлисты и подборки')
        .addTag('Favorites', 'Избранные треки')
        .addTag('Category', 'Категории')
        .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api-docs', app, document, {
        swaggerOptions: {
            docExpansion: 'none', // none, list, full
        },
    });

    app.use(bodyParser.json({ limit: '100mb' }));
    app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

    app.use((req, res, next) => {
        if (req.headers['content-type']?.includes('multipart/form-data')) {
            req.setTimeout(600000);
            res.setTimeout(600000);
        }
        next();
    });

    console.log('Подготовка к запуску сервера...');
    const port = process.env.PORT ?? 3000;
    const host = '0.0.0.0';

    await app.listen(port, host);

    console.log(`Application is running on: http://${host}:${port}`);
    console.log(`Swagger docs: http://${host}:${port}/api-docs`);
}
bootstrap();
