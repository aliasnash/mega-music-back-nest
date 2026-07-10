import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContentItem, PlaylistWithCoversItem, mapContentRowToNewsItem, mapPlaylistWithCoversRowToNewsItem } from '../../common/mappers/content.mapper';
import { Tops } from '../entities/tops.entity';

@Injectable()
export class PlaylistRepository {
    constructor(
        @InjectRepository(Tops)
        private readonly topsRepository: Repository<Tops>,
    ) {}

    async getPlaylists(limit = 10): Promise<PlaylistWithCoversItem[]> {
        const rows = await this.topsRepository.query(
            `WITH ranked_content AS (SELECT t.id,
                                      t.title,
                                      t.description,
                                      c.cover_file_path,
                                      COUNT(*) OVER (PARTITION BY t.id) AS content_count, ROW_NUMBER() OVER (PARTITION BY t.id ORDER BY RANDOM()) AS rn
                               FROM public.tops t
                                        LEFT JOIN public.playlist_system p ON t.id = p.idtop
                                        LEFT JOIN public.content c ON p.idcontent = c.id
                               WHERE t.web_available = true)
       SELECT id,
              title,
              description,
              content_count,
              JSON_AGG(cover_file_path) AS random_covers
       FROM ranked_content
       WHERE rn <= 4
       GROUP BY id, title, description, content_count
       ORDER BY id, title, description
           LIMIT $1`,
            [limit],
        );

        return rows.map(mapPlaylistWithCoversRowToNewsItem);
    }

    async getPlaylist(id: number, limit: number, offset: number): Promise<ContentItem[]> {
        const rows = await this.topsRepository
            .createQueryBuilder('t')
            .leftJoin('t.playlistItems', 'p')
            .leftJoin('p.content', 'c')
            .select(['c.id AS id', 'c.title AS title', 'c.songer AS songer', 'c.audioFilePath AS audio_file_path', 'c.coverFilePath AS cover_file_path'])
            .where('t.id = :id', { id })
            .andWhere('c.active = true')
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
}
