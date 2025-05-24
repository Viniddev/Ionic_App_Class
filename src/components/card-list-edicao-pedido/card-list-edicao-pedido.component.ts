import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonButton } from '@ionic/angular/standalone';
import { CADASTRO_COMANDA } from 'src/utils/constants/frontEndUrls';
import { IPedido } from 'src/@types/IPedido';
@Component({
  selector: 'app-card-list-edicao-pedido',
  templateUrl: './card-list-edicao-pedido.component.html',
  styleUrls: ['./card-list-edicao-pedido.component.scss'],
  imports: [CommonModule, IonButton],
})
export class CardListEdicaoPedidoComponent implements OnInit {
  @Input({ required: true }) pedido!: IPedido;
  isDisabled: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    
  }

  async EditarPedido(idPedido: string) {
    this.router.navigate([CADASTRO_COMANDA, idPedido]);
  }
}
