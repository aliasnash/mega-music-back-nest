import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ContentService } from '../services/content.service';
import { SearchContentDto } from '../dto/content.dto';
import { ArtistItemDto, ContentItemDto } from '../../common/dto/response.dto';
import { ArtistItem, ContentItem } from '../../common/mappers/content.mapper';

@ApiTags('Content')
@Controller('content')
export class ContentController {
    constructor(private readonly contentService: ContentService) {}

    @Get('random')
    @ApiOperation({ summary: 'Случайные треки', description: 'Возвращает список активных треков (по умолчанию до 10).' })
    @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Максимальное количество треков', example: 10 })
    @ApiResponse({ status: 200, description: 'Список треков', type: [ContentItemDto] })
    async getRandom(@Query('limit') limit?: string): Promise<ContentItem[]> {
        return await this.contentService.getRandomContent(limit !== undefined ? Number(limit) : undefined);
    }

    @Get('artists')
    @ApiOperation({ summary: 'Список исполнителей', description: 'Возвращает список исполнителей с пагинацией.' })
    @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Максимальное количество исполнителей', example: 10 })
    @ApiQuery({ name: 'offset', required: false, type: Number, description: 'Смещение для пагинации', example: 0 })
    @ApiResponse({ status: 200, description: 'Список исполнителей', type: [ArtistItemDto] })
    async getArtists(@Query('limit') limit?: string, @Query('offset') offset?: string): Promise<ArtistItem[]> {
        return await this.contentService.getArtists(limit !== undefined ? Number(limit) : undefined, offset !== undefined ? Number(offset) : undefined);
    }

    @Get('artist')
    @ApiOperation({ summary: 'Треки исполнителя', description: 'Возвращает все активные треки указанного исполнителя.' })
    @ApiQuery({ name: 'songer', required: true, type: String, description: 'Имя исполнителя', example: 'Artist Name' })
    @ApiResponse({ status: 200, description: 'Список треков исполнителя', type: [ContentItemDto] })
    async getArtist(@Query('songer') songer: string): Promise<ContentItem[]> {
        return await this.contentService.getArtist(songer);
    }

    @Post('search')
    @ApiOperation({ summary: 'Поиск треков', description: 'Ищет треки по названию или имени исполнителя.' })
    @ApiBody({ type: SearchContentDto })
    @ApiResponse({ status: 201, description: 'Результаты поиска', type: [ContentItemDto] })
    async search(@Body() body: SearchContentDto): Promise<ContentItem[]> {
        return await this.contentService.searchByTitleOrSinger(body.find, body.limit, body.offset);
    }
}
