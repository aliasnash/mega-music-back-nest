import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '../repositories/category.repository';
import { ContentService } from '../../content/services/content.service';
import { ArtistItem, CategoryInfoItem, CategoryItem } from '../../common/mappers/content.mapper';

@Injectable()
export class CategoryService {
    constructor(
        private readonly categoryRepository: CategoryRepository,
        private readonly contentService: ContentService,
    ) {}

    async categoryList(): Promise<CategoryItem[]> {
        return await this.categoryRepository.categoryList();
    }

    async categoryInfo(id: number): Promise<CategoryInfoItem | null> {
        return await this.categoryRepository.categoryInfo(id);
    }

    async getArtistsByCategory(id: number, limit?: number, offset?: number): Promise<ArtistItem[]> {
        return await this.contentService.getArtistsByCategory(id, limit, offset);
    }
}
