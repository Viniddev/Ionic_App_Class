import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';
import { CardItemComponent } from 'src/components/card-item/card-item.component';
import { ListaPedidos } from 'src/utils/mock/lista-pedidos';
import { Router } from '@angular/router';
import { HOME } from 'src/utils/constants/frontEndUrls';
import { HeaderComponent } from 'src/components/header/header.component';

@Component({
  selector: 'app-visualizar-pedidos',
  templateUrl: './visualizar-pedidos.page.html',
  styleUrls: ['./visualizar-pedidos.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    CommonModule,
    FormsModule,
    CardItemComponent,
    HeaderComponent
  ]
})
export class VisualizarPedidosPage implements OnInit {
  pedidos = ListaPedidos;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  atualizarStatus(pedidoId: number, novoStatus: string) {
    // const pedido = this.pedidos.find(p => p.id === pedidoId);
    // if (pedido) {
    //   pedido.status = novoStatus as any;
    // }

     this.router.navigateByUrl(HOME);
  }

  filtrarPorStatus(status: string) {
    return this.pedidos.filter(pedido => pedido.status === status);
  }

}
