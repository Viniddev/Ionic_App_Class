import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IItemComanda } from 'src/@types/IItemComanda';
import { Router } from '@angular/router';
import { RESUMO_PEDIDO } from 'src/utils/constants/frontEndUrls';
import { PedidosFirestoreService } from 'src/utils/services/firestore/pedidos-firestore.service';
import { EnumStatusOptions } from 'src/@types/Enums/Status';
import { IonButton } from '@ionic/angular/standalone';
import { ComandaFirestoreService } from 'src/utils/services/firestore/comanda-firestore.service';

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
    private pedidosService: PedidosFirestoreService,
    private comandaService: ComandaFirestoreService,
    private router: Router
  ) {}

  ngOnInit() {}

  async fecharComanda() {
    this.isDisabled = true;

    this.item.pedidos.map(async (elements: string)=>{
      await this.pedidosService.closePedido( elements, EnumStatusOptions.Fechado );
      this.pedidosService.notificarAtualizacao();
    })

    await this.comandaService.FechaComandaPorId(this.item.id);

    this.isDisabled = false;    
    this.router.navigateByUrl(RESUMO_PEDIDO);
  }
}
