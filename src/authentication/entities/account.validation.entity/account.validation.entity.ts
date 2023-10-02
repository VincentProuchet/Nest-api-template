import { UserEntity } from "src/user/entities/user.entity";
import { CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
/**
 * token de validation de comptes utilisateurs
 */
@Entity()
export class AccountValidationEntity {

  /** 
token de réinitialisation de mot de passe
 */
  @PrimaryColumn({ type: 'varchar', unique: true, length: 128 })
  token: string;
  /**
   utilisateur associé au token
   */
  @OneToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;

  @CreateDateColumn()
  creation: Date;
}
