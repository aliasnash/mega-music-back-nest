import { Injectable } from '@nestjs/common';
import { ContentRepository } from '../repositories/content.repository';
import { ArtistItem, ContentItem } from '../../common/mappers/content.mapper';

@Injectable()
export class ContentService {
    constructor(private readonly contentRepository: ContentRepository) {}

    async getRandomContent(limit?: number): Promise<ContentItem[]> {
        return await this.contentRepository.getRandomContent(limit ?? 10);
    }

    async searchByTitleOrSinger(find: string, limit?: number, offset?: number): Promise<ContentItem[]> {
        return await this.contentRepository.searchByTitleOrSinger(find.toLowerCase(), limit ?? 10, offset ?? 0);
    }

    async getArtists(limit?: number, offset?: number): Promise<ArtistItem[]> {
        return await this.contentRepository.getArtists(Number(limit ?? 10), Number(offset ?? 0));
    }

    async getArtist(songer: string): Promise<ContentItem[]> {
        return await this.contentRepository.getArtist(songer);
    }

    async getArtistsByCategory(id: number, limit?: number, offset?: number): Promise<ArtistItem[]> {
        return await this.contentRepository.getArtistsByCategory(id, Number(limit ?? 10), Number(offset ?? 0));
    }
}
