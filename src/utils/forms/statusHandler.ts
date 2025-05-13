import { Injectable } from '@angular/core';
import { IMesa } from 'src/@types/IMesa';
import { EnumStatusOptions } from 'src/@types/Enums/Status';

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
          action: EnumStatusOptions.Pronto,
        },
      },
      {
        text: 'Em produção',
        data: {
          action: EnumStatusOptions.EmProdutocao,
        },
      },
      {
        text: 'Aguardando confirmação da cozinha',
        data: {
          action: EnumStatusOptions.AguardandoConfirmacaoCozinha,
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

  atualizarStatusMesa(mesa: IMesa, novoStatus: EnumStatusOptions) {
    mesa.status = novoStatus
  }
}
