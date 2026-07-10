import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArtistItem, ContentItem, mapArtistsRowToNewsItem, mapContentRowToNewsItem } from '../../common/mappers/content.mapper';
import { Content } from '../entities/content.entity';

@Injectable()
export class ContentRepository {
    constructor(
        @InjectRepository(Content)
        private readonly contentRepository: Repository<Content>,
    ) {}

    async getRandomContent(limit = 10): Promise<ContentItem[]> {
        const rows = await this.contentRepository
            .createQueryBuilder('c')
            .select(['c.id AS id', 'c.title AS title', 'c.songer AS songer', 'c.audioFilePath AS audio_file_path', 'c.coverFilePath AS cover_file_path'])
            .where('c.active = true')
            .orderBy('c.id')
            .limit(limit)
            .getRawMany<{
                id: number;
                title: string | null;
                songer: string | null;
                audio_file_path: string | null;
                cover_file_path: string | null;
            }>();

        console.log('r', rows);

        return rows.map(mapContentRowToNewsItem);
    }

    async searchByTitleOrSinger(find: string, limit: number, offset: number): Promise<ContentItem[]> {
        const rows = await this.contentRepository
            .createQueryBuilder('c')
            .select(['c.id AS id', 'c.title AS title', 'c.songer AS songer', 'c.audioFilePath AS audio_file_path', 'c.coverFilePath AS cover_file_path'])
            .where('c.active = true')
            .andWhere('(LOWER(c.songer) LIKE :find OR LOWER(c.title) LIKE :find)', {
                find: `%${find}%`,
            })
            .orderBy('c.id')
            .limit(limit)
            .offset(offset)
            .getRawMany<{
                id: number;
                title: string | null;
                songer: string | null;
                audio_file_path: string | null;
                cover_file_path: string | null;
            }>();

        return rows.map(mapContentRowToNewsItem);
    }

    async getArtists(limit: number, offset: number): Promise<ArtistItem[]> {
        const rows = await this.contentRepository
            .createQueryBuilder('c')
            .select('c.songer', 'songer')
            .addSelect('c.coverFilePath', 'cover_file_path')
            .addSelect('COUNT(c.id)', 'contentCount')
            .where('c.active = true')
            .groupBy('c.songer')
            .addGroupBy('c.coverFilePath')
            .orderBy('c.songer')
            .limit(limit)
            .offset(offset)
            .getRawMany<{
                songer: string | null;
                cover_file_path: string | null;
                contentCount: number;
            }>();

        return rows.map(mapArtistsRowToNewsItem);
    }

    async getArtist(songer: string): Promise<ContentItem[]> {
        const rows = await this.contentRepository
            .createQueryBuilder('c')
            .select(['c.id AS id', 'c.title AS title', 'c.songer AS songer', 'c.audioFilePath AS audio_file_path', 'c.coverFilePath AS cover_file_path'])
            .where('c.songer = :songer', { songer })
            .andWhere('c.active = true')
            .orderBy('c.id')
            .getRawMany<{
                id: number;
                title: string | null;
                songer: string | null;
                audio_file_path: string | null;
                cover_file_path: string | null;
            }>();

        return rows.map(mapContentRowToNewsItem);
    }

    async getArtistsByCategory(id: number, limit: number, offset: number): Promise<ArtistItem[]> {
        const rows = await this.contentRepository
            .createQueryBuilder('c')
            .leftJoin('c.category', 'g')
            .select('c.songer', 'songer')
            .addSelect('c.coverFilePath', 'cover_file_path')
            .addSelect('COUNT(c.id)', 'contentCount')
            .where('g.id = :id', { id })
            .andWhere('c.active = true')
            .groupBy('c.songer')
            .addGroupBy('c.coverFilePath')
            .orderBy('c.songer')
            .limit(limit)
            .offset(offset)
            .getRawMany<{
                songer: string | null;
                cover_file_path: string | null;
                contentCount: number;
            }>();

        return rows.map(mapArtistsRowToNewsItem);
    }
}
