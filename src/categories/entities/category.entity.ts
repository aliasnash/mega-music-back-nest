import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Content } from '../../content/entities/content.entity';

@Entity({ name: 'category', schema: 'public' })
export class Category {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ name: 'caption', type: 'varchar', nullable: true })
    caption: string | null;

    @Column({ name: 'sortby', type: 'int', default: 0 })
    sortBy: number;

    @OneToMany(() => Content, (content) => content.category)
    contents: Content[];
}
