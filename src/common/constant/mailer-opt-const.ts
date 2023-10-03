import { MailerOptions } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { join } from "path";
/**
 * configuration mailer 
 * 
 */
export const mailerOpt: MailerOptions = {
  transport: {
    className: 'smtp',// process.env.MAIL_DRIVER,
    host: '127.0.0.1',// process.env.MAIL_SMTP_HOST,
    port: 1025,// process.env.MAIL_SMTP_PORT,
    secure: false,//process.env.MAIL_SECURE ? true : false,
    secureConnexion: false,
    ignoreTLS: true, //process.env.MAIL_IGNORETLS ? true : false,
    logger: true,
    debug: true,
    tls: {
      rejectUnauthorized: false,
    },
    timeout: 30,

    client: null,
    auth: {
      user: 'project.1',
      pass: 'secret.1'

      // user: process.env.MAIL_SMTP_USER,
      // pass: process.env.MAIL_SMTP_PASSWORD,
    },

  },
  defaults: {
    from: `"nest-modules" <${process.env.MAIL_ACCOUNT_SENDER!}>`,
  },
  template: {
    dir: join(__dirname, '..', '..', `${process.env.MAIL_TEMPLATE_DIRECTORY}`),
    adapter: new HandlebarsAdapter(),
    options: {
      strict: true,
    },

  }, options: {
    partials: {
      dir: join(__dirname, '..', '..', `${process.env.MAIL_TEMPLATE_DIRECTORY}/partials`),
      options: {
        strict: true,
      },
    },
  },
};
