import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
    name: 'user',
    orderBy: {
        email: 'ASC',
        id: 'DESC',
    },
})
/**
    base d'utilisateur 
    de l'API
 */
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 64 })
    email: string;

    @Column()
    password: string;
    /** prénom */
    @Column({ type: 'varchar', length: 64 })
    firstname: string;
    /** nom */
    @Column({ type: 'varchar', length: 128 })
    lastname: string;
    /** 
        un compte doit normalement être activé 
        par l'accé à un lien anvoyé par email
     */
    @Column({ type: 'boolean', default: false })
    enabled: boolean;
}
