import { Component, Input, OnInit } from '@angular/core';
import {
  IonCard,
  IonCardContent,
  IonList,
  IonItem,
  IonIcon,
} from '@ionic/angular/standalone';
import { IProdutos } from 'src/@types/IProdutos';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { removeCircleOutline, addCircleOutline } from 'ionicons/icons';

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
    IonIcon,
  ],
})

export class CardPedidoComponent implements OnInit {
  @Input({ required: true }) produtosCardapio: Array<IProdutos>;
  @Input({ required: true }) produtosFiltrados: Array<IProdutos>;

  constructor() {
    addIcons({ removeCircleOutline, addCircleOutline });
  }

  ngOnInit() {}

  IncrementarPedido(produtoId: number) {
    var produto: IProdutos = this.produtosCardapio[produtoId];
    
    produto.quantidade++;
    this.produtosCardapio[produtoId] = produto;
  }

  DecrementarPedido(produtoId: number) {
    var produto: IProdutos = this.produtosCardapio[produtoId];

    if (produto.quantidade > 0) {
      produto.quantidade--;
    }

    this.produtosCardapio[produtoId] = produto;
  }
}
