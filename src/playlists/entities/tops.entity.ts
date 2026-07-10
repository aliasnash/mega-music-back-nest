import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PlaylistSystem } from './playlist-system.entity';

@Entity({ name: 'tops', schema: 'public' })
export class Tops {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ name: 'title', type: 'varchar', nullable: true })
    title: string | null;

    @Column({ name: 'cover_path', type: 'varchar', nullable: true })
    coverPath: string | null;

    @Column({ name: 'web_available', type: 'boolean', default: false })
    webAvailable: boolean;

    @Column({ name: 'description', type: 'varchar', nullable: true })
    description: string | null;

    @OneToMany(() => PlaylistSystem, (playlist) => playlist.top)
    playlistItems: PlaylistSystem[];
}
