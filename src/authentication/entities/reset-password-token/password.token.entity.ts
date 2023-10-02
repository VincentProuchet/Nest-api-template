
import { UserEntity } from "src/user/entities/user.entity";
import { CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
@Entity({
  name: 'reset_password_token',
  orderBy: {
    token: 'ASC'
  }
})
export class PasswordTokenEntity {
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
