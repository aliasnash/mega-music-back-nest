import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ContentItemDto {
    @ApiProperty({ description: 'Идентификатор трека', example: 123 })
    id: number;

    @ApiPropertyOptional({ description: 'Название трека', example: 'Song Title', nullable: true })
    title: string | null;

    @ApiPropertyOptional({ description: 'Исполнитель', example: 'Artist Name', nullable: true })
    artist: string | null;

    @ApiPropertyOptional({ description: 'Путь к аудиофайлу', example: '/audio/track.mp3', nullable: true })
    file: string | null;

    @ApiPropertyOptional({ description: 'Путь к обложке', example: '/covers/track.jpg', nullable: true })
    cover: string | null;
}

export class ArtistItemDto {
    @ApiPropertyOptional({ description: 'Имя исполнителя', example: 'Artist Name', nullable: true })
    songer: string | null;

    @ApiPropertyOptional({ description: 'Путь к обложке исполнителя', example: '/covers/artist.jpg', nullable: true })
    cover: string | null;

    @ApiProperty({ description: 'Количество треков исполнителя', example: 12 })
    tracks: number;
}

export class PlaylistWithCoversItemDto {
    @ApiProperty({ description: 'Идентификатор плейлиста', example: 1 })
    id: number;

    @ApiPropertyOptional({ description: 'Название плейлиста', example: 'Top Hits', nullable: true })
    title: string | null;

    @ApiPropertyOptional({ description: 'Описание плейлиста', example: 'Популярные треки недели', nullable: true })
    description: string | null;

    @ApiProperty({ description: 'Количество треков в плейлисте', example: 25 })
    tracks: number;

    @ApiProperty({ description: 'Случайные обложки треков плейлиста', type: [String], nullable: true, example: ['/covers/1.jpg', '/covers/2.jpg'] })
    covers: (string | null)[];
}

export class CategoryItemDto {
    @ApiProperty({ description: 'Идентификатор категории', example: 1 })
    id: number;

    @ApiPropertyOptional({ description: 'Название категории', example: 'Pop', nullable: true })
    caption: string | null;
}

export class CategoryInfoItemDto {
    @ApiPropertyOptional({ description: 'Название категории', example: 'Pop', nullable: true })
    caption: string | null;

    @ApiProperty({ description: 'Количество уникальных исполнителей в категории', example: 42 })
    count: number;
}

export class AuthCodeResponseDto {
    @ApiProperty({ description: 'Код результата операции', example: 0 })
    code: number;
}

export class StatusResponseDto {
    @ApiProperty({ description: 'Статус операции', example: 'ok' })
    status: string;
}
