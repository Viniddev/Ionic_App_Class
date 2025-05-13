import { Injectable } from '@angular/core';
import { IMesa } from 'src/@types/IMesa';
import { StatusOptions } from 'src/@types/Status';

@Injectable({
  providedIn: 'root'
})
export class StatusHandler {
  mesa: IMesa;

  public getStatus() {
    return [
      {
        text: 'Pronto',
        data: {
          action: StatusOptions.Pronto,
        },
      },
      {
        text: 'Em produção',
        data: {
          action: StatusOptions.EmProdutocao,
        },
      },
      {
        text: 'Aguardando confirmação da cozinha',
        data: {
          action: StatusOptions.AguardandoConfirmacaoCozinha,
        },
      },
      {
        text: 'Cancelar',
        role: 'cancel',
      },
    ];
  }

  handleStatusChange(event: CustomEvent, mesa: IMesa) {
    const acao = event.detail.data?.action;
    if (event.detail.role !== 'cancel' && acao) {
      this.atualizarStatusMesa(mesa, acao);
    }
  }

  atualizarStatusMesa(mesa: IMesa, novoStatus: StatusOptions) {
    mesa.status = novoStatus
  }
}
