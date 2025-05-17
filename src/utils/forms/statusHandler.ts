import { Injectable } from '@angular/core';
import { IPedidosPorMesa } from 'src/@types/IPedidosPorMesa';
import { EnumStatusOptions } from 'src/@types/Enums/Status';

@Injectable({
  providedIn: 'root',
})
export class StatusHandler {
  mesa: IPedidosPorMesa;

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
        text: 'Entregue',
        data: {
          action: EnumStatusOptions.Entregue,
        }
      },
      {
        text: 'Cancelar',
        role: 'cancel',
      },
    ];
  }

  handleStatusChange(event: CustomEvent, mesa: IPedidosPorMesa) {
    const acao = event.detail.data?.action;
    if (event.detail.role !== 'cancel' && acao) {
      this.atualizarStatusMesa(mesa, acao);
    }
    return acao;
  }

  atualizarStatusMesa(mesa: IPedidosPorMesa, novoStatus: EnumStatusOptions) {
    mesa.status = novoStatus;
  }
}
