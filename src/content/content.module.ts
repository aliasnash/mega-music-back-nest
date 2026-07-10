import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentController } from './controllers/content.controller';
import { ContentService } from './services/content.service';
import { ContentRepository } from './repositories/content.repository';
import { Content } from './entities/content.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Content])],
    controllers: [ContentController],
    providers: [ContentService, ContentRepository],
    exports: [ContentService, ContentRepository],
})
export class ContentModule {}
