import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { MailTemplateEnum } from '../common/constant/enums/mail-template.enum';
/**
 * service d'envoi des emails
 */
@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) { }
  /**
   * envoi un email de 
   * @param email 
   * @param token 
   */
  public sendResetPassword(email: string, token: string, host: string, controler: string) {
    /**
        un bloc try and catch ne fonctionneraient pas ici
        et comme la fonction ne retourne rien
        il serait inutile de forcer une attente
        de toute manière la fonction n'est pas déclarée async
        donc le reste du code vas ettendre la fin de la promesse
    */

    this.mailerService.sendMail({
      to: email,
      from: 'noreply@nestjs.com', // sender address
      subject: 'Testing Nest MailerModule ✔', // Subject line
      template: MailTemplateEnum.resetPassword, // l'extension est ajoutée automatiquement
      context: {
        host,
        controler,
        email,
        token
      }
    })
      .catch((error) => {
        console.log(error);
      })
  }
}
