import { Component, OnInit } from '@angular/core';
import { IonCard, IonCardContent, IonList, IonItem,   } from '@ionic/angular/standalone';
import { IProdutos } from 'src/@types/IProdutos';
import { ListaProdutos } from 'src/utils/mock/lista-produtos';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-pedido',
  templateUrl: './card-pedido.component.html',
  styleUrls: ['./card-pedido.component.scss'],
  imports: [
    IonCard,
    IonCardContent,
    IonList,
    IonItem,
    CommonModule,
  ],
})
export class CardPedidoComponent implements OnInit {
  ProdutosCardapio: Array<IProdutos> = ListaProdutos;

  constructor() {}

  ngOnInit() {}
}
