import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContentItem, mapContentRowToNewsItem } from '../../common/mappers/content.mapper';
import { PlaylistUser } from '../entities/playlist-user.entity';

@Injectable()
export class FavoritesRepository {
    constructor(
        @InjectRepository(PlaylistUser)
        private readonly playlistUserRepository: Repository<PlaylistUser>,
    ) {}

    async getFavorites(msisdn: string): Promise<ContentItem[]> {
        const rows = await this.playlistUserRepository
            .createQueryBuilder('p')
            .leftJoin('p.content', 'c')
            .select(['c.id AS id', 'c.title AS title', 'c.songer AS songer', 'c.audioFilePath AS audio_file_path', 'c.coverFilePath AS cover_file_path'])
            .where('c.id IS NOT NULL')
            .andWhere('c.active = true')
            .andWhere('p.msisdn = :msisdn', { msisdn })
            .orderBy('p.id', 'DESC')
            .getRawMany<{
                id: number;
                title: string | null;
                songer: string | null;
                audio_file_path: string | null;
                cover_file_path: string | null;
            }>();

        return rows.map(mapContentRowToNewsItem);
    }

    async getFavoritesIds(msisdn: string): Promise<number[]> {
        const rows = await this.playlistUserRepository
            .createQueryBuilder('p')
            .leftJoin('p.content', 'c')
            .select('c.id', 'idcontent')
            .where('p.msisdn = :msisdn', { msisdn })
            .orderBy('p.id', 'DESC')
            .getRawMany<{ idcontent: number | null }>();

        return rows.map((row) => row.idcontent).filter((id): id is number => id != null);
    }

    async addFavorites(msisdn: string, trackId: number): Promise<void> {
        const existing = await this.playlistUserRepository.findOne({
            where: {
                msisdn,
                content: { id: trackId },
            },
        });

        if (existing) {
            return;
        }

        await this.playlistUserRepository.save(
            this.playlistUserRepository.create({
                msisdn,
                channel: 3,
                content: { id: trackId },
            }),
        );
    }

    async removeFavorites(msisdn: string, trackId: number): Promise<void> {
        await this.playlistUserRepository
            .createQueryBuilder()
            .delete()
            .where('msisdn = :msisdn', { msisdn })
            .andWhere('idcontent = :trackId', { trackId })
            .execute();
    }
}
