import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryInfoItem, CategoryItem, mapCategoriesRowToItems, mapCategoryInfoRowToItems } from '../../common/mappers/content.mapper';
import { Category } from '../entities/category.entity';

@Injectable()
export class CategoryRepository {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
    ) {}

    async categoryList(): Promise<CategoryItem[]> {
        const rows = await this.categoryRepository.find({
            select: ['id', 'caption'],
            order: { sortBy: 'ASC' },
        });

        return rows.map(mapCategoriesRowToItems);
    }

    async categoryInfo(id: number): Promise<CategoryInfoItem | null> {
        const rows = await this.categoryRepository
            .createQueryBuilder('cat')
            .leftJoin('cat.contents', 'c', 'c.active = true')
            .select('cat.caption', 'category_name')
            .addSelect(`COUNT(DISTINCT CASE WHEN c.idcategory IS NOT NULL THEN (c.songer, c.cover_file_path) END)`, 'total_rows')
            .where('cat.id = :id', { id })
            .groupBy('cat.caption')
            .getRawMany<{
                category_name: string | null;
                total_rows: string;
            }>();

        if (rows.length === 0) {
            return null;
        }

        return mapCategoryInfoRowToItems(rows[0]);
    }
}
