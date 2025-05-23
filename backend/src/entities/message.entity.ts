import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Message {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ nullable: false })
    email: string;

    @Column()
    fullName: string;

    @Column('text')
    message: string;

    @CreateDateColumn()
    createdAt: Date;
}
