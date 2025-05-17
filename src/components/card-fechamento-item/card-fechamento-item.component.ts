import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IItemComanda, IItemComandaResumida } from 'src/@types/IItemComanda';
import { MesasFirestoreService } from 'src/utils/services/firestore/mesas-firestore.service';
import { Router } from '@angular/router';
import { RESUMO_PEDIDO } from 'src/utils/constants/frontEndUrls';
import { PedidosFirestoreService } from 'src/utils/services/firestore/pedidos-firestore.service';
import { EnumStatusOptions } from 'src/@types/Enums/Status';

@Component({
  selector: 'app-card-fechamento-item',
  templateUrl: './card-fechamento-item.component.html',
  styleUrls: ['./card-fechamento-item.component.scss'],
  imports: [CommonModule],
})
export class CardFechamentoItemComponent implements OnInit {
  @Input({ required: true }) item!: IItemComanda;

  constructor(
    private mesaService: MesasFirestoreService,
    private pedidosService: PedidosFirestoreService,
    private router: Router,
  ) {}

  ngOnInit() {}

  async fecharComanda() {
    await this.pedidosService.closePedido(this.item.id, EnumStatusOptions.Fechado);
    this.pedidosService.notificarAtualizacao()
    this.router.navigateByUrl(RESUMO_PEDIDO)
  }

  async fechar(){
    await this.mesaService.desbloqueiaMesa(this.item.numero);
    this.router.navigateByUrl(RESUMO_PEDIDO)
  }
}
