import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from '../../categories/entities/category.entity';

@Entity({ name: 'content', schema: 'public' })
export class Content {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ name: 'songer', type: 'varchar', nullable: true })
    songer: string | null;

    @Column({ name: 'title', type: 'varchar', nullable: true })
    title: string | null;

    @Column({ name: 'author_w', type: 'varchar', nullable: true })
    authorW: string | null;

    @Column({ name: 'author_m', type: 'varchar', nullable: true })
    authorM: string | null;

    @Column({ name: 'album', type: 'varchar', nullable: true })
    album: string | null;

    @Column({ name: 'audio_file_path', type: 'varchar', nullable: true })
    audioFilePath: string | null;

    @Column({ name: 'cover_file_path', type: 'varchar', nullable: true })
    coverFilePath: string | null;

    @Column({ name: 'expired_date', type: 'timestamp', nullable: true })
    expiredDate: Date | null;

    @Column({ name: 'active', type: 'boolean', default: true })
    active: boolean;

    @ManyToOne(() => Category, (category) => category.contents, {
        nullable: true,
        createForeignKeyConstraints: false,
    })
    @JoinColumn({ name: 'idcategory' })
    category: Category | null;
}
