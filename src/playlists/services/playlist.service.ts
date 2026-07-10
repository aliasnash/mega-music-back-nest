import { Injectable } from '@nestjs/common';
import { PlaylistRepository } from '../repositories/playlist.repository';
import { ContentItem, PlaylistWithCoversItem } from '../../common/mappers/content.mapper';

@Injectable()
export class PlaylistService {
    constructor(private readonly playlistRepository: PlaylistRepository) {}

    async getPlaylists(limit?: number): Promise<PlaylistWithCoversItem[]> {
        return await this.playlistRepository.getPlaylists(limit ?? 10);
    }

    async getPlaylist(id: number, limit?: number, offset?: number): Promise<ContentItem[]> {
        return await this.playlistRepository.getPlaylist(id, Number(limit ?? 10), Number(offset ?? 0));
    }
}
