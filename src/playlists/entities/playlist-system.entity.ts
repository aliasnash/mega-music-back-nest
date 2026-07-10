import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Content } from '../../content/entities/content.entity';
import { Tops } from './tops.entity';

@Entity({ name: 'playlist_system', schema: 'public' })
export class PlaylistSystem {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ name: 'position', type: 'int', default: 0 })
    position: number;

    @ManyToOne(() => Content, {
        nullable: false,
        createForeignKeyConstraints: false,
    })
    @JoinColumn({ name: 'idcontent' })
    content: Content;

    @ManyToOne(() => Tops, (top) => top.playlistItems, {
        nullable: false,
        createForeignKeyConstraints: false,
    })
    @JoinColumn({ name: 'idtop' })
    top: Tops;
}
