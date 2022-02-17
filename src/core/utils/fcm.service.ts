import { Injectable } from '@nestjs/common';

import * as firebaseAdmin from 'firebase-admin';

@Injectable()
export class FcmService {
  async #initializeFirebaseAdmin() {
    console.log('initialize firebase');
    if (firebaseAdmin.apps.length == 0) {
      firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        }),
      });
    }
  }

  async sendNotification(
    deviceIds: string[],
    payload: firebaseAdmin.messaging.MessagingPayload,
    silent: boolean,
  ) {
    try {
      await this.#initializeFirebaseAdmin();

      const options = {
        priority: 'high',
        timeToLive: 60 * 60 * 24,
      };

      const optionsSilent = {
        priority: 'high',
        timeToLive: 60 * 60 * 24,
        content_available: true,
      };

      await firebaseAdmin
        .messaging()
        .sendToDevice(deviceIds, payload, silent ? optionsSilent : options);
    } catch (err) {
      throw err;
    }
  }
}
