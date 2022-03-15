import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

import { STATUS_CODE } from 'src/core/constants/status_code';
import { MESSAGES } from 'src/core/constants/messages';

export class MailServiceInput {
  subject: string;
  receivers: string[];
  templateContext: any;
  template: string
}

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(payload: MailServiceInput) {
    return new Promise((resolve,reject) => {
      this.mailerService
      .sendMail({
        to: payload.receivers,
        from: process.env.MAIL_USER,
        subject: payload.subject,
        template: payload.template,
        context: payload.templateContext,
      })
      .then((data) => {
        resolve({
          statusCode: STATUS_CODE.SUCCESS,
          message: MESSAGES.SUCCESS,
        });
      })
      .catch((error) => {
        reject({
          statusCode: STATUS_CODE.SUCCESS,
          message: error
        });
      });
    });
  }
}
