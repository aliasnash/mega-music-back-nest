import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryController } from './controllers/category.controller';
import { CategoryService } from './services/category.service';
import { CategoryRepository } from './repositories/category.repository';
import { ContentModule } from '../content/content.module';
import { Category } from './entities/category.entity';

@Module({
    imports: [ContentModule, TypeOrmModule.forFeature([Category])],
    controllers: [CategoryController],
    providers: [CategoryService, CategoryRepository],
})
export class CategoryModule {}
