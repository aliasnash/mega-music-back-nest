import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users_history', schema: 'public' })
export class UsersHistory {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ name: 'msisdn', type: 'varchar', nullable: true })
    msisdn: string | null;

    @Column({ name: 'dateadded', type: 'timestamp' })
    dateAdded: Date;

    @Column({ name: 'useraction', type: 'int' })
    userAction: number;

    @Column({ name: 'information', type: 'varchar', nullable: true })
    information: string | null;

    @Column({ name: 'offreason', type: 'int', default: 0 })
    offReason: number;
}
