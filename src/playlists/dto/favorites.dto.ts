import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class FavoritesMsisdnDto {
    @ApiPropertyOptional({ description: 'Номер телефона (MSISDN)', example: '79001234567' })
    @IsOptional()
    @IsString()
    msisdn?: string;
}

export class UpdateFavoritesDto {
    @ApiProperty({ description: 'Номер телефона (MSISDN)', example: '79001234567' })
    @IsString()
    @IsNotEmpty()
    msisdn: string;

    @ApiProperty({ description: 'Действие: 1 — добавить в избранное, -1 — удалить', example: 1, enum: [1, -1] })
    @Type(() => Number)
    @IsInt()
    @IsIn([1, -1])
    status: number;

    @ApiProperty({ description: 'Идентификатор трека', example: 123 })
    @Type(() => Number)
    @IsInt()
    trackId: number;
}
