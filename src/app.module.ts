import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ContentModule } from './content/content.module';
import { PlaylistModule } from './playlists/playlist.module';
import { CategoryModule } from './categories/category.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get<string>('DB_HOST', 'localhost'),
                port: configService.get<number>('DB_PORT', 5432),
                username: configService.get<string>('DB_USER', 'postgres'),
                password: configService.get<string>('DB_PASSWORD', 'postgres'),
                database: configService.get<string>('DB_NAME', 'musicbox'),
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
                synchronize: false,
                logging: false,
            }),
        }),
        AuthModule,
        ContentModule,
        PlaylistModule,
        CategoryModule,
    ],
})
export class AppModule {}
