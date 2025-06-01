import { IonButton, IonActionSheet } from '@ionic/angular/standalone';
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IPedidosPorMesa } from 'src/@types/IPedidosPorMesa';
import { StatusHandler } from 'src/utils/forms/statusHandler';
import { PedidosFirestoreService } from 'src/utils/services/firestore/pedidos-firestore.service';
import { NotificationsServiceService } from 'src/utils/services/notifications/notifications-service.service';
import { Capacitor } from '@capacitor/core';
@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss'],
  imports: [IonActionSheet, CommonModule, IonButton],
})
export class CardItemComponent implements OnInit {
  @Input({ required: true }) mesa!: IPedidosPorMesa;
  statusButtons: any[] = [];

  constructor(
    private statusHandler: StatusHandler,
    private pedidosService: PedidosFirestoreService,
    private notificationsService: NotificationsServiceService
  ) {}

  ngOnInit() {}

  ngOnChanges() {
    if (this.mesa) {
      this.statusButtons = this.statusHandler.getStatus();
    }
  }

  getStatus() {
    return this.statusHandler.getStatus();
  }

  getStatusClass(status: string): { [key: string]: boolean } {
    const statusMap: Record<string, string> = {
      Pronto: 'pronto',
      'Em Produção': 'em-producao',
      'Aguardando confirmação da cozinha': 'aguardando',
      Entregue: 'entregue',
    };

    const normalizedStatus =
      statusMap[status] ||
      status
        .toLowerCase()
        .replace(/\s+/g, '-')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

    return { [normalizedStatus]: true };
  }

  handleStatusChange(event: CustomEvent, mesa: IPedidosPorMesa) {
    const novoStatus = this.statusHandler.handleStatusChange(event, mesa);
    this.pedidosService.updateDocumentStatusByDocId(mesa.id, novoStatus);

    if (Capacitor.isNativePlatform()) {
      this.NotificarAlteracaoStatus();
    }
  }

  async NotificarAlteracaoStatus() {
    const hasPermission = await this.notificationsService.requestPermission();

    if (hasPermission) {
      const scheduleTime = new Date();
      scheduleTime.setSeconds(scheduleTime.getSeconds() + 5);

      await this.notificationsService.scheduleSingleNotification(
        'Status de pedido alterado',
        'Verifique o status dos pedidos afim de garantir maior eficiencia ao time!',
        scheduleTime
      );
    } else {
      console.error('Permissão para notificações negada');
    }
  }

  getTranslatedStatus(status: string): string {
    const statusTranslations: Record<string, string> = {
      Pronto: 'Pronto',
      'Em Produção': 'Em Produção',
      'Aguardando confirmação da cozinha': 'Aguardando',
      Entregue: 'Entregue',
    };

    return statusTranslations[status] || status;
  }
}
