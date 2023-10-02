import { MailerOptions } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { join } from "path";
/**
 * configuration mailer 
 * 
 */
export const mailerOpt: MailerOptions = {
  transport: {
    host: process.env.MAIL_SMTP_HOST,
    port: process.env.MAIL_SMTP_PORT,
    ignoreTLS: process.env.MAIL_IGNORETLS ? true : false,
    secure: process.env.MAIL_SECURE ? true : false,
    auth: {
      user: process.env.MAIL_SMTP_USER,
      pass: process.env.MAIL_SMTP_PASSWORD,
    },
  },
  defaults: {
    from: `"nest-modules" <${process.env.MAIL_ACCOUNT_SENDER!}>`,
  },
  preview: process.env.MAIL_PREVIEW ? true : false,
  template: {
    dir: join(__dirname, '..', '..', `${process.env.MAIL_TEMPLATE_DIRECTORY}`),
    adapter: new HandlebarsAdapter(),
    options: {
      strict: true,
    },
  },
};