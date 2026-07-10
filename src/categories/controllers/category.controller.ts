import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CategoryService } from '../services/category.service';
import { ArtistItemDto, CategoryInfoItemDto, CategoryItemDto } from '../../common/dto/response.dto';
import { ArtistItem, CategoryInfoItem, CategoryItem } from '../../common/mappers/content.mapper';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Get('list')
    @ApiOperation({ summary: 'Список категорий', description: 'Возвращает все категории, отсортированные по полю sortBy.' })
    @ApiResponse({ status: 200, description: 'Список категорий', type: [CategoryItemDto] })
    categoryList(): Promise<CategoryItem[]> {
        return this.categoryService.categoryList();
    }

    @Get('info')
    @ApiOperation({ summary: 'Информация о категории', description: 'Возвращает название категории и количество уникальных исполнителей в ней.' })
    @ApiQuery({ name: 'id', required: true, type: Number, description: 'Идентификатор категории', example: 1 })
    @ApiResponse({ status: 200, description: 'Информация о категории', type: CategoryInfoItemDto })
    categoryInfo(@Query('id') id: string): Promise<CategoryInfoItem | null> {
        return this.categoryService.categoryInfo(Number(id));
    }

    @Get('artists')
    @ApiOperation({ summary: 'Исполнители категории', description: 'Возвращает исполнителей указанной категории с пагинацией.' })
    @ApiQuery({ name: 'id', required: true, type: Number, description: 'Идентификатор категории', example: 1 })
    @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Максимальное количество исполнителей', example: 10 })
    @ApiQuery({ name: 'offset', required: false, type: Number, description: 'Смещение для пагинации', example: 0 })
    @ApiResponse({ status: 200, description: 'Список исполнителей категории', type: [ArtistItemDto] })
    getArtistsByCategory(@Query('id') id: string, @Query('limit') limit?: string, @Query('offset') offset?: string): Promise<ArtistItem[]> {
        return this.categoryService.getArtistsByCategory(
            Number(id),
            limit !== undefined ? Number(limit) : undefined,
            offset !== undefined ? Number(offset) : undefined,
        );
    }
}
