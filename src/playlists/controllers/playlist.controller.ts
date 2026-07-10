import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PlaylistService } from '../services/playlist.service';
import { ContentItemDto, PlaylistWithCoversItemDto } from '../../common/dto/response.dto';
import { ContentItem, PlaylistWithCoversItem } from '../../common/mappers/content.mapper';

@ApiTags('Playlists')
@Controller('playlist')
export class PlaylistController {
    constructor(private readonly playlistService: PlaylistService) {}

    @Get('news')
    @ApiOperation({ summary: 'Новинки', description: 'Возвращает треки из плейлиста новинок (id = 5).' })
    @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Максимальное количество треков', example: 10 })
    @ApiQuery({ name: 'offset', required: false, type: Number, description: 'Смещение для пагинации', example: 0 })
    @ApiResponse({ status: 200, description: 'Список треков', type: [ContentItemDto] })
    async getNews(@Query('limit') limit?: string, @Query('offset') offset?: string): Promise<ContentItem[]> {
        return await this.playlistService.getPlaylist(5, limit !== undefined ? Number(limit) : undefined, offset !== undefined ? Number(offset) : undefined);
    }

    @Get('pops')
    @ApiOperation({ summary: 'Популярное', description: 'Возвращает треки из плейлиста популярного (id = 8).' })
    @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Максимальное количество треков', example: 10 })
    @ApiQuery({ name: 'offset', required: false, type: Number, description: 'Смещение для пагинации', example: 0 })
    @ApiResponse({ status: 200, description: 'Список треков', type: [ContentItemDto] })
    async getPops(@Query('limit') limit?: string, @Query('offset') offset?: string): Promise<ContentItem[]> {
        return await this.playlistService.getPlaylist(8, limit !== undefined ? Number(limit) : undefined, offset !== undefined ? Number(offset) : undefined);
    }

    @Get('list')
    @ApiOperation({ summary: 'Список плейлистов', description: 'Возвращает доступные веб-плейлисты со случайными обложками треков.' })
    @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Максимальное количество плейлистов', example: 10 })
    @ApiResponse({ status: 200, description: 'Список плейлистов', type: [PlaylistWithCoversItemDto] })
    async getPlaylists(@Query('limit') limit?: string): Promise<PlaylistWithCoversItem[]> {
        return await this.playlistService.getPlaylists(limit !== undefined ? Number(limit) : undefined);
    }

    @Get('byid')
    @ApiOperation({ summary: 'Треки плейлиста', description: 'Возвращает треки указанного плейлиста с пагинацией.' })
    @ApiQuery({ name: 'id', required: true, type: Number, description: 'Идентификатор плейлиста', example: 1 })
    @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Максимальное количество треков', example: 10 })
    @ApiQuery({ name: 'offset', required: false, type: Number, description: 'Смещение для пагинации', example: 0 })
    @ApiResponse({ status: 200, description: 'Список треков плейлиста', type: [ContentItemDto] })
    async getPlaylist(@Query('id') id: string, @Query('limit') limit?: string, @Query('offset') offset?: string): Promise<ContentItem[]> {
        return await this.playlistService.getPlaylist(
            Number(id),
            limit !== undefined ? Number(limit) : undefined,
            offset !== undefined ? Number(offset) : undefined,
        );
    }
}
