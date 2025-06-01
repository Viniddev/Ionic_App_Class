import { Injectable } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';

@Injectable({
  providedIn: 'root',
})
export class NotificationsServiceService {
  constructor() {}

  // Solicitar permissão para notificações
  async requestPermission(): Promise<boolean> {
    try {
      const result = await LocalNotifications.requestPermissions();
      return result.display === 'granted';
    } catch (error) {
      console.error('Error requesting notification permissions:', error);
      return false;
    }
  }

  // Agendar uma notificação única
  async scheduleSingleNotification(
    title: string,
    body: string,
    scheduleTime: Date,
    id?: number
  ) {
    const notificationId = id || Math.floor(Math.random() * 10000);

    await LocalNotifications.schedule({
      notifications: [
        {
          title: title,
          body: body,
          id: notificationId,
          schedule: { at: scheduleTime },
          sound: 'default',
          attachments: null,
          actionTypeId: '',
          extra: null,
        },
      ],
    });
  }

  // Agendar notificações recorrentes
  async scheduleRepeatingNotification(
    title: string,
    body: string,
    interval: 'daily' | 'weekly',
    id?: number
  ) {
    const notificationId = id || Math.floor(Math.random() * 10000);

    await LocalNotifications.schedule({
      notifications: [
        {
          title: title,
          body: body,
          id: notificationId,
          schedule: {
            every: 'hour',
            count: 9999,
          },
          sound: 'default',
          attachments: null,
          actionTypeId: '',
          extra: null,
        },
      ],
    });
  }

  // Cancelar todas as notificações
  async cancelAllNotifications() {
    await LocalNotifications.cancel({
      notifications: [],
    });
  }

  // Cancelar uma notificação específica
  async cancelNotification(notificationId: number) {
    await LocalNotifications.cancel({
      notifications: [{ id: notificationId }],
    });
  }

  // Obter notificações agendadas
  async getScheduledNotifications() {
    return await LocalNotifications.getPending();
  }
}
