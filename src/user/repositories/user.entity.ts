import { Exclude } from 'class-transformer';
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
    @Exclude() // la doc dit qu'en mettant ça on pouvais empêcher que la propriètée se retrouve exposée
    // les essais ne sont pas concluants
    @Column()
    password: string;
    /** prénom */
    @Column({ type: 'varchar', length: 64, default: '' })
    firstname: string;
    /** nom */
    @Column({ type: 'varchar', length: 128, default: '' })
    lastname: string;
    /** 
        un compte doit normalement être activé 
        par l'accé à un lien anvoyé par email
     */
    @Column({ type: 'boolean', default: false })
    enabled: boolean;
}
