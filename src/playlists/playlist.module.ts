import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaylistController } from './controllers/playlist.controller';
import { PlaylistService } from './services/playlist.service';
import { PlaylistRepository } from './repositories/playlist.repository';
import { Tops } from './entities/tops.entity';
import { FavoritesController } from './controllers/favorites.controller';
import { FavoritesService } from './services/favorites.service';
import { FavoritesRepository } from './repositories/favorites.repository';
import { PlaylistUser } from './entities/playlist-user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Tops, PlaylistUser])],
    controllers: [PlaylistController, FavoritesController],
    providers: [PlaylistService, PlaylistRepository, FavoritesService, FavoritesRepository],
    exports: [PlaylistService],
})
export class PlaylistModule {}
