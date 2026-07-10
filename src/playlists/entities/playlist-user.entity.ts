import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Content } from '../../content/entities/content.entity';

@Entity({ name: 'playlist_user', schema: 'public' })
export class PlaylistUser {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ name: 'msisdn', type: 'varchar', nullable: true })
    msisdn: string | null;

    @Column({
        name: 'dateadded',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    dateAdded: Date;

    @Column({ name: 'channel', type: 'int' })
    channel: number;

    @ManyToOne(() => Content, {
        nullable: false,
        createForeignKeyConstraints: false,
    })
    @JoinColumn({ name: 'idcontent' })
    content: Content;
}
