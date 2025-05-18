import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IItemComanda } from 'src/@types/IItemComanda';
import { MesasFirestoreService } from 'src/utils/services/firestore/mesas-firestore.service';
import { Router } from '@angular/router';
import { RESUMO_PEDIDO } from 'src/utils/constants/frontEndUrls';
import { PedidosFirestoreService } from 'src/utils/services/firestore/pedidos-firestore.service';
import { EnumStatusOptions } from 'src/@types/Enums/Status';
import { IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-card-fechamento-item',
  templateUrl: './card-fechamento-item.component.html',
  styleUrls: ['./card-fechamento-item.component.scss'],
  imports: [CommonModule, IonButton],
})
export class CardFechamentoItemComponent implements OnInit {
  @Input({ required: true }) item!: IItemComanda;
  isDisabled: boolean = false;

  constructor(
    private mesaService: MesasFirestoreService,
    private pedidosService: PedidosFirestoreService,
    private router: Router
  ) {}

  ngOnInit() {}

  async fecharComanda() {
    this.isDisabled = true;

    await this.pedidosService.closePedido( this.item.id, EnumStatusOptions.Fechado );
    await this.mesaService.desbloqueiaMesa(this.item.numero);
    this.pedidosService.notificarAtualizacao();
    this.isDisabled = false;
    
    this.router.navigateByUrl(RESUMO_PEDIDO);
  }
}
