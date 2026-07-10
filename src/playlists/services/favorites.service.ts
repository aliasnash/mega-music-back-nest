import { Injectable } from '@nestjs/common';
import { FavoritesRepository } from '../repositories/favorites.repository';
import { ContentItem } from '../../common/mappers/content.mapper';

@Injectable()
export class FavoritesService {
    constructor(private readonly favoritesRepository: FavoritesRepository) {}

    async getFavorites(msisdn: string): Promise<ContentItem[]> {
        return await this.favoritesRepository.getFavorites(msisdn);
    }

    async getFavoritesIds(msisdn: string): Promise<number[]> {
        return await this.favoritesRepository.getFavoritesIds(msisdn);
    }

    async updateFavorites(msisdn: string, status: number, trackId: number): Promise<{ status: string }> {
        if (status === 1) {
            await this.favoritesRepository.addFavorites(msisdn, trackId);
        } else if (status === -1) {
            await this.favoritesRepository.removeFavorites(msisdn, trackId);
        }

        return { status: 'ok' };
    }
}
