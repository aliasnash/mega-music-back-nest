import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users', schema: 'public' })
export class User {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ name: 'msisdn', type: 'varchar', nullable: true })
    msisdn: string | null;

    @Column({ name: 'dateadded', type: 'timestamp' })
    dateAdded: Date;

    @Column({ name: 'channel', type: 'int' })
    channel: number;

    @Column({ name: 'ispayed', type: 'boolean', default: false })
    isPayed: boolean;

    @Column({ name: 'datenextpay', type: 'timestamp', nullable: true })
    dateNextPay: Date | null;

    @Column({ name: 'payerrorcounter', type: 'int', default: 0 })
    payErrorCounter: number;

    @Column({ name: 'paylockmarker', type: 'int', default: 0 })
    payLockMarker: number;

    @Column({ name: 'idoperator', type: 'int' })
    idOperator: number;
}
