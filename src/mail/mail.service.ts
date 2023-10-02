import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/user/entities/user.entity';
/**
 * service d'envoi des emails
 */
@Injectable()
export class MailService {

  constructor(private mailerService: MailerService) { }
  /**
   * envoi un email de 
   * @param user 
   * @param token 
   */
  public sendResetPassword(user: UserEntity, token: string): void {
    /**
        un bloc try and catch ne fonctionneraient pas ici
        et comme la fonction ne retourne rien
        il serait inutile de forcer une attente
        de toute manière la fonction n'est pas déclarée async
        donc le reste du code vas ettendre la fin de la promesse
    */

    this.mailerService.sendMail({
      to: user.email,
      from: 'noreply@nestjs.com', // sender address
      subject: 'Testing Nest MailerModule ✔', // Subject line
      template: 'resetPassord', // l'extension est ajoutée automatiquement
      context: {
        user: {
          name: user.lastname,
          firstname: user.firstname
        },
        token: token
      }
    })
  }

  public sendValidateAccount(): void {


  }

}
