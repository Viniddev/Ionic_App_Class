import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IItemComanda } from 'src/@types/IItemComanda';
import { MesasFirestoreService } from 'src/utils/services/firestore/mesas-firestore.service';
import { PedidosFirestoreService } from 'src/utils/services/firestore/pedidos-firestore.service';

@Component({
  selector: 'app-card-list-edicao-pedido',
  templateUrl: './card-list-edicao-pedido.component.html',
  styleUrls: ['./card-list-edicao-pedido.component.scss'],
})
export class CardListEdicaoPedidoComponent  implements OnInit {
  @Input({ required: true }) item!: IItemComanda;
  isDisabled: boolean = false;

  constructor(
    private mesaService: MesasFirestoreService,
    private pedidosService: PedidosFirestoreService,
    private router: Router
  ) {}

  ngOnInit() {}

  async fecharComanda() {
   
  }
}
