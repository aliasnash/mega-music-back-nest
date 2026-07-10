import { Controller, Post, Body } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FavoritesService } from '../services/favorites.service';
import { FavoritesMsisdnDto, UpdateFavoritesDto } from '../dto/favorites.dto';
import { ContentItemDto, StatusResponseDto } from '../../common/dto/response.dto';
import { ContentItem } from '../../common/mappers/content.mapper';

@ApiTags('Favorites')
@Controller('favorites')
export class FavoritesController {
    constructor(private readonly favoritesService: FavoritesService) {}

    @Post()
    @ApiOperation({ summary: 'Получить избранные треки', description: 'Возвращает список избранных треков пользователя.' })
    @ApiBody({ type: FavoritesMsisdnDto })
    @ApiResponse({ status: 201, description: 'Список избранных треков', type: [ContentItemDto] })
    async getFavorites(@Body() body: FavoritesMsisdnDto): Promise<ContentItem[]> {
        return await this.favoritesService.getFavorites(body?.msisdn ?? '');
    }

    @Post('ids')
    @ApiOperation({ summary: 'Получить ID избранных треков', description: 'Возвращает массив идентификаторов избранных треков.' })
    @ApiBody({ type: FavoritesMsisdnDto })
    @ApiResponse({
        status: 201,
        description: 'Массив ID треков',
        schema: {
            type: 'array',
            items: { type: 'number', example: 123 },
        },
    })
    async getFavoritesIds(@Body() body: FavoritesMsisdnDto): Promise<number[]> {
        return await this.favoritesService.getFavoritesIds(body?.msisdn ?? '');
    }

    @Post('update')
    @ApiOperation({ summary: 'Обновить избранное', description: 'Добавляет трек в избранное (status = 1) или удаляет его (status = -1).' })
    @ApiBody({ type: UpdateFavoritesDto })
    @ApiResponse({ status: 201, description: 'Операция выполнена успешно', type: StatusResponseDto })
    async updateFavorites(@Body() body: UpdateFavoritesDto): Promise<StatusResponseDto> {
        return await this.favoritesService.updateFavorites(body.msisdn, body.status, body.trackId);
    }
}
