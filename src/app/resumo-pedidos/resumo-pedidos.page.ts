import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';
import { CardComandaItemComponent } from 'src/components/card-comanda-item/card-comanda-item.component';
import { Router } from '@angular/router';
import { HOME } from 'src/utils/constants/frontEndUrls';
import { HeaderComponent } from 'src/components/header/header.component';
import { IItemComanda } from 'src/@types/IItemComanda';
import { IPedido } from 'src/@types/IPedido';
import { PedidosFirestoreService } from 'src/utils/services/firestore/pedidos-firestore.service';

@Component({
  selector: 'app-resumo-pedidos',
  templateUrl: './resumo-pedidos.page.html',
  styleUrls: ['./resumo-pedidos.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    CommonModule,
    FormsModule,
    CardComandaItemComponent,
    HeaderComponent
  ]
})
export class ResumoPedidosPage implements OnInit {
  pedidos: IPedido[] = [];
  comandas: IItemComanda[] = [];
  total: number;

  constructor(private router: Router, private pedidosService: PedidosFirestoreService) { }

  ngOnInit() {
    this.getAllOpenPedidos();
  }

  async getAllOpenPedidos() {
    this.pedidos = await this.pedidosService.getAllPedidosDocuments();
    this.pedidos.forEach(pedido => {
      this.comandas.push({
        id: pedido.id,
        numero: pedido.numero,
        itens: pedido.itens,
        total: this.calculaTotal(pedido)
      })
    })
  }

  calculaTotal(pedido: IPedido) {
    let totalPedido = 0;

    for(const item of pedido.itens) {
      totalPedido += item.preco * item.quantidade
    }
    return totalPedido;
  }

  Voltar(){
    this.router.navigateByUrl(HOME)
  }
}

