import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class SearchContentDto {
    @ApiProperty({ description: 'Строка поиска по названию или исполнителю', example: 'beatles' })
    @IsString()
    @IsNotEmpty()
    find: string;

    @ApiPropertyOptional({ description: 'Лимит записей', example: 10, default: 10 })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    limit?: number;

    @ApiPropertyOptional({ description: 'Смещение для пагинации', example: 0, default: 0 })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(0)
    offset?: number;
}
